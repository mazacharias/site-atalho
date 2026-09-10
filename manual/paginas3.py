# -*- coding: utf-8 -*-

SUP = """<h1 class="tit">Superfícies</h1>
<p class="sub">Três fundos, todos claros. Os dois primeiros são o chão da página e o branco puro, e alternam
  dobra a dobra para nenhuma encostar em outra igual; o terceiro é a malha de gradiente, que só existe
  dentro de bloco de mídia. <b>Nenhuma dobra é escura, e a cor nunca é fundo de dobra.</b></p>
<div class="corpo sup">
  <div class="sf sf--papel">
    <div class="sf__topo"><span class="rot">Papel</span><code>--paper #f7f7f5</code></div>
    <div class="sf__demo">
      <div class="sf__h">Marca é a forma mais rápida.</div>
      <p class="sf__p">Texto corrido em <code>--ink-70</code>. Cartão de dentro vai a branco.</p>
      <div class="sf__btns"><span class="bt bt--solid">Iniciar projeto</span><span class="bt bt--ghost">Ver projetos</span></div>
    </div>
    <p class="sf__uso">Estúdio, Processo, Dúvidas, rodapé.</p>
  </div>
  <div class="sf sf--branca">
    <div class="sf__topo"><span class="rot">Branco</span><code>--white #ffffff</code></div>
    <div class="sf__demo">
      <div class="sf__h">Como um projeto anda.</div>
      <p class="sf__p">Mesmo texto, mesma régua. Cartão de dentro vai a papel.</p>
      <div class="sf__btns"><span class="bt bt--solid">Iniciar projeto</span><span class="bt bt--ghost">Ver projetos</span></div>
    </div>
    <p class="sf__uso">Sistema, Serviços, Projetos, Contato.</p>
  </div>
  <div class="sf sf--malha">
    <div class="sf__topo"><span class="rot">Malha</span><code>--malha</code></div>
    <div class="sf__demo">
      <div class="sf__h">Bloco de mídia.</div>
      <p class="sf__p">Cinco gradientes radiais sobre um linear. Só muda a rotação de matiz.</p>
      <div class="sf__btns"><span class="bt bt--etiq">Identidade</span></div>
    </div>
    <p class="sf__uso">Capas, galerias, favicon. Nunca atrás de texto corrido.</p>
  </div>
</div>"""

CSS_SUP = """
.sup{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.sf{ display:flex; flex-direction:column; border:1px solid var(--line); overflow:hidden; box-shadow:var(--sombra); }
.sf--papel{ background:var(--paper); }
.sf--branca{ background:var(--white); }
.sf--malha{ background-image:var(--malha); border-color:transparent; }
.sf__topo{ display:flex; justify-content:space-between; align-items:baseline; padding:14px 18px;
  border-bottom:1px solid var(--line); }
.sf--malha .sf__topo{ border-color:rgba(255,255,255,.42); }
.sf__topo code{ font-size:10px; color:var(--ink-50); }
.sf--malha .sf__topo code{ color:rgba(255,255,255,.9); }
.sf--malha .rot{ color:rgba(255,255,255,.82); }
.sf__demo{ padding:26px 18px 22px; flex:1; }
.sf__h{ font-size:24px; font-weight:300; letter-spacing:-.02em; line-height:1.1; }
.sf--malha .sf__h{ color:var(--white); }
.sf__p{ margin:12px 0 0; font-size:11.5px; line-height:1.7; color:var(--ink-70); }
.sf--malha .sf__p{ color:rgba(255,255,255,.92); }
.sf__p code{ font-size:11px; }
.sf__btns{ display:flex; gap:9px; margin-top:22px; }
.bt{ display:inline-flex; align-items:center; height:34px; padding:0 16px;
     font-size:11px; font-weight:600; }
.bt--solid{ background:var(--ink); color:var(--white); }
.bt--ghost{ background:var(--white); border:1px solid var(--line); color:var(--ink); }
.bt--etiq{ height:26px; padding:0 13px; background:rgba(255,255,255,.92); color:var(--ink);
           font-size:9.5px; letter-spacing:.11em; text-transform:uppercase; }
.sf__uso{ margin:0; padding:14px 18px; border-top:1px solid var(--line); font-size:10.5px; color:var(--ink-50); }
.sf--malha .sf__uso{ border-color:rgba(255,255,255,.42); color:rgba(255,255,255,.88); }
"""


# ------------------------------------------------------- 05 · COMPONENTES
COMP = """<h1 class="tit">Componentes</h1>
<p class="sub">Nada é arredondado: não existe <code>border-radius</code> em lugar nenhum do CSS.
  Todo botão tem 50 px de altura (42 na versão pequena) e 26 px de respiro lateral.</p>
<div class="corpo cp">
  <div>
    <div class="rot">Botões</div>
    <div class="cx">
      <div class="cx__l"><span class="b b--solid">Iniciar projeto <i>→</i></span><span class="rot2">solid · preto, a ação principal em toda a página</span></div>
      <div class="cx__l"><span class="b b--ghost">Ver projetos</span><span class="rot2">ghost · branco com borda e sombra</span></div>
      <div class="cx__l"><span class="b b--solid">Enviar mensagem <i>→</i></span><span class="rot2">o botão do formulário é o mesmo</span></div>
      <div class="cx__l"><span class="b b--sm b--solid">Versão pequena</span><span class="rot2">sm · 42 px, texto 13 px</span></div>
    </div>
    <div class="rot" style="margin-top:24px">Seta</div>
    <p class="nota" style="margin:8px 0 0">A seta é um SVG de 14 px que anda 4 px para a direita no
      <code>:hover</code>. É o único movimento de interação do site.</p>
  </div>
  <div>
    <div class="rot">Selo</div>
    <div class="cx" style="padding:26px 20px">
      <span class="selo"><b>Novo</b>O sistema do estúdio em 20 segundos <i>→</i></span>
    </div>
    <p class="nota" style="margin:10px 0 0">Pílula branca com sombra; a etiqueta dentro dela é
      rosa com texto branco. Só existe no hero.</p>
    <div class="rot" style="margin-top:24px">Rótulo micro e cabeçalho de dobra</div>
    <div class="cx">
      <span class="micro" style="color:var(--ink-35)"><b style="color:var(--rosa)">03</b> &nbsp; Serviços</span>
      <div style="font-size:26px;font-weight:300;letter-spacing:-.02em;margin-top:14px">Três frentes, um sistema só.</div>
    </div>
    <div class="rot" style="margin-top:24px">Marcador de lista</div>
    <div class="cx">
      <div class="li"><s></s>Plataforma e territórios de marca</div>
      <div class="li"><s></s>Símbolo, logotipo e tipografia</div>
    </div>
    <p class="nota" style="margin:10px 0 0">Quadrado de 7 px no tom do card, alinhado pela base do
      texto. Cada item é separado por uma régua, não por espaço.</p>
  </div>
</div>"""

CSS_COMP = """
.cp{ display:grid; grid-template-columns:1fr 1fr; gap:52px; }
.cx{ margin-top:8px; padding:17px 20px; border:1px solid var(--line); background:var(--white); }

.cx__l{ display:flex; align-items:center; gap:20px; padding:8px 0; }
.cx__l + .cx__l{ border-top:1px solid var(--line-soft); }

.b{ display:inline-flex; align-items:center; gap:10px; height:44px; padding:0 23px; font-size:13px; font-weight:600; white-space:nowrap; }
.b i{ font-style:normal; font-size:12px; }
.b--sm{ height:36px; padding:0 18px; font-size:12px; }
.b--solid{ background:var(--ink); color:var(--white); }
.b--ghost{ background:var(--white); border:1px solid var(--line); color:var(--ink); box-shadow:var(--sombra); }

.rot2{ font-size:10px; color:var(--ink-50); }

.selo{ display:inline-flex; align-items:center; gap:10px; padding:5px 12px 5px 5px;
  border:1px solid var(--line); background:var(--white);
  box-shadow:var(--sombra); font-size:11.5px; color:var(--ink-70); }
.selo b{ background:var(--rosa); color:var(--white); padding:4px 10px;
  font-size:9.5px; font-weight:600; letter-spacing:.1em; text-transform:uppercase; }
.selo i{ font-style:normal; }
.li{ display:flex; align-items:baseline; gap:11px; font-size:12px; color:var(--ink-70); padding:10px 0; }
.li + .li{ border-top:1px solid var(--line-soft); }
.li s{ width:7px; height:7px; background:var(--rosa); flex:none; text-decoration:none; }
"""
