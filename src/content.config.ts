import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seoSchema = z
	.object({
		title: z.string().optional(),
		description: z.string().optional(),
	})
	.optional();

const pages = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		navTitle: z.string().optional(),
		order: z.number().default(99),
		draft: z.boolean().default(false),
		sourceUrl: z.string().url().optional(),
		seo: seoSchema,
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
		seo: seoSchema,
	}),
});

export const collections = { pages, blog };
