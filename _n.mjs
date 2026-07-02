import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const w of [640, 700, 768, 820, 900, 1000, 1024, 1200, 1440]){
  const ctx = await b.newContext({ viewport:{width:w,height:200}, deviceScaleFactor:1 });
  const p = await ctx.newPage();
  await p.addInitScript(()=>{ try{ sessionStorage.setItem('webdevny_unboxed','1'); localStorage.setItem('webdevny_cookies','accepted'); }catch(e){} });
  await p.goto('http://localhost:4260/WebDevNY/#/',{waitUntil:'domcontentloaded'});
  await p.waitForTimeout(1200);
  const r = await p.evaluate(()=>{
    const word=[...document.querySelectorAll('header .display')].find(s=>/NY/.test(s.textContent));
    // first element in the right controls cluster
    const rightWrap = document.querySelector('header > div > div:last-child');
    if(!word||!rightWrap) return 'n/a';
    const wr=word.getBoundingClientRect(); const rr=rightWrap.getBoundingClientRect();
    // what's the first control?
    const first = rightWrap.firstElementChild;
    const fname = first ? (first.textContent||first.tagName).trim().slice(0,10) : '?';
    return { gap: Math.round(rr.left - wr.right), firstControl: fname };
  });
  console.log('width',w,'| gap logo->controls:', r.gap, '| first control:', r.firstControl);
  await ctx.close();
}
await b.close();
