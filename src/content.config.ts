import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		navTitle: z.string().optional(),
		order: z.number().default(99),
		draft: z.boolean().default(false),
		sourceUrl: z.string().url().optional(),
	}),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		categories: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		sourceUrl: z.string().url().optional(),
	}),
});

const gear = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gear' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		categories: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),
		productName: z.string().optional(),
		productUrl: z.string().url().optional(),
		productImage: z.string().optional(),
		draft: z.boolean().default(false),
		sourceUrl: z.string().url().optional(),
	}),
});

export const collections = { pages, blog, gear };
