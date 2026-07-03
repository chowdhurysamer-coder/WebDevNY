import { writeFileSync } from 'fs';
const BASE = 'https://webdevny.com/';
const routes = ['', '#/about','#/web-design','#/capabilities','#/portfolio','#/previews','#/analytics','#/pricing','#/plans','#/journal','#/contact','#/explore','#/privacy','#/terms',
  '#/for/restaurants','#/for/dentists','#/for/gyms','#/for/salons','#/for/lawyers','#/for/real-estate',
  '#/work/trattoria-bella','#/work/brightsmile-dental','#/work/ironworks-gym','#/work/maison-salon','#/work/park-ave-legal','#/work/hudson-realty',
  '#/journal/why-flat-fee','#/journal/speed-is-a-feature','#/journal/local-seo-playbook','#/journal/templates-vs-custom'];
const urls = routes.map(r => `  <url><loc>${BASE}${r}</loc><changefreq>monthly</changefreq></url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync('public/sitemap.xml', xml);
console.log('sitemap.xml written with', routes.length, 'urls');
