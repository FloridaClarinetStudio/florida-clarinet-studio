import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildMarkdownItems, markdownResponse } from '../lib/ai-markdown';
import { site } from '../lib/site';

export const GET: APIRoute = async () => {
	const pages = await getCollection('pages', ({ data }) => !data.draft);
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	const items = await buildMarkdownItems(pages, posts);

	const lines = [
		`# ${site.name}`,
		'',
		`> ${site.description}`,
		'',
		`${site.name} provides clarinet, saxophone, woodwind, musicianship, and audition-preparation lessons for students in ${site.areas.join(', ')}.`,
		'',
		'## Contact',
		'',
		`- Phone: ${site.phone}`,
		`- Email: ${site.email}`,
		`- Address: ${site.address}`,
		`- Website: ${site.url}`,
		'',
		'## Full Markdown Export',
		'',
		`- [Complete site content as Markdown](${new URL('/llms-full.txt', site.url).toString()}): AI-readable Markdown export of the current public pages and articles.`,
		'',
		'## Pages',
		'',
		...items
			.filter((item) => item.section === 'Pages')
			.map((item) => `- [${item.title}](${item.url}): ${item.description ?? ''}`),
		'',
		'## Articles and Recommendations',
		'',
		...items
			.filter((item) => item.section === 'Articles and Recommendations')
			.map((item) => `- [${item.title}](${item.url}): ${item.description ?? ''}`),
		'',
	];

	return markdownResponse(lines.join('\n'));
};
