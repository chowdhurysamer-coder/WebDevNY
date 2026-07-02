import { chromium, devices } from 'playwright';
const SD='/tmp/claude-0/-home-user-WebDevNY/2abf4e34-24c7-5455-94b9-c049d839550e/scratchpad/shots/';
const BASE='http://localhost:4200/WebDevNY/#';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const pages = process.argv[2] ? process.argv[2].split(',') : ['/','/web-design','/pricing','/contact','/portfolio','/about','/analytics','/plans','/journal','/explore','/for/restaurants'];
const width = +(process.argv[3]||390);
const height = +(process.argv[4]||844);
const tag = process.argv[5]||('m'+width);
const full = process.argv[6]==='full';

for (const path of pages){
  const ctx = await b.newContext({ viewport:{width,height}, deviceScaleFactor:2, isMobile: width<900, hasTouch: width<900 });
  const p = await ctx.newPage();
  await p.addInitScript(()=>{ try{ sessionStorage.setItem('webdevny_unboxed','1'); localStorage.setItem('webdevny_cookie_consent','1'); }catch(e){} });
  await p.goto(BASE+path, { waitUntil:'networkidle' }).catch(()=>{});
  await p.waitForTimeout(2200);
  const name = tag+'_'+(path==='/'?'home':path.replace(/\//g,'-').replace(/^-/,''))+'.png';
  await p.screenshot({ path: SD+name, fullPage: full }).catch(()=>{});
  await ctx.close();
  console.log('shot', name);
}
await b.close();
