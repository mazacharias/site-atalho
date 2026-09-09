# -*- coding: utf-8 -*-

SUP = """<h1 class="tit">Superfícies</h1>
<p class="sub">Três fundos, e cada um traz seu próprio conjunto de cores de texto, de régua e de botão.
  A alternância entre eles é o que dá ritmo à rolagem: nenhuma dobra clara encosta em outra clara.</p>
<div class="corpo sup">
  <div class="sf sf--papel">
    <div class="sf__topo"><span class="rot">Papel</span><code>--paper #f4f4f1</code></div>
    <div class="sf__demo">
      <div class="sf__h">Marca é a forma mais rápida.</div>
      <p class="sf__p">Texto corrido em <code>--ink-70</code>, sobre o papel.</p>
      <div class="sf__btns"><span class="bt bt--solid">Iniciar projeto</span><span class="bt bt--ghost">Ver projetos</span></div>
    </div>
    <p class="sf__uso">Estúdio, Serviços, Dúvidas, páginas de projeto.</p>
  </div>
  <div class="sf sf--tinta">
    <div class="sf__topo"><span class="rot">Tinta</span><code>--ink #0c0d12</code></div>
    <div class="sf__demo">
      <div class="sf__h">Como um projeto anda.</div>
      <p class="sf__p">Texto em <code>--on-dark-70</code>; régua a 15%.</p>
      <div class="sf__btns"><span class="bt bt--brand">Iniciar projeto</span><span class="bt bt--ghostd">Ver projetos</span></div>
    </div>
    <p class="sf__uso">Hero, Sistema, Processo, Contato, rodapé.</p>
  </div>
  <div class="sf sf--azul">
    <div class="sf__topo"><span class="rot">Marca</span><code>--brand #182889</code></div>
    <div class="sf__demo">
      <div class="sf__h">Superfície de destaque.</div>
      <p class="sf__p">Usada em cheio, nunca como fundo de texto longo.</p>
      <div class="sf__btns"><span class="bt bt--light">Iniciar projeto</span><span class="bt bt--ghostd">Ver projetos</span></div>
    </div>
    <p class="sf__uso">Moldura do vídeo, barras do cronograma, favicon.</p>
  </div>
</div>"""

CSS_SUP = """
.sup{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.sf{ display:flex; flex-direction:column; border:1px solid var(--line); }
.sf--papel{ background:var(--paper); }
.sf--tinta{ background:var(--ink); border-color:transparent; }
.sf--azul{ background:var(--brand); border-color:transparent; }
.sf__topo{ display:flex; justify-content:space-between; align-items:baseline; padding:14px 18px;
  border-bottom:1px solid var(--line); }
.sf--tinta .sf__topo,.sf--azul .sf__topo{ border-color:var(--on-dark-line); }
.sf__topo code{ font-size:10px; color:var(--ink-50); }
.sf--tinta .sf__topo code,.sf--azul .sf__topo code{ color:var(--on-dark-45); }
.sf--tinta .rot,.sf--azul .rot{ color:var(--on-dark-45); }
.sf__demo{ padding:26px 18px 22px; flex:1; }
.sf__h{ font-size:24px; font-weight:300; letter-spacing:-.02em; line-height:1.1; }
.sf--tinta .sf__h,.sf--azul .sf__h{ color:var(--on-dark); }
.sf__p{ margin:12px 0 0; font-size:11.5px; line-height:1.7; color:var(--ink-70); }
.sf--tinta .sf__p,.sf--azul .sf__p{ color:var(--on-dark-70); }
.sf__p code{ font-size:11px; }
.sf__btns{ display:flex; gap:9px; margin-top:22px; }
.bt{ display:inline-flex; align-items:center; height:34px; padding:0 15px; font-size:11px; font-weight:600; }
.bt--solid{ background:var(--brand); color:#fff; }
.bt--brand{ background:var(--brand); color:#fff; }
.bt--light{ background:var(--on-dark); color:var(--ink); }
.bt--ghost{ border:1px solid var(--line); color:var(--ink); }
.bt--ghostd{ border:1px solid var(--on-dark-line); color:var(--on-dark); }
.sf__uso{ margin:0; padding:14px 18px; border-top:1px solid var(--line); font-size:10.5px; color:var(--ink-50); }
.sf--tinta .sf__uso,.sf--azul .sf__uso{ border-color:var(--on-dark-line); color:var(--on-dark-45); }
"""

# ------------------------------------------------------- 05 · COMPONENTES
COMP = """<h1 class="tit">Componentes</h1>
<p class="sub">Nada tem canto arredondado. Todo botão tem 50 px de altura (42 na versão pequena),
  26 px de respiro lateral e <code>border-radius:0</code>.</p>
<div class="corpo cp">
  <div>
    <div class="rot">Botões</div>
    <div class="cx">
      <div class="cx__l"><span class="b b--solid">Iniciar projeto <i>→</i></span><span class="rot2">solid · azul da marca, texto branco</span></div>
      <div class="cx__l"><span class="b b--ghost">Ver projetos</span><span class="rot2">ghost · só a borda, sobre papel</span></div>
      <div class="cx__l escuro"><span class="b b--light">Enviar mensagem <i>→</i></span><span class="rot2">light · sobre fundo escuro</span></div>
      <div class="cx__l"><span class="b b--sm b--solid">Versão pequena</span><span class="rot2">sm · 42 px, texto 13 px</span></div>
    </div>
    <div class="rot" style="margin-top:24px">Seta</div>
    <p class="nota" style="margin:8px 0 0">A seta é um SVG de 14 px que anda 4 px para a direita no
      <code>:hover</code>. É o único movimento de interação do site.</p>
  </div>
  <div>
    <div class="rot">Selo</div>
    <div class="cx escuro" style="padding:26px 20px">
      <span class="selo"><b>Novo</b>O sistema do estúdio em 20 segundos <i>→</i></span>
    </div>
    <p class="nota" style="margin:10px 0 0">Etiqueta em azul cheio com texto branco, borda em
      <code>--line-dark</code>. Só existe no hero.</p>
    <div class="rot" style="margin-top:24px">Rótulo micro e cabeçalho de dobra</div>
    <div class="cx">
      <span class="micro" style="color:var(--ink-35)"><b style="color:var(--brand)">03</b> &nbsp; Serviços</span>
      <div style="font-size:26px;font-weight:300;letter-spacing:-.02em;margin-top:14px">Três frentes, um sistema só.</div>
    </div>
    <div class="rot" style="margin-top:24px">Marcador de lista</div>
    <div class="cx">
      <div class="li"><s></s>Plataforma e territórios de marca</div>
      <div class="li"><s></s>Símbolo, logotipo e tipografia</div>
    </div>
    <p class="nota" style="margin:10px 0 0">Quadrado de 6 px em azul, alinhado pela base do texto.
      Cada item é separado por uma régua, não por espaço.</p>
  </div>
</div>"""

CSS_COMP = """
.cp{ display:grid; grid-template-columns:1fr 1fr; gap:52px; }
.cx{ margin-top:10px; padding:18px 20px; border:1px solid var(--line); background:var(--paper-2); }
.cx.escuro{ background:var(--ink); border-color:transparent; }
.cx__l{ display:flex; align-items:center; gap:20px; padding:9px 0; }
.cx__l + .cx__l{ border-top:1px solid var(--line-soft); }
.cx__l.escuro{ background:var(--ink); margin:0 -20px; padding:11px 20px; border-top:0; }
.b{ display:inline-flex; align-items:center; gap:10px; height:44px; padding:0 23px;
  font-size:13px; font-weight:600; white-space:nowrap; }
.b i{ font-style:normal; font-size:12px; }
.b--sm{ height:38px; padding:0 18px; font-size:12px; }
.b--solid{ background:var(--brand); color:#fff; }
.b--ghost{ border:1px solid var(--line); color:var(--ink); }
.b--light{ background:var(--on-dark); color:var(--ink); }
.rot2{ font-size:10px; color:var(--ink-50); }
.cx__l.escuro .rot2{ color:var(--on-dark-45); }
.selo{ display:inline-flex; align-items:center; gap:10px; padding:5px 12px 5px 5px;
  border:1px solid var(--line-dark); font-size:11.5px; color:var(--on-dark-70); }
.selo b{ background:var(--brand); color:#fff; padding:3px 8px; font-size:9.5px; font-weight:600;
  letter-spacing:.1em; text-transform:uppercase; }
.selo i{ font-style:normal; }
.li{ display:flex; align-items:baseline; gap:11px; font-size:12px; color:var(--ink-70); padding:10px 0; }
.li + .li{ border-top:1px solid var(--line-soft); }
.li s{ width:6px; height:6px; background:var(--brand); flex:none; text-decoration:none; }
"""
