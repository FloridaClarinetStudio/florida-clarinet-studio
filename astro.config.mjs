// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    redirects: {
        '/gear/vandoren-alto-sax-reeds-2/': '/gear/vandoren-traditional-clarinet-reeds/',
        '/vandoren-alto-sax-reeds-2/': '/gear/vandoren-traditional-clarinet-reeds/',
    },
    integrations: [mdx(), icon()],
});
