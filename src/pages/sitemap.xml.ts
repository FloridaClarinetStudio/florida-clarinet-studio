import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../lib/site';

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function urlEntry(path: string, lastmod?: Date) {
	const loc = new URL(path, site.url).toString();
	return [
		'<url>',
		`<loc>${escapeXml(loc)}</loc>`,
		lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : '',
		'</url>',
	]
		.filter(Boolean)
		.join('');
}

export const GET: APIRoute = async () => {
	const pages = await getCollection(
		'pages',
		({ id, data }) => !['home', 'contact-us'].includes(id) && !data.draft,
	);
	const blogFiles = import.meta.glob('../content/blog/**/*.{md,mdx}');
	const posts =
		Object.keys(blogFiles).length > 0
			? await getCollection('blog', ({ data }) => !data.draft)
			: [];
	const gear = await getCollection('gear', ({ data }) => !data.draft);

	const urls = [
		urlEntry('/'),
		urlEntry('/contact-us/'),
		urlEntry('/blog/'),
		urlEntry('/gear/'),
		...pages.map((page) => urlEntry(`/${page.id.replace(/\.(md|mdx)$/, '')}/`)),
		...posts.map((post) =>
			urlEntry(
				`/blog/${post.id.replace(/\.(md|mdx)$/, '')}/`,
				post.data.updatedDate ?? post.data.pubDate,
			),
		),
		...gear.map((gearItem) =>
			urlEntry(
				`/gear/${gearItem.id.replace(/\.(md|mdx)$/, '')}/`,
				gearItem.data.updatedDate ?? gearItem.data.pubDate,
			),
		),
	];

	return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
