import type { APIRoute } from 'astro';
import { site } from '../lib/site';

export const GET: APIRoute = () =>
	new Response(
		[
			'User-agent: *',
			'Allow: /',
			'Disallow: /contact-thank-you/',
			`Sitemap: ${site.url}/sitemap.xml`,
			`LLMS: ${site.url}/llms.txt`,
			'',
		].join('\n'),
		{
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
		},
	);
