import type { CollectionEntry } from 'astro:content';
import { site } from './site';

type PageEntry = CollectionEntry<'pages'>;
type BlogEntry = CollectionEntry<'blog'>;

export type MarkdownContentItem = {
	title: string;
	description?: string;
	url: string;
	body: string;
	section: 'Pages' | 'Articles and Recommendations';
	order: number;
	updatedDate?: Date;
};

function stripFrontmatter(markdown: string) {
	return markdown.replace(/^---\s*[\s\S]*?\s*---\s*/, '').trim();
}

function contentPath(id: string, collection: 'pages' | 'blog') {
	const slug = id.replace(/\.(md|mdx)$/, '');
	if (collection === 'pages') {
		return slug === 'home' ? '/' : `/${slug}/`;
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

	return new Map([
		...Object.entries(pageModules).map(
			([path, body]) => [contentId(path.replace('../content/pages/', '')), body] as const,
		),
		...Object.entries(blogModules).map(
			([path, body]) => [contentId(path.replace('../content/blog/', '')), body] as const,
		),
	]);
}

export async function buildMarkdownItems(pages: PageEntry[], posts: BlogEntry[]) {
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
			section: 'Articles and Recommendations',
			order: postOrder(post),
			updatedDate: post.data.updatedDate ?? post.data.pubDate,
		}));

	return [...pageItems, ...postItems].sort((a, b) => {
		if (a.section !== b.section) return a.section === 'Pages' ? -1 : 1;
		return a.order - b.order;
	});
}

export function markdownResponse(markdown: string) {
	return new Response(markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
}
