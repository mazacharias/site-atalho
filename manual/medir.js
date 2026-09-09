const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 900 } });
  await p.goto('file://' + __dirname + '/sistema-visual.html');
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() => [...document.querySelectorAll('.slide')].map((s,i) => {
    // maior borda inferior entre os filhos, contra a altura útil da página
    const limite = s.getBoundingClientRect().bottom - parseFloat(getComputedStyle(s).paddingBottom);
    let pior = 0, quem = '';
    s.querySelectorAll('*').forEach(e => {
      const r = e.getBoundingClientRect();
      if (r.height && r.bottom - limite > pior) { pior = r.bottom - limite; quem = e.className || e.tagName; }
    });
    return { pg: i, estouro: Math.round(pior), quem: String(quem).slice(0,34) };
  }));
  r.filter(x => x.estouro > 1).forEach(x => console.log(`pág ${x.pg}: +${x.estouro}px · ${x.quem}`));
  if (!r.some(x => x.estouro > 1)) console.log('nenhuma página estoura');
  await b.close();
})();
