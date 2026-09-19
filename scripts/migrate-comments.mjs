#!/usr/bin/env node
// One-shot migration: move archive-post comments out of the markdown body into
// _data/comments/<slug>.json, where <slug> is the post's directory name (which is
// what page.fileSlug resolves to for content/posts/YYYY/MM/DD/<slug>/index.md).
//
// Run from the repo root:  node scripts/migrate-comments.mjs [--dry]
//
// Kept in the repo as a record of what was done; it is not part of the build and
// is not meant to be run again (the "## Comments" headings are gone afterwards).
//
// What it does, per post that has a "## Comments" heading:
//   - splits the section into entries on "**Name** on YYYY-MM-DD HH:MM:SS"
//     (the name may be empty: 43 entries have none)
//   - classifies Movable Type trackbacks by shape: the body opens with a lone
//     <strong>Title</strong> (optionally linked) line followed by a blank line
//   - strips the "> " quoting; a nested "> >" quote becomes a single-level quote
//   - repairs double-encoded UTF-8 (mojibake) in the entry text
//   - sorts each array ascending by timestamp (stable) and numbers it from 1
//   - truncates the post body at the heading
// Entries the trackback heuristic is less sure about go to scripts/review.txt.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = path.join(root, "content/posts");
const dataDir = path.join(root, "_data/comments");
const dry = process.argv.includes("--dry");

// --- mojibake ---------------------------------------------------------------
// UTF-8 bytes that were read as Windows-1252 (or Latin-1 where 1252 has no
// mapping) and saved again. Repair only runs of characters that decode to valid
// UTF-8, so correct text such as "José" is never touched.
const cp1252 = {
	0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84, 0x2026: 0x85, 0x2020: 0x86,
	0x2021: 0x87, 0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a, 0x2039: 0x8b, 0x0152: 0x8c,
	0x017d: 0x8e, 0x2018: 0x91, 0x2019: 0x92, 0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95,
	0x2013: 0x96, 0x2014: 0x97, 0x02dc: 0x98, 0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b,
	0x0153: 0x9c, 0x017e: 0x9e, 0x0178: 0x9f,
};
const extChars = Object.keys(cp1252).map((cp) => String.fromCodePoint(+cp)).join("");
const cont = `[\\u0080-\\u00BF${extChars}]`;
const mojibakeRun = new RegExp(
	`[\\u00C2-\\u00DF]${cont}|[\\u00E0-\\u00EF]${cont}{2}|[\\u00F0-\\u00F4]${cont}{3}`,
	"g",
);
const utf8 = new TextDecoder("utf-8", { fatal: true });
let mojibakeFixes = 0;
let truncatedTails = 0;

function repairOnce(s) {
	return s.replace(mojibakeRun, (run) => {
		const bytes = Uint8Array.from([...run], (ch) => {
			const cp = ch.codePointAt(0);
			return cp <= 0xff ? cp : cp1252[cp];
		});
		try {
			const out = utf8.decode(bytes);
			mojibakeFixes++;
			return out;
		} catch {
			return run;
		}
	});
}

// Some text (the Chinese and Japanese trackbacks) was double-encoded more than
// once, so repeat until it stops changing.
function fixMojibake(s) {
	for (let i = 0; i < 4; i++) {
		const next = repairOnce(s);
		if (next === s) break;
		s = next;
	}
	return s;
}

// --- entities (for the plain-text fields: author, site, title) ---------------
const named = {
	amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", raquo: "»",
	laquo: "«", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
	ndash: "–", mdash: "—", hellip: "…",
};
const decodeEntities = (s) =>
	s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
		if (e[0] === "#") {
			const cp = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
			return String.fromCodePoint(cp);
		}
		return named[e.toLowerCase()] ?? m;
	});

// --- parsing ----------------------------------------------------------------
const headRe = /^\*\*(.*?)\*\* on (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/gm;
const trackbackRe = /^<strong>(?:<a href="([^"]*)"[^>]*>(.*?)<\/a>|(.*?))<\/strong>$/;

function walk(dir) {
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const p = path.join(dir, e.name);
		return e.isDirectory() ? walk(p) : [p];
	});
}

function unquote(raw, where) {
	const lines = raw.split("\n").map((l) => {
		if (l.trim() === "") return "";
		if (!l.startsWith(">")) throw new Error(`unquoted line in ${where}: ${l.slice(0, 80)}`);
		return l.replace(/^> ?/, "");
	});
	while (lines.length && lines[0] === "") lines.shift();
	while (lines.length && lines[lines.length - 1] === "") lines.pop();
	return lines;
}

const files = walk(postsDir)
	.filter((f) => /content\/posts\/(2002|2003|2004|2005|2006)\/.*\/index\.md$/.test(f))
	.sort();

const seenSlugs = new Map();
const review = [];
const totals = { posts: 0, sourceEntries: 0, comments: 0, trackbacks: 0, emptyAuthor: 0 };
const problems = [];

for (const file of files) {
	const text = fs.readFileSync(file, "utf8");
	const heads = [...text.matchAll(/^## Comments[ \t]*$/gm)];
	if (!heads.length) continue;
	if (heads.length > 1) throw new Error(`more than one Comments heading: ${file}`);

	const slug = path.basename(path.dirname(file));
	if (seenSlugs.has(slug)) throw new Error(`slug ${slug} is ambiguous: ${file} and ${seenSlugs.get(slug)}`);
	seenSlugs.set(slug, file);

	const h = heads[0];
	const bodyPart = text.slice(0, h.index).replace(/\s+$/, "") + "\n";
	const section = text.slice(h.index + h[0].length);

	const matches = [...section.matchAll(headRe)];
	const before = section.slice(0, matches[0]?.index ?? section.length).trim();
	if (before) throw new Error(`text before the first entry in ${file}: ${before.slice(0, 80)}`);

	const comments = [];
	const trackbacks = [];
	matches.forEach((m, i) => {
		const end = i + 1 < matches.length ? matches[i + 1].index : section.length;
		const where = `${slug} #${i + 1}`;
		const lines = unquote(section.slice(m.index + m[0].length, end).replace(/^\n/, "").replace(/\s+$/, ""), where);
		const date = `${m[2]}T${m[3]}`;
		let author = fixMojibake(m[1]);
		let url = null;
		const link = author.match(/^\[(.+)\]\((.+)\)$/);
		if (link) [, author, url] = link;
		author = decodeEntities(author);
		if (author === "") totals.emptyAuthor++;

		const tb = lines[0]?.match(trackbackRe);
		if (tb && (lines.length === 1 || lines[1] === "")) {
			const rawTitle = fixMojibake(tb[2] ?? tb[3]);
			const title = decodeEntities(rawTitle);
			let excerpt = fixMojibake(lines.slice(2).join("\n")).trim();
			if (excerpt.startsWith(`${rawTitle}. `)) excerpt = excerpt.slice(rawTitle.length + 2);
			// MT cut excerpts by bytes, which can leave half a multi-byte character
			// just before the trailing ellipsis; drop that fragment.
			const cut = excerpt.replace(new RegExp(`[\\u00C2-\\u00F4]${cont}{0,2}(?=(\\.\\.\\.|\\u2026)$)`), "");
			if (cut !== excerpt) truncatedTails++;
			excerpt = decodeEntities(cut);
			trackbacks.push({ site: author, title, url: tb[1] ?? null, date, excerpt });
			if (!/(\.\.\.|…)$/.test(excerpt)) {
				review.push(`${slug} | ${date} | ${author} | "${title}" | trackback shape, but the excerpt is not truncated with an ellipsis`);
			}
		} else {
			comments.push({ author, url, date, body: fixMojibake(lines.join("\n")) });
		}
	});

	const byDate = (a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
	const out = {
		comments: comments.sort(byDate).map((c, i) => ({ id: i + 1, ...c })),
		trackbacks: trackbacks.sort(byDate).map((t, i) => ({ id: i + 1, ...t })),
	};

	if (out.comments.length + out.trackbacks.length !== matches.length) {
		problems.push(`${slug}: ${matches.length} entries in, ${out.comments.length + out.trackbacks.length} out`);
	}
	totals.posts++;
	totals.sourceEntries += matches.length;
	totals.comments += out.comments.length;
	totals.trackbacks += out.trackbacks.length;

	if (!dry) {
		fs.mkdirSync(dataDir, { recursive: true });
		fs.writeFileSync(path.join(dataDir, `${slug}.json`), JSON.stringify(out, null, 2) + "\n");
		fs.writeFileSync(file, bodyPart);
	}
}

if (!dry) {
	fs.writeFileSync(
		path.join(root, "scripts/review.txt"),
		"Trackbacks classified by shape only (no Movable Type export was available).\n" +
			"These match the shape but are not truncated with an ellipsis like most MT trackbacks;\n" +
			"check that none is really a comment. slug | date | site | title | reason\n\n" +
			review.join("\n") + "\n",
	);
}

console.log(dry ? "DRY RUN, nothing written" : "written");
console.log(totals);
console.log(`mojibake sequences repaired: ${mojibakeFixes}`);
console.log(`half-characters trimmed from truncated excerpts: ${truncatedTails}`);
console.log(`trackbacks in review.txt: ${review.length}`);
if (problems.length) {
	console.error("PROBLEMS:\n" + problems.join("\n"));
	process.exit(1);
}
