import type { CollectionEntry } from 'astro:content';
import { site } from './site';

type PageEntry = CollectionEntry<'pages'>;
type BlogEntry = CollectionEntry<'blog'>;
type GearEntry = CollectionEntry<'gear'>;

export type MarkdownContentItem = {
	title: string;
	description?: string;
	url: string;
	body: string;
	section: 'Pages' | 'Articles' | 'Gear';
	order: number;
	updatedDate?: Date;
};

function stripFrontmatter(markdown: string) {
	return markdown.replace(/^---\s*[\s\S]*?\s*---\s*/, '').trim();
}

function contentPath(id: string, collection: 'pages' | 'blog' | 'gear') {
	const slug = id.replace(/\.(md|mdx)$/, '');
	if (collection === 'pages') {
		return slug === 'home' ? '/' : `/${slug}/`;
	}
	if (collection === 'gear') {
		return `/gear/${slug}/`;
	}
	return `/blog/${slug}/`;
}

function contentId(path: string) {
	return path.replace(/\.(md|mdx)$/, '');
}

function pageOrder(entry: PageEntry) {
	return entry.data.order ?? 99;
}

function postOrder(entry: BlogEntry) {
	return -entry.data.pubDate.valueOf();
}

function gearOrder(entry: GearEntry) {
	return 0;
}

export async function getRawMarkdownByPath() {
	const pageModules = import.meta.glob<string>('../content/pages/**/*.{md,mdx}', {
		query: '?raw',
		import: 'default',
		eager: true,
	});
	const blogModules = import.meta.glob<string>('../content/blog/**/*.{md,mdx}', {
		query: '?raw',
		import: 'default',
		eager: true,
	});
	const gearModules = import.meta.glob<string>('../content/gear/**/*.{md,mdx}', {
		query: '?raw',
		import: 'default',
		eager: true,
	});

	return new Map([
		...Object.entries(pageModules).map(
			([path, body]) => [contentId(path.replace('../content/pages/', '')), body] as const,
		),
		...Object.entries(blogModules).map(
			([path, body]) => [contentId(path.replace('../content/blog/', '')), body] as const,
		),
		...Object.entries(gearModules).map(
			([path, body]) => [`gear/${contentId(path.replace('../content/gear/', ''))}`, body] as const,
		),
	]);
}

export async function buildMarkdownItems(pages: PageEntry[], posts: BlogEntry[], gear: GearEntry[] = []) {
	const rawByPath = await getRawMarkdownByPath();

	const pageItems: MarkdownContentItem[] = pages
		.filter((page) => !page.data.draft)
		.map((page) => ({
			title: page.data.title,
			description: page.data.description,
			url: new URL(contentPath(page.id, 'pages'), site.url).toString(),
			body: stripFrontmatter(rawByPath.get(page.id) ?? ''),
			section: 'Pages',
			order: pageOrder(page),
		}));

	const postItems: MarkdownContentItem[] = posts
		.filter((post) => !post.data.draft)
		.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			url: new URL(contentPath(post.id, 'blog'), site.url).toString(),
			body: stripFrontmatter(rawByPath.get(post.id) ?? ''),
			section: 'Articles',
			order: postOrder(post),
			updatedDate: post.data.updatedDate ?? post.data.pubDate,
		}));

	const gearItems: MarkdownContentItem[] = gear
		.filter((gearItem) => !gearItem.data.draft)
		.map((gearItem) => ({
			title: gearItem.data.title,
			description: gearItem.data.description,
			url: new URL(contentPath(gearItem.id, 'gear'), site.url).toString(),
			body: stripFrontmatter(rawByPath.get(`gear/${gearItem.id}`) ?? ''),
			section: 'Gear',
			order: gearOrder(gearItem),
			updatedDate: gearItem.data.updatedDate ?? gearItem.data.pubDate,
		}));

	const sectionOrder = { Pages: 0, Articles: 1, Gear: 2 };

	return [...pageItems, ...postItems, ...gearItems].sort((a, b) => {
		if (a.section !== b.section) return sectionOrder[a.section] - sectionOrder[b.section];
		if (a.order !== b.order) return a.order - b.order;
		return a.title.localeCompare(b.title);
	});
}

export function markdownResponse(markdown: string) {
	return new Response(markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
}
