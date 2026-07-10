import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildMarkdownItems, markdownResponse } from '../lib/ai-markdown';
import { site } from '../lib/site';

export const GET: APIRoute = async () => {
	const pages = await getCollection('pages', ({ data }) => !data.draft);
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	const items = await buildMarkdownItems(pages, posts);

	const sections = items.map((item) =>
		[
			`# ${item.title}`,
			'',
			`Canonical URL: ${item.url}`,
			item.description ? `Description: ${item.description}` : '',
			item.updatedDate ? `Updated: ${item.updatedDate.toISOString()}` : '',
			'',
			item.body,
			'',
			'---',
			'',
		]
			.filter(Boolean)
			.join('\n'),
	);

	const markdown = [
		`# ${site.name} Full Markdown Content`,
		'',
		`Canonical site: ${site.url}`,
		`Summary: ${site.description}`,
		'',
		'This file is generated from the same Markdown content used to build the public website. It is intended for AI assistants, search systems, and other tools that need clean text with canonical URLs.',
		'',
		...sections,
	].join('\n');

	return markdownResponse(markdown);
};
