/* Renderiza os 600 quadros do filme da dobra "Sistema".
   Rode a partir da raiz do site, com um servidor estático de pé
   (o filme carrega a fonte de assets/fonts/, e file:// não serve):

     python3 -m http.server 8899 &
     mkdir -p quadros && node manual/render-filme.js
*/
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
  await p.goto('http://localhost:8899/manual/filme.html');
  await p.waitForTimeout(1000);
  const esc = await p.evaluate(() => window.ESCALA);
  const N = 600;                       // 20 s a 30 quadros por segundo
  for (let i = 0; i < N; i++) {
    await p.evaluate(t => window.render(t), (i / 30) * esc);
    await p.screenshot({ path: `quadros/f${String(i).padStart(4,'0')}.png` });
    if (i % 100 === 0) process.stdout.write(i + ' ');
  }
  console.log('· ' + N + ' quadros');
  await b.close();
})();
