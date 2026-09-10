# -*- coding: utf-8 -*-

CAPA = """<section class="slide pg capa">
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
  --celula:96px; --grade:rgba(14,14,13,.055);
  background-image:
    linear-gradient(to right,  var(--grade) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grade) 1px, transparent 1px),
    linear-gradient(rgba(255,138,0,.20),  rgba(255,138,0,.20)),
    linear-gradient(rgba(255,45,111,.18), rgba(255,45,111,.18)),
    linear-gradient(rgba(155,93,245,.16), rgba(155,93,245,.16)),
    linear-gradient(rgba(77,124,255,.16), rgba(77,124,255,.16));
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
  background:
    radial-gradient(52% 46% at 4% 100%,  rgba(255, 96, 122, .34) 0%, transparent 64%),
    radial-gradient(46% 44% at 98% 2%,   rgba(120, 150, 255, .30) 0%, transparent 62%),
    radial-gradient(42% 40% at 94% 98%,  rgba(200, 160, 255, .28) 0%, transparent 64%),
    radial-gradient(44% 38% at 8% 0%,    rgba(255, 190, 120, .28) 0%, transparent 62%),
    radial-gradient(ellipse 54% 58% at 34% 50%, var(--paper) 26%, rgba(247,247,245,.62) 60%, rgba(247,247,245,0) 100%);
}
.capa__conteudo{ position:absolute; left:64px; top:214px; }
.capa__marca{ font-size:30px; font-weight:600; letter-spacing:-.03em; line-height:1; color:var(--ink); }
.capa__tit{ margin:26px 0 0; font-weight:300; font-size:92px; line-height:.98; letter-spacing:-.03em; }
.capa__sub{ margin:22px 0 0; max-width:40ch; font-size:15px; line-height:1.66; color:var(--ink-70); }
.capa__indice{ position:absolute; right:64px; top:220px; margin:0; padding:0; list-style:none; width:250px; }
.capa__indice li{
  display:flex; gap:16px; align-items:baseline; padding:11px 0;
  border-top:1px solid var(--line); font-size:13px; color:var(--ink-70);
}
.capa__indice li:last-child{ border-bottom:1px solid var(--line); }
.capa__indice span{ font-size:9.5px; font-weight:600; letter-spacing:.14em; color:var(--rosa); }
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

# cada matiz é um par: a versão viva em cima, a de texto embaixo
def par(nome, vivo, texto, uso):
    return f"""<div class="am">
  <div class="am__chip am__chip--par">
    <span style="background:{vivo}"></span><span style="background:{texto}"></span>
  </div>
  <div class="am__nome">{nome}</div>
  <div class="am__hex"><code>{vivo}</code> · <code>{texto}</code></div>
  <div class="am__uso">{uso}</div>
</div>"""

COR = """<h1 class="tit">Cor</h1>
<p class="sub">A base é branca: um chão levemente quente, o branco puro por cima dele e o preto do texto.
  A cor entra depois, em sete matizes, e tem um lugar definido: <b>ela nunca vira fundo de dobra e nunca vira botão</b>.
  O que carrega peso continua sendo o preto.</p>
<div class="corpo">
  <div class="rot" style="margin-bottom:10px">A base</div>
  <div class="grade-am">
""" + "".join([
  amostra('--paper',   '#f7f7f5', 'Chão da página'),
  amostra('--paper-2', '#fbfbfa', 'Faixa um pouco mais clara, usada no hero'),
  amostra('--white',   '#ffffff', 'Cartões, campos e blocos de mídia', True),
  amostra('--ink',     '#0e0e0d', 'Texto, réguas e todo botão principal'),
]) + """
  </div>
  <div class="rot" style="margin:18px 0 10px">As sete cores, cada uma em duas versões</div>
  <div class="grade-am grade-am--7">
""" + "".join([
  par('--laranja', '#ff8a00', '#aa5c00', 'Dobra 01, card 01, fase 01'),
  par('--coral',   '#ff5a3c', '#db2200', 'Dobra 02, fase 02'),
  par('--rosa',    '#ff2d6f', '#df0046', 'Dobra 03, card 02, fase 03, etiqueta Novo'),
  par('--magenta', '#e94ec4', '#cd18a2', 'Dobra 04'),
  par('--roxo',    '#9b5df5', '#8c43f5', 'Dobra 05, card 03, fase 04'),
  par('--azul',    '#4d7cff', '#2961ff', 'Dobra 06, marcos, foco do teclado'),
  par('--ciano',   '#16b3e0', '#0d7998', 'Dobra 07, marco final'),
]) + """
  </div>
  <div class="op">
    <div><div class="rot">Opacidades do preto</div>
      <ul><li><code>--ink-70</code> · texto corrido</li><li><code>--ink-50</code> · apoio</li>
      <li><code>--ink-35</code> · rótulo micro</li><li><code>--line</code> · 11% · régua</li>
      <li><code>--line-soft</code> · 6% · divisória interna</li></ul></div>
    <div><div class="rot">Por que duas versões</div>
      <p class="nota" style="margin:8px 0 0">A versão viva é rasa: o laranja tem 2,2:1 contra o papel,
      e branco sobre ele dá 2,4:1. Ela só preenche, nunca é texto. Quem é texto, ou carrega texto
      branco, usa a versão <code>-t</code>, calibrada para 4,6:1 dos dois lados.</p></div>
    <div><div class="rot">O tom de cada dobra</div>
      <p class="nota" style="margin:8px 0 0">Cada dobra declara o seu tom no HTML
      (<code>style="--tom:var(--rosa-t)"</code>) e tudo dentro dela herda. Trocar essa
      variável troca a cor da dobra inteira.</p></div>
  </div>
</div>"""

CSS_COR = """
.grade-am{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
.grade-am--7{ grid-template-columns:repeat(7,1fr); }
.am__chip{ height:50px; border:1px solid var(--line); border-radius:var(--r-md); overflow:hidden; }
.am__chip--par{ display:flex; flex-direction:column; border-color:transparent; }
.am__chip--par span{ display:block; flex:1; }
.am__chip.branco{ border-color:var(--line); }
.am__nome{ margin-top:9px; font-size:11.5px; font-weight:600; letter-spacing:-.01em; }
.am__hex{ font-size:11px; color:var(--ink-50); margin-top:2px; }
.am__uso{ margin-top:6px; font-size:10.5px; line-height:1.42; color:var(--ink-50); }
.op{ display:grid; grid-template-columns:repeat(3,1fr); gap:30px; margin-top:18px;
     padding-top:14px; border-top:1px solid var(--line); }
.op ul{ margin:8px 0 0; padding:0; list-style:none; }
.op li{ font-size:11.5px; line-height:1.7; color:var(--ink-70); }
"""
