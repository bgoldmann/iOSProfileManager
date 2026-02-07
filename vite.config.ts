import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function seoPlugin(baseUrl: string) {
  let outDir = 'dist';
  return {
    name: 'vite-plugin-seo',
    configResolved(config: { build: { outDir: string } }) {
      outDir = config.build.outDir;
    },
    transformIndexHtml(html: string) {
      return html.replace(/__BASE_URL__/g, baseUrl);
    },
    closeBundle() {
      const dir = path.resolve(process.cwd(), outDir);
      fs.writeFileSync(
        path.join(dir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
      );
      fs.writeFileSync(
        path.join(dir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${baseUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`
      );
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const baseUrl = env.VITE_APP_URL || 'https://example.com';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), seoPlugin(baseUrl)],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
