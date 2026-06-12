/**
 * Genera l'immagine OG (1200×630) della landing *maki.
 *
 * "Intelligente": non è un PNG disegnato a mano ma è composta dal design reale.
 * Apre la landing servita da Vite, clona il vero mock del telefono e usa gli stessi
 * token/classi di brand, poi screenshotta. Rigenerabile quando il design cambia.
 *
 * Uso:  pnpm dev (o npm run dev) attivo su :3000  →  node scripts/generate-og.mjs
 * Output: public/og-image.png
 */
import { chromium } from 'playwright';

const URL = process.env.OG_URL || 'http://localhost:3000/';
const OUT = 'public/og-image.png';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);

await page.evaluate(() => {
  // Clona il telefono reale dell'hero (col suo contenuto schermo) e spegne l'animazione.
  const phone = document.querySelector('.hero-phone-tilt').cloneNode(true);
  phone.style.setProperty('--tilt', '-5deg');
  phone.querySelectorAll('.phone-rise, .reveal').forEach((el) => {
    el.classList.remove('phone-rise', 'reveal');
    el.style.animation = 'none';
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  const phoneEl = phone.querySelector('.phone');
  if (phoneEl) phoneEl.style.setProperty('--scale', '0.82');

  const og = document.createElement('div');
  og.id = 'og-capture';
  og.className = 'bg-background';
  og.style.cssText =
    'position:fixed;left:0;top:0;width:1200px;height:630px;z-index:99999;overflow:hidden;display:flex;align-items:center;isolation:isolate;';

  const glow = document.createElement('div');
  glow.style.cssText =
    'position:absolute;inset:-25% -10% auto auto;width:75%;height:130%;z-index:-1;filter:blur(64px);' +
    'background:radial-gradient(50% 50% at 72% 28%, color-mix(in oklab, var(--color-salmon) 30%, transparent), transparent 70%);';

  const left = document.createElement('div');
  left.style.cssText = 'position:relative;z-index:2;padding-left:84px;padding-right:24px;max-width:660px;';
  left.innerHTML = `
    <div class="font-display font-bold tracking-tight text-nori" style="font-size:40px;line-height:1">
      <span class="text-salmon">*</span>maki
    </div>
    <h1 class="font-display font-bold text-foreground" style="font-size:62px;line-height:1.02;letter-spacing:-0.025em;margin-top:30px;text-wrap:balance">
      Il taccuino per il sushi all you can eat.
    </h1>
    <p class="text-foreground/80" style="font-size:26px;line-height:1.4;margin-top:26px;max-width:540px">
      Segna, spunta, vota. E mai più «chi ha ordinato questi?»
    </p>
    <div class="text-foreground/70" style="display:flex;align-items:center;gap:14px;font-size:18px;margin-top:34px">
      <span>Niente account</span><span class="text-salmon">·</span>
      <span>installabile</span><span class="text-salmon">·</span>
      <span>tutto in locale</span>
    </div>`;

  const right = document.createElement('div');
  right.style.cssText = 'position:absolute;right:-30px;top:50%;transform:translateY(-46%);z-index:1;';
  right.appendChild(phone);

  og.appendChild(glow);
  og.appendChild(left);
  og.appendChild(right);
  document.body.appendChild(og);
});

await page.waitForTimeout(300);
await page.locator('#og-capture').screenshot({ path: OUT });
await browser.close();
console.log('OG image scritta in', OUT);
