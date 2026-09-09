# -*- coding: utf-8 -*-

TIPO = """<h1 class="tit">Tipografia</h1>
<p class="sub">DM Sans, arquivo variável (pesos 300–700 e eixo óptico), hospedada no próprio
  servidor em dois subconjuntos: 93 KB no total, nada buscado no Google.
  Licença SIL Open Font License 1.1.</p>
<div class="corpo esp">
  <div>
    <div class="espec">
      <div class="espec__abc">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 áàâãéêíóôõúç &amp; · → +</div>
    </div>
    <div class="pesos">
      <div><b style="font-weight:300">Aa</b><span class="rot">300 Light</span><em>Display, títulos, números</em></div>
      <div><b style="font-weight:400">Aa</b><span class="rot">400 Regular</span><em>Texto corrido</em></div>
      <div><b style="font-weight:500">Aa</b><span class="rot">500 Medium</span><em>Uso pontual</em></div>
      <div><b style="font-weight:600">Aa</b><span class="rot">600 SemiBold</span><em>Rótulos, botões, h3</em></div>
      <div><b style="font-weight:700">Aa</b><span class="rot">700 Bold</span><em>Reservado</em></div>
    </div>
  </div>
  <div>
    <div class="rot" style="margin-bottom:12px">Escala</div>
    <table class="tab">
      <tr><th>Estilo</th><th>Tamanho</th><th>Peso</th><th>Entrelinha</th><th>Tracking</th></tr>
      <tr><td>Título do hero</td><td>40 → 88 px</td><td>600</td><td>1,02</td><td>−.026 em</td></tr>
      <tr><td><code>.display</code></td><td>38 → 76 px</td><td>300</td><td>1,03</td><td>−.024 em</td></tr>
      <tr><td><code>.h2</code></td><td>29 → 50 px</td><td>300</td><td>1,08</td><td>−.020 em</td></tr>
      <tr><td><code>.lead</code></td><td>19 → 29 px</td><td>300</td><td>1,38</td><td>−.021 em</td></tr>
      <tr><td><code>.h3</code></td><td>18 → 21 px</td><td>600</td><td>1,30</td><td>−.015 em</td></tr>
      <tr><td><code>.body</code></td><td>15,5 px</td><td>400</td><td>1,75</td><td>0</td></tr>
      <tr><td><code>.micro</code></td><td>11 px</td><td>600</td><td>1</td><td>+.170 em, caixa alta</td></tr>
    </table>
    <p class="nota" style="margin-top:18px">Os tamanhos com seta são fluidos: <code>clamp()</code> entre o
      valor de celular e o de desktop, sem ponto de quebra no meio.</p>
    <div class="alerta">
      <div class="rot" style="color:var(--brand)">Ao trocar de fonte</div>
      <p class="nota" style="margin:7px 0 0;color:var(--ink-70)">O tracking negativo está calibrado para o desenho
        estreito da DM Sans. Numa grotesca mais larga, como a Open Sans, esses valores precisam ficar
        mais negativos; numa mais estreita, menos. Trocar só o <code>font-family</code> desalinha os títulos.</p>
    </div>
  </div>
</div>"""

CSS_TIPO = """
.esp{ display:grid; grid-template-columns:1fr 1fr; gap:52px; }
.espec{ border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:22px 0; }
.espec__abc{ font-size:23px; font-weight:300; line-height:1.5; letter-spacing:-.012em; }
.pesos{ margin-top:22px; display:flex; gap:0; }
.pesos > div{ flex:1; border-left:1px solid var(--line); padding:0 0 0 12px; }
.pesos > div:first-child{ border-left:0; padding-left:0; }
.pesos b{ display:block; font-size:34px; line-height:1; letter-spacing:-.03em; }
.pesos .rot{ display:block; margin-top:10px; }
.pesos em{ display:block; margin-top:5px; font-style:normal; font-size:10px; line-height:1.45; color:var(--ink-50); }
.tab{ width:100%; border-collapse:collapse; }
.tab th{ text-align:left; font-size:9.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase;
  color:var(--ink-35); padding:0 0 9px; border-bottom:1px solid var(--line); }
.tab td{ font-size:11.5px; padding:9px 0; border-bottom:1px solid var(--line-soft); color:var(--ink-70); }
.tab td:first-child{ color:var(--ink); }
.tab td+td{ font-variant-numeric:tabular-nums; }
.alerta{ margin-top:20px; padding:16px 18px; background:var(--brand-tint); }
"""

# ---------------------------------------------------------- 03 · GRADE
GRADE = """<h1 class="tit">Grade e espaçamento</h1>
<p class="sub">Doze colunas dentro de um invólucro de 1280 px, com margem e vão fluidos.
  Todas as dobras usam a mesma grade; o que muda é quantas colunas cada bloco ocupa.</p>
<div class="corpo gr">
  <div>
    <div class="rot" style="margin-bottom:12px">12 colunas · <code>.g12</code></div>
    <div class="cols">""" + "".join(f'<i></i>' for _ in range(12)) + """</div>
    <div class="cols-nums">""" + "".join(f'<span>{i+1}</span>' for i in range(12)) + """</div>
    <div class="usos">
      <div class="uso"><em style="grid-column:1 / 8">Título da dobra · 1 a 7</em><em style="grid-column:9 / 13">Apoio · 9 a 12</em></div>
      <div class="uso"><em style="grid-column:1 / 5">Card</em><em style="grid-column:5 / 9">Card</em><em style="grid-column:9 / 13">Card</em></div>
      <div class="uso"><em style="grid-column:1 / 7">Formulário</em><em style="grid-column:8 / 13">Contatos</em></div>
    </div>
  </div>
  <div>
    <div class="rot" style="margin-bottom:12px">Tokens</div>
    <table class="tab">
      <tr><th>Token</th><th>Valor</th><th>O que controla</th></tr>
      <tr><td><code>--shell</code></td><td>1280 px</td><td>Largura máxima do conteúdo</td></tr>
      <tr><td><code>--gut</code></td><td>20 → 56 px</td><td>Margem lateral da página</td></tr>
      <tr><td><code>--colgap</code></td><td>14 → 28 px</td><td>Vão entre colunas</td></tr>
      <tr><td><code>--section</code></td><td>56 → 96 px</td><td>Respiro acima e abaixo de cada dobra</td></tr>
    </table>
    <div class="rot" style="margin:26px 0 12px">Pontos de quebra</div>
    <table class="tab">
      <tr><th>Faixa</th><th>O que muda</th></tr>
      <tr><td>≥ 1041 px</td><td>Layout cheio, 12 colunas</td></tr>
      <tr><td>860 – 1040 px</td><td>Título e apoio empilham; cards viram 2 colunas</td></tr>
      <tr><td>≤ 860 px</td><td>Menu vira gaveta; tudo em coluna única</td></tr>
    </table>
    <p class="nota" style="margin-top:18px">O respiro entre dobras vem de um token só. Mudar
      <code>--section</code> reajusta a página inteira sem tocar em nenhuma seção.</p>
  </div>
</div>"""

CSS_GRADE = """
.gr{ display:grid; grid-template-columns:1.15fr 1fr; gap:52px; }
.cols{ display:grid; grid-template-columns:repeat(12,1fr); gap:10px; height:150px; }
.cols i{ background:var(--brand-tint); display:block; }
.cols-nums{ display:grid; grid-template-columns:repeat(12,1fr); gap:10px; margin-top:7px; }
.cols-nums span{ font-size:9px; color:var(--ink-35); text-align:center; }
.usos{ margin-top:22px; display:flex; flex-direction:column; gap:9px; }
.uso{ display:grid; grid-template-columns:repeat(12,1fr); gap:10px; }
.uso em{ font-style:normal; font-size:10px; line-height:26px; height:26px; padding:0 9px;
  background:var(--ink); color:var(--on-dark); white-space:nowrap; overflow:hidden; }
"""
