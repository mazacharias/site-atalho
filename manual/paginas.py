# -*- coding: utf-8 -*-

CAPA = """<section class="slide pg pg--escura capa">
  <div class="capa__grade"></div>
  <div class="capa__véu"></div>
  <div class="capa__conteudo">
    <div class="capa__marca">atalho</div>
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
  <div class="capa__pe"><span class="micro">Atalho Studio · São Paulo</span><span class="micro">Versão 1 · 2026</span></div>
</section>
"""

CSS_CAPA = """
.capa{ padding:0; }
.capa__grade{
  position:absolute; inset:0;
  --celula:96px; --grade:rgba(90,108,226,.16); --aceso:rgba(90,108,226,.055);
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
  background:radial-gradient(ellipse 58% 62% at 34% 50%, #0c0d12 30%, rgba(12,13,18,.55) 62%, rgba(12,13,18,0) 100%);
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
.capa__indice span{ font-size:9.5px; font-weight:600; letter-spacing:.14em; color:var(--brand-claro); }
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
<p class="sub">Um azul, um preto e um papel. Todo o resto é opacidade sobre esses três.
  A regra que mais importa: o azul cheio (<code>--brand</code>) só entra em bloco preenchido;
  para texto fino ou traço sobre fundo escuro, use a versão clara.</p>
<div class="corpo">
  <div class="rot" style="margin-bottom:12px">Azul da marca</div>
  <div class="grade-am">
""" + "".join([
  amostra('--brand',      '#182889', 'Botão principal, etiqueta do selo, números sobre fundo claro'),
  amostra('--brand-deep', '#0f1a5e', 'Estado :hover do botão principal'),
  amostra('--brand-claro','#5a6ce2', 'Texto e traço finos sobre fundo escuro'),
  amostra('--brand-lift', '#23359f', 'Realce em superfícies azuis'),
  amostra('--brand-soft', '#e7e9f4', 'Preenchimento suave sobre papel'),
  amostra('--brand-tint', 'rgba(24,40,137,.08)', 'Fundo de marcador e de barra'),
]) + """
  </div>
  <div class="rot" style="margin:20px 0 12px">Neutros</div>
  <div class="grade-am">
""" + "".join([
  amostra('--ink',     '#0c0d12', 'Fundo do hero e das dobras escuras; texto sobre papel'),
  amostra('--ink-2',   '#16181f', 'Segundo plano dentro do escuro'),
  amostra('--paper',   '#f4f4f1', 'Fundo das dobras claras'),
  amostra('--paper-2', '#fafaf8', 'Cartões e campos sobre papel'),
  amostra('--on-dark', '#f2f2ee', 'Texto sobre fundo escuro'),
]) + """
  </div>
  <div class="op">
    <div><div class="rot">Sobre papel</div>
      <ul><li><code>--ink-70</code> · texto corrido</li><li><code>--ink-50</code> · apoio</li>
      <li><code>--ink-35</code> · rótulo micro</li><li><code>--line</code> · 13% · régua</li>
      <li><code>--line-soft</code> · 7% · divisória interna</li></ul></div>
    <div><div class="rot">Sobre escuro</div>
      <ul><li><code>--on-dark-70</code> · texto corrido</li><li><code>--on-dark-45</code> · rótulo micro</li>
      <li><code>--on-dark-line</code> · 15% · régua</li>
      <li><code>--line-dark</code> · azul-claro a 42% · borda do selo</li></ul></div>
    <div><div class="rot">Contraste</div>
      <p class="nota" style="margin:8px 0 0">#182889 sobre #0c0d12 fica em 1,3:1 e some.
      É por isso que existe o <code>--brand-claro</code>: mesma matiz e saturação,
      clareado até passar de 5:1.</p></div>
  </div>
</div>"""

CSS_COR = """
.grade-am{ display:grid; grid-template-columns:repeat(6,1fr); gap:14px; }
.am__chip{ height:58px; border:1px solid var(--line); }
.am__chip.branco{ border-color:var(--line); }
.am__nome{ margin-top:9px; font-size:11.5px; font-weight:600; letter-spacing:-.01em; }
.am__hex{ font-size:11px; color:var(--ink-50); margin-top:2px; }
.am__uso{ margin-top:6px; font-size:10.5px; line-height:1.5; color:var(--ink-50); }
.op{ display:grid; grid-template-columns:repeat(3,1fr); gap:34px; margin-top:22px;
     padding-top:16px; border-top:1px solid var(--line); }
.op ul{ margin:8px 0 0; padding:0; list-style:none; }
.op li{ font-size:11.5px; line-height:1.7; color:var(--ink-70); }
"""
