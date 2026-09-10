# -*- coding: utf-8 -*-

CAPA = """<section class="slide pg pg--escura capa">
  <div class="capa__grade"></div>
  <div class="capa__véu"></div>
  <div class="capa__conteudo">
    <div class="capa__marca">picê</div>
    <h1 class="capa__tit">Sistema visual</h1>
    <p class="capa__sub">O que sustenta o site: cor, tipografia, grade, superfícies,
      componentes e as regras que mantêm tudo consistente.</p>
  </div>
  <ol class="capa__indice">
    <li><span>01</span>Cor</li>
    <li><span>02</span>Tipografia</li>
    <li><span>03</span>Grade e espaçamento</li>
    <li><span>04</span>Superfícies</li>
    <li><span>05</span>Componentes</li>
    <li><span>06</span>A textura do hero</li>
    <li><span>07</span>Movimento</li>
    <li><span>08</span>Regras</li>
    <li><span>09</span>Aplicação</li>
  </ol>
  <div class="capa__pe"><span class="micro">picê · São Paulo</span><span class="micro">Versão 1 · 2026</span></div>
</section>
"""

CSS_CAPA = """
.capa{ padding:0; }
.capa__grade{
  position:absolute; inset:0;
  --celula:96px; --grade:rgba(233,229,223,.10); --aceso:rgba(233,229,223,.035);
  background-image:
    linear-gradient(to right,  var(--grade) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grade) 1px, transparent 1px),
    linear-gradient(var(--aceso), var(--aceso)),
    linear-gradient(var(--aceso), var(--aceso)),
    linear-gradient(var(--aceso), var(--aceso)),
    linear-gradient(var(--aceso), var(--aceso));
  background-size:var(--celula) var(--celula);
  background-repeat:repeat,repeat,no-repeat,no-repeat,no-repeat,no-repeat;
  background-position:
    center center, center center,
    calc(50% - 4 * var(--celula)) calc(50% - 3 * var(--celula)),
    calc(50% + 3 * var(--celula)) calc(50% + 2 * var(--celula)),
    calc(50% - 5 * var(--celula)) calc(50% + 1 * var(--celula)),
    calc(50% + 4 * var(--celula)) calc(50% - 2 * var(--celula));
}
/* o mesmo efeito da máscara do site, aqui como véu na cor do fundo:
   o PDF do Chromium desenha gradiente, mas não desenha mask-image */
.capa__véu{
  position:absolute; inset:0;
  background:radial-gradient(ellipse 58% 62% at 34% 50%, #131211 30%, rgba(19,18,17,.55) 62%, rgba(19,18,17,0) 100%);
}
.capa__conteudo{ position:absolute; left:64px; top:214px; }
.capa__marca{ font-size:30px; font-weight:600; letter-spacing:-.03em; line-height:1; color:var(--on-dark); }
.capa__tit{ margin:26px 0 0; font-weight:300; font-size:92px; line-height:.98; letter-spacing:-.03em; }
.capa__sub{ margin:22px 0 0; max-width:40ch; font-size:15px; line-height:1.66; color:var(--on-dark-70); }
.capa__indice{ position:absolute; right:64px; top:220px; margin:0; padding:0; list-style:none; width:250px; }
.capa__indice li{
  display:flex; gap:16px; align-items:baseline; padding:11px 0;
  border-top:1px solid var(--on-dark-line); font-size:13px; color:var(--on-dark-70);
}
.capa__indice li:last-child{ border-bottom:1px solid var(--on-dark-line); }
.capa__indice span{ font-size:9.5px; font-weight:600; letter-spacing:.14em; color:var(--fumaca); }
.capa__pe{ position:absolute; left:64px; right:64px; bottom:54px; display:flex; justify-content:space-between; }
"""

# ---------------------------------------------------------------- 01 · COR
def amostra(nome, valor, uso, escura=False):
    cor = 'branco' if escura else ''
    return f"""<div class="am">
  <div class="am__chip {cor}" style="background:{valor}"></div>
  <div class="am__nome">{nome}</div>
  <div class="am__hex"><code>{valor}</code></div>
  <div class="am__uso">{uso}</div>
</div>"""

COR = """<h1 class="tit">Cor</h1>
<p class="sub">Um preto, um cinza e um papel, todos quentes. <b>Não existe cor de destaque</b>:
  o destaque é o contraste entre eles. A regra que mais importa é a inversão: sobre papel,
  o elemento de mais peso é o preto; sobre o escuro, é o papel.</p>
<div class="corpo">
  <div class="rot" style="margin-bottom:12px">Escuros</div>
  <div class="grade-am">
""" + "".join([
  amostra('--preto',  '#0a0908', 'Estado :hover do que já é preto'),
  amostra('--ink',    '#131211', 'Fundo do hero e das dobras escuras; texto e blocos cheios sobre papel'),
  amostra('--ink-2',  '#1c1a18', 'Superfície elevada dentro do escuro; fundo do vídeo'),
  amostra('--ink-3',  '#272421', 'Terceiro plano, uso pontual'),
]) + """
  </div>
  <div class="rot" style="margin:20px 0 12px">Claros</div>
  <div class="grade-am">
""" + "".join([
  amostra('--fumaca',  '#b6b2ac', 'Marcas e traços sobre o escuro: números, marcadores, grade, etiqueta do selo'),
  amostra('--areia',   '#dcd7cf', 'Preenchimento suave sobre papel'),
  amostra('--paper',   '#e4e0d9', 'Fundo das dobras claras; botão principal sobre o escuro'),
  amostra('--paper-2', '#f1eee9', 'Cartões e campos sobre papel'),
  amostra('--on-dark', '#e9e5df', 'Texto sobre fundo escuro'),
]) + """
  </div>
  <div class="op">
    <div><div class="rot">Sobre papel</div>
      <ul><li><code>--ink-70</code> · texto corrido</li><li><code>--ink-50</code> · apoio</li>
      <li><code>--ink-35</code> · rótulo micro</li><li><code>--line</code> · 15% · régua</li>
      <li><code>--line-soft</code> · 8% · divisória interna</li></ul></div>
    <div><div class="rot">Sobre escuro</div>
      <ul><li><code>--on-dark-70</code> · texto corrido</li><li><code>--on-dark-45</code> · rótulo micro</li>
      <li><code>--on-dark-line</code> · 14% · régua</li>
      <li><code>--line-dark</code> · fumaça a 38% · borda do selo</li></ul></div>
    <div><div class="rot">Por que o cinza existe</div>
      <p class="nota" style="margin:8px 0 0">O preto sobre o escuro fica em 1,1:1 e desaparece.
      Onde o destaque é fino ou é texto sobre fundo escuro, quem entra é o
      <code>--fumaca</code>, que passa de 8:1 sobre o <code>--ink</code>.</p></div>
  </div>
</div>"""

CSS_COR = """
.grade-am{ display:grid; grid-template-columns:repeat(6,1fr); gap:14px; }
.am__chip{ height:50px; border:1px solid var(--line); }
.am__chip.branco{ border-color:var(--line); }
.am__nome{ margin-top:9px; font-size:11.5px; font-weight:600; letter-spacing:-.01em; }
.am__hex{ font-size:11px; color:var(--ink-50); margin-top:2px; }
.am__uso{ margin-top:6px; font-size:10.5px; line-height:1.42; color:var(--ink-50); }
.op{ display:grid; grid-template-columns:repeat(3,1fr); gap:30px; margin-top:18px;
     padding-top:14px; border-top:1px solid var(--line); }
.op ul{ margin:8px 0 0; padding:0; list-style:none; }
.op li{ font-size:11.5px; line-height:1.7; color:var(--ink-70); }
"""
