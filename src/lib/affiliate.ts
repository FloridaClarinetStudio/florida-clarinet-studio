export const amazonAffiliateTag = 'floridaclar00-20';

/** Normalize US Amazon shopping links when rendering gear recommendations. */
export function withAmazonAffiliateTag(href: string): string {
	const url = new URL(href);
	if (url.hostname === 'amazon.com' || url.hostname.endsWith('.amazon.com')) {
		url.searchParams.set('tag', amazonAffiliateTag);
	}
	return url.toString();
}
