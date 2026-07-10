import { site } from './site';

type ImageLike = {
	src: string;
	alt?: string;
};

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export type SeoInput = {
	title: string;
	description: string;
	url: URL;
	image?: ImageLike;
	type?: 'website' | 'article';
	publishedTime?: Date;
	modifiedTime?: Date;
	jsonLd?: JsonLd;
};

export function absoluteUrl(path: string, base = site.url) {
	return new URL(path, base).toString();
}

export function canonicalUrl(url: URL) {
	return new URL(url.pathname, site.url).toString();
}

export function fullTitle(title: string) {
	return title === site.name ? title : `${title} | ${site.name}`;
}

export function buildJsonLd({
	title,
	description,
	url,
	image,
	type = 'website',
	publishedTime,
	modifiedTime,
	jsonLd,
}: SeoInput) {
	const canonical = canonicalUrl(url);
	const imageUrl = absoluteUrl(image?.src ?? site.defaultImage);
	const organizationId = `${site.url}/#organization`;
	const websiteId = `${site.url}/#website`;

	const organization = {
		'@type': ['LocalBusiness', 'MusicSchool'],
		'@id': organizationId,
		name: site.name,
		url: site.url,
		image: absoluteUrl(site.defaultImage),
		description: site.description,
		telephone: site.phone,
		email: site.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: '998 Boeing St. NE',
			addressLocality: 'Palm Bay',
			addressRegion: 'FL',
			postalCode: '32907',
			addressCountry: 'US',
		},
		areaServed: site.areas.map((area) => ({ '@type': 'Place', name: area })),
		knowsAbout: [
			'Clarinet lessons',
			'Saxophone lessons',
			'Woodwind instruction',
			'All-State audition preparation',
			'All-County audition preparation',
			'Solo and ensemble preparation',
			'Music education',
		],
	};

	const website = {
		'@type': 'WebSite',
		'@id': websiteId,
		name: site.name,
		url: site.url,
		description: site.description,
		publisher: { '@id': organizationId },
		inLanguage: 'en-US',
	};

	const webpage: Record<string, unknown> = {
		'@type': type === 'article' ? 'Article' : 'WebPage',
		'@id': `${canonical}#webpage`,
		url: canonical,
		name: title,
		headline: title,
		description,
		image: imageUrl,
		isPartOf: { '@id': websiteId },
		publisher: { '@id': organizationId },
		about: { '@id': organizationId },
		inLanguage: 'en-US',
	};

	if (type === 'article') {
		webpage.author = { '@type': 'Person', name: 'Robin Ryon' };
		if (publishedTime) webpage.datePublished = publishedTime.toISOString();
		if (modifiedTime) webpage.dateModified = modifiedTime.toISOString();
	}

	const graph = [organization, website, webpage];
	if (jsonLd) {
		graph.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
	}

	return {
		'@context': 'https://schema.org',
		'@graph': graph,
	};
}
