import { DateTime } from "luxon";
import { createHash } from "node:crypto";

export default function(eleventyConfig) {
	// Gravatar's own hashing scheme: trim + lowercase the email, then MD5 it.
	// https://docs.gravatar.com/api/avatars/images/
	eleventyConfig.addFilter("gravatarUrl", (email, size) => {
		const hash = createHash("md5").update((email || "").trim().toLowerCase()).digest("hex");
		return `https://www.gravatar.com/avatar/${hash}?s=${size || 96}&d=mm`;
	});

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		// Accepts a Date, or an ISO string such as the offset-less comment timestamps
		// ("2004-11-08T12:31:20"), which are shown as written.
		const dt = typeof dateObj === "string"
			? DateTime.fromISO(dateObj, { zone: zone || "utc" })
			: DateTime.fromJSDate(dateObj, { zone: zone || "utc" });
		return dt.toFormat(format || "LLL dd, yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	// Named collections (addCollection) and tags share one flat namespace in
	// Eleventy's `collections` object, so these all need excluding here to
	// keep them out of the visible tag list/pages, same as "posts" already was.
	const NON_TAG_COLLECTIONS = ["all", "posts", "journal", "art", "archive"];
	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => NON_TAG_COLLECTIONS.indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);

	eleventyConfig.addFilter("regexMatch", (str, pattern) => {
		if (!str) return null;
		const regex = new RegExp(pattern, 'i');
		const match = str.match(regex);
		return match;
	});

	// Groups a collection (already in the desired display order) into
	// [{ year, posts }, ...], splitting whenever the year changes.
	// Used for the year-headed archive index.
	eleventyConfig.addFilter("groupByYear", (posts) => {
		const groups = [];
		let currentGroup = null;
		for (const post of (posts || [])) {
			const year = DateTime.fromJSDate(post.date, { zone: "utc" }).year;
			if (!currentGroup || currentGroup.year !== year) {
				currentGroup = { year, posts: [] };
				groups.push(currentGroup);
			}
			currentGroup.posts.push(post);
		}
		return groups;
	});
};
