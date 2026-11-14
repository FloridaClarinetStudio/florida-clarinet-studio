// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';
import { legacyRedirects } from './redirects.mjs';

// https://astro.build/config
export default defineConfig({
	redirects: legacyRedirects,
    integrations: [mdx(), icon()],
});
