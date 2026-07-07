import { writeFileSync } from 'fs';
const BASE = 'https://webdevny.com/';
const routes = ['', '#/about','#/web-design','#/capabilities','#/pricing','#/plans','#/journal','#/contact','#/explore','#/privacy','#/terms',
  // Hidden until we have more clientele to show: analytics dashboard, per-industry landing
  // pages (#/for/*), and placeholder example pages (portfolio, previews, case studies).
  '#/journal/why-flat-fee','#/journal/speed-is-a-feature','#/journal/local-seo-playbook','#/journal/templates-vs-custom'];
const urls = routes.map(r => `  <url><loc>${BASE}${r}</loc><changefreq>monthly</changefreq></url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync('public/sitemap.xml', xml);
console.log('sitemap.xml written with', routes.length, 'urls');
