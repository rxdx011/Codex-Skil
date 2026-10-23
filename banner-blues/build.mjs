// Gera banner.pdf (250 x 200 cm), banner-celular.png/jpg e confere se algum texto saiu do lugar.
import { createRequire } from 'module';
const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const url = pathToFileURL(path.join(dir, 'banner.html')).href;

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const W = 9449, H = 7559;                       // 250 x 200 cm a 96 dpi
const pg = await b.newPage({ viewport: { width: W, height: H } });
await pg.goto(url); await pg.waitForLoadState('load'); await pg.waitForTimeout(500);

const problemas = await pg.evaluate(() => {
  const out = [], px = n => parseFloat(n);
  const inside = (a, c) => a.left >= c.left - 1 && a.right <= c.right + 1 && a.top >= c.top - 1 && a.bottom <= c.bottom + 1;
  // 1) conteúdo que estoura o próprio bloco
  document.querySelectorAll('.bloco, .foto, header, footer, .logo').forEach(e => {
    if (e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1)
      out.push(`ESTOURA: ${e.className || e.tagName} "${e.innerText.slice(0, 30).replace(/\n/g,' ')}" (${e.scrollWidth}x${e.scrollHeight} > ${e.clientWidth}x${e.clientHeight})`);
  });
  // 2) cada linha de texto dentro do seu bloco + tamanho mínimo de fonte
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement, cs = getComputedStyle(el);
    const r = document.createRange(); r.selectNodeContents(n);
    const bb = r.getBoundingClientRect();
    const box = el.closest('.bloco, .foto, header, footer');
    if (box && !inside(bb, box.getBoundingClientRect())) out.push(`FORA DO BLOCO: "${n.textContent.trim().slice(0,30)}"`);
    const pt = px(cs.fontSize) * 0.75;
    const titulo = el.closest('h1, h2, h3, .sub, .nome, .rot, .destaque p');
    if (pt < 36 - 0.01) out.push(`FONTE PEQUENA ${pt.toFixed(1)}pt: "${n.textContent.trim().slice(0,30)}"`);
    if (titulo && !el.closest('.rot,.sub,.destaque') && pt < 90 - 0.01) out.push(`TÍTULO < 90pt (${pt.toFixed(1)}): "${n.textContent.trim().slice(0,30)}"`);
    if (!titulo && pt > 48.01 && !el.closest('.destaque') ) out.push(`TEXTO > 48pt (${pt.toFixed(1)}): "${n.textContent.trim().slice(0,30)}"`);
    if (!/Arial|Montserrat/.test(cs.fontFamily)) out.push('FONTE ERRADA');
    const pr = el.closest('body').getBoundingClientRect();
    if (!inside(bb, pr)) out.push(`FORA DA PÁGINA: "${n.textContent.trim().slice(0,30)}"`);
  }
  // 3) blocos da grade e rodapé/cabeçalho não podem se sobrepor
  const caixas = [...document.querySelectorAll('header, main > *, footer')].map(e => [e, e.getBoundingClientRect()]);
  for (let i = 0; i < caixas.length; i++) for (let j = i + 1; j < caixas.length; j++) {
    const a = caixas[i][1], c = caixas[j][1];
    if (a.left < c.right - 1 && c.left < a.right - 1 && a.top < c.bottom - 1 && c.top < a.bottom - 1)
      out.push(`SOBREPOSIÇÃO: ${caixas[i][0].className||caixas[i][0].tagName} × ${caixas[j][0].className||caixas[j][0].tagName}`);
  }
  // 4) sobra de espaço (informativo)
  const folga = [...document.querySelectorAll('.bloco:not(.destaque)')].map(e => {
    const last = e.lastElementChild.getBoundingClientRect().bottom, bot = e.getBoundingClientRect().bottom - 46;
    return `${e.querySelector('h2')?.innerText.replace(/\n/g,' ')}: folga ${Math.round(bot - last)}px`;
  });
  out.push('INFO ' + folga.join(' | '));
  return out;
});
console.log(problemas.join('\n') || 'OK');

await pg.pdf({ path: path.join(dir, 'banner-250x200cm.pdf'), width: '250cm', height: '200cm', printBackground: true, pageRanges: '1' });
// Imagens: celular leve (2500 px), JPG de alta qualidade (5000 px) e PNG máximo (7500 px)
async function foto(largura, arquivos) {
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: largura / W });
  await p.goto(url); await p.waitForLoadState('load'); await p.waitForTimeout(500);
  for (const [nome, opt] of arquivos) await p.screenshot({ path: path.join(dir, nome), ...opt });
  await p.close();
}
await foto(2500, [['banner-celular.jpg', { type: 'jpeg', quality: 92 }]]);
await foto(5000, [['banner-alta-qualidade.jpg', { type: 'jpeg', quality: 97 }]]);
await foto(7500, [['banner-maxima.png', {}]]);
await b.close();
