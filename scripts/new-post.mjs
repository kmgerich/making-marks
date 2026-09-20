#!/usr/bin/env node
// Create a new Journal post: npm run new -- "My post title"
// Writes content/journal/<slug>.md as a draft (drafts show in `npm start`
// but are left out of `npm run build`). Delete the `draft: true` line to publish.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "content/journal");

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
	console.error('Usage: npm run new -- "My post title"');
	process.exit(1);
}

// Lowercase, drop apostrophes, everything else non-alphanumeric becomes a hyphen,
// and cut at a word boundary so slugs never end mid-word.
const words = title
	.toLowerCase()
	.normalize("NFKD")
	.replace(/[̀-ͯ]/g, "")
	.replace(/['’]/g, "")
	.replace(/[^a-z0-9]+/g, "-")
	.replace(/^-+|-+$/g, "")
	.split("-");
const parts = [];
for (const w of words) {
	if (parts.length && parts.join("-").length + 1 + w.length > 60) break;
	parts.push(w);
}
const slug = parts.join("-");
if (!slug) {
	console.error("That title has no letters or numbers to build a filename from.");
	process.exit(1);
}

const file = path.join(dir, `${slug}.md`);
if (fs.existsSync(file)) {
	console.error(`Already exists: ${path.relative(root, file)}`);
	process.exit(1);
}

// Local date, not UTC, so a late-evening post isn't dated tomorrow.
const d = new Date();
const date = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
	file,
	`---
title: ${JSON.stringify(title)}
date: ${date}
# description: "One-line summary shown in the Journal list."
draft: true
---

`,
);

console.log(`Created ${path.relative(root, file)}`);
console.log("It is a draft: visible in `npm start`, left out of `npm run build`.");
console.log("Remove the `draft: true` line when you are ready to publish.");
