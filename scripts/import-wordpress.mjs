import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const exportFile = process.argv[2] ?? 'floridaclarinetstudiocom.WordPress.2026-07-09.xml';
const force = process.argv.includes('--force');
const xml = await readFile(exportFile, 'utf8');

const excludedSlugs = new Set([
	'animated-slider-showcase',
	'cart',
	'checkout',
	'class-timetable',
	'classes-slider',
	'coming-soon',
	'info-from-bottom-event-list',
	'info-on-hover-event-list',
	'info-visible-event-list',
	'landing',
	'left-sidebar',
	'music-school-home',
	'sample-page',
	'shop',
	'test-headings',
	'without-sidebar',
	'my-account',
]);

const pageOrder = new Map([
	['main-home-2', 1],
	['about-us', 2],
	['clarinet-lessons', 3],
	['faq-page', 4],
	['meat-the-team', 5],
	['my-web-site-recommendations', 8],
	['contact-us', 9],
]);

const pageFilenames = new Map([
	['main-home-2', 'home.md'],
	['meat-the-team', 'listening-list.md'],
	['my-web-site-recommendations', 'recs.md'],
]);

const preferredPageSlugs = new Set(pageOrder.keys());
const preferredPostSlugs = new Set([
	'vandoren-alto-sax-reeds-2',
	'vandoren-alto-saxophone-reeds',
	'vandoren-clarinet-reeds',
	'hite-bb-clarinet-mouthpiece',
	'daddario-reserve-x10-bb-clarinet-mouthpiece',
	'la-tromba-cork-grease',
	'manhasset-music-stand',
	'clarinet-stand',
	'the-amazing-reed-geek',
	'al3-alto-saxophone-mouth-piece',
	'hite-alto-saxophone-mouth-piece',
]);

const suspiciousPatterns = [
	/online casino/i,
	/ethereum gambling/i,
	/best online casinos/i,
	/tax-free casinos/i,
	/gamblers/i,
	/montycasinos/i,
	/tuxedo\.org/i,
	/csiss\.org/i,
];

const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
const review = [];
let pageCount = 0;
let postCount = 0;
let preservedCount = 0;

await mkdir('src/content/pages', { recursive: true });
await mkdir('src/content/gear', { recursive: true });

for (const item of items) {
	const record = {
		title: text(item, 'title'),
		slug: text(item, 'wp:post_name'),
		type: text(item, 'wp:post_type'),
		status: text(item, 'wp:status'),
		date: text(item, 'wp:post_date'),
		modified: text(item, 'wp:post_modified'),
		link: text(item, 'link'),
		content: text(item, 'content:encoded'),
		excerpt: text(item, 'excerpt:encoded'),
	};

	if (!record.slug || record.status !== 'publish' || !['page', 'post'].includes(record.type)) {
		continue;
	}

	const hasSuspiciousContent = suspiciousPatterns.some((pattern) =>
		pattern.test(`${record.title}\n${record.content}`),
	);
	const empty = cleanWordPressHtml(record.content).trim().length === 0;
	const excluded =
		excludedSlugs.has(record.slug) ||
		(record.type === 'page' && !preferredPageSlugs.has(record.slug)) ||
		(record.type === 'post' && !preferredPostSlugs.has(record.slug));

	if (hasSuspiciousContent || empty || excluded) {
		review.push({
			status: hasSuspiciousContent ? 'suspicious' : empty ? 'empty' : 'excluded',
			type: record.type,
			slug: record.slug,
			title: record.title,
			reason: hasSuspiciousContent
				? 'matched spam/casino audit terms'
				: empty
					? 'no usable body content'
					: 'demo, ecommerce, event, duplicate, or low-priority theme content',
		});
		continue;
	}

	const body = toMarkdown(record.content);
	const description = summarize(record.excerpt || body);

	if (record.type === 'page') {
		const filename = pageFilenames.get(record.slug) ?? `${record.slug}.md`;
		const target = path.join('src/content/pages', filename);
		if (!force && (await exists(target))) {
			preservedCount += 1;
			review.push({
				status: 'preserved',
				type: record.type,
				slug: record.slug,
				title: record.title,
				reason: 'existing Markdown file kept; rerun with --force to overwrite',
			});
			continue;
		}
		await writeContent(
			target,
			frontmatter({
				title: normalizeTitle(record.title || titleFromSlug(record.slug)),
				description,
				navTitle: navigationTitle(record.slug, record.title),
				order: pageOrder.get(record.slug) ?? 99,
				sourceUrl: record.link,
			}) + body,
		);
		pageCount += 1;
	}

	if (record.type === 'post') {
		const target = path.join('src/content/gear', `${record.slug}.md`);
		if (!force && (await exists(target))) {
			preservedCount += 1;
			review.push({
				status: 'preserved',
				type: record.type,
				slug: record.slug,
				title: record.title,
				reason: 'existing Markdown file kept; rerun with --force to overwrite',
			});
			continue;
		}
		await writeContent(
			target,
			frontmatter({
				title: normalizeTitle(record.title || titleFromSlug(record.slug)),
				description,
				pubDate: record.date.slice(0, 10),
				updatedDate: record.modified?.slice(0, 10),
				categories: categories(item),
				tags: tags(item),
				sourceUrl: record.link,
			}) + body,
		);
		postCount += 1;
	}
}

await writeFile(
	'content-migration-review.md',
	[
		'# Content Migration Review',
		'',
		`Imported ${pageCount} pages and ${postCount} gear posts from \`${exportFile}\`.`,
		'Preferred recommendation posts are imported into `src/content/gear`.',
		`Preserved ${preservedCount} existing Markdown files. Use \`--force\` to overwrite curated content.`,
		'',
		'The importer intentionally skips demo theme pages, WooCommerce utility pages, empty records, and content that matches spam audit terms.',
		'',
		'## Skipped Records',
		'',
		...review.map(
			(item) =>
				`- **${item.status}** \`${item.type}/${item.slug}\` - ${item.title || '(untitled)'}: ${item.reason}`,
		),
		'',
	].join('\n'),
);

console.log(`Imported ${pageCount} pages and ${postCount} gear posts. Preserved ${preservedCount} existing files.`);
console.log('Wrote content-migration-review.md.');

async function writeContent(target, content) {
	if (!force && (await exists(target))) return;
	await writeFile(target, content);
}

async function exists(target) {
	try {
		await stat(target);
		return true;
	} catch (error) {
		if (error?.code === 'ENOENT') return false;
		throw error;
	}
}

function text(item, name) {
	const match = item.match(
		new RegExp(`<${escapeRegExp(name)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegExp(name)}>`, 'm'),
	);
	return decodeXml(unwrapCdata(match?.[1] ?? '')).trim();
}

function categories(item) {
	return [...item.matchAll(/<category[^>]*domain="category"[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map(
		(match) => match[1],
	);
}

function tags(item) {
	return [...item.matchAll(/<category[^>]*domain="post_tag"[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map(
		(match) => match[1],
	);
}

function cleanWordPressHtml(value) {
	return decodeXml(unwrapCdata(value))
		.replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '')
		.replace(/\[vc_[^\]]+\]/g, '')
		.replace(/\[\/vc_[^\]]+\]/g, '')
		.replace(/\[contact-form-7[^\]]*\]/g, '')
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/\sdata-[a-z0-9_-]+="[^"]*"/gi, '')
		.replace(/\sclass="[^"]*"/gi, '')
		.replace(/\sid="[^"]*"/gi, '')
		.trim();
}

function toMarkdown(value) {
	return (
		cleanWordPressHtml(value)
			.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
			.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
			.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
			.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n')
			.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
			.replace(/<br\s*\/?>/gi, '\n')
			.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
			.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
			.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '_$1_')
			.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '_$1_')
			.replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
			.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
			.replace(/<\/?(ul|ol|div|section|span|blockquote|figure|figcaption)[^>]*>/gi, '\n')
			.replace(/<[^>]+>/g, '')
			.replace(/\n{3,}/g, '\n\n')
			.replace(/[ \t]+\n/g, '\n')
			.trim() + '\n'
	);
}

function summarize(value) {
	const plain = cleanWordPressHtml(value)
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return plain.slice(0, 155);
}

function frontmatter(data) {
	const lines = ['---'];
	for (const [key, value] of Object.entries(data)) {
		if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) continue;
		if (Array.isArray(value)) {
			lines.push(`${key}:`);
			for (const item of value) lines.push(`  - ${quoteYaml(item)}`);
		} else if (typeof value === 'number') {
			lines.push(`${key}: ${value}`);
		} else {
			lines.push(`${key}: ${quoteYaml(value)}`);
		}
	}
	lines.push('---', '');
	return `${lines.join('\n')}\n`;
}

function quoteYaml(value) {
	return JSON.stringify(String(value));
}

function normalizeTitle(title) {
	return title.replace(/\s+/g, ' ').trim();
}

function navigationTitle(slug, title) {
	const labels = {
		'main-home-2': 'Home',
		'about-us': 'About',
		'faq-page': 'FAQ',
		'meat-the-team': 'Listening List',
		'my-web-site-recommendations': 'Website Recommendations',
		'contact-us': 'Contact',
	};
	return labels[slug] ?? title;
}

function titleFromSlug(slug) {
	return slug
		.split('-')
		.filter(Boolean)
		.map((part) => part[0].toUpperCase() + part.slice(1))
		.join(' ');
}

function unwrapCdata(value) {
	return value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
}

function decodeXml(value) {
	return value
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&#8217;/g, "'")
		.replace(/&#8216;/g, "'")
		.replace(/&#8220;/g, '"')
		.replace(/&#8221;/g, '"')
		.replace(/&#8211;/g, '-')
		.replace(/&#8212;/g, '-')
		.replace(/&#8230;/g, '...');
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
