# -*- coding: utf-8 -*-

REGRAS = """<h1 class="tit">Regras</h1>
<p class="sub">O que mantém o sistema inteiro. São poucas e valem sempre.</p>
<div class="corpo rg">
  <div class="rg__col">
    <div class="rg__t"><s>+</s>Faça</div>
    <ul class="rg__l">
      <li><b>Nada de canto vivo.</b> Quatro raios cobrem tudo: 26 px em mídia, 16 px em cartão e campo, 10 px em marca miúda, pílula em botão e selo.</li>
      <li><b>A cor não é fundo nem botão.</b> A base é branca e o peso é do preto; as sete matizes ficam nas mídias, nos selos e nas marcas pequenas.</li>
      <li><b>Alterne as superfícies.</b> Papel e branco se revezam na ordem do documento, para nenhuma dobra encostar em outra igual.</li>
      <li><b>Régua no lugar de espaço.</b> Listas e blocos se separam por uma linha de 13%, não por respiro extra.</li>
      <li><b>Um token por decisão.</b> Respiro, cor e largura vêm de variáveis; mudar a página inteira deve ser mudar uma linha.</li>
      <li><b>Números tabulares</b> em tabelas e cronogramas, para as colunas não dançarem.</li>
    </ul>
  </div>
  <div class="rg__col rg__col--nao">
    <div class="rg__t"><s>−</s>Não faça</div>
    <ul class="rg__l">
      <li><b>Sem dobra escura.</b> A página é clara de ponta a ponta; o preto é do texto e dos botões.</li>
      <li><b>Sem travessão no texto.</b> Use vírgula, dois-pontos, parênteses ou ponto final.
        O ponto médio (·) fica só como separador de rótulo. Meia-risca em intervalo (6–8 semanas) continua valendo.</li>
      <li><b>Sem sombra inventada.</b> Só os dois degraus do sistema, e o mais forte é estado de
        <code>:hover</code>, nunca valor de repouso.</li>
      <li><b>Sem segunda família tipográfica.</b> Um arquivo variável cobre do 300 ao 700.</li>
      <li><b>Sem cor fora das sete.</b> Estado, gráfico e ilustração saem da mesma paleta, na mesma ordem.</li>
      <li><b>Sem prova social fabricada.</b> Nada de número de avaliação ou depoimento que não exista.</li>
    </ul>
  </div>
</div>
<div class="rg__rod">
  <div>
    <div class="rot" style="color:var(--ink)">Onde tudo isso mora</div>
    <p class="nota" style="margin:8px 0 0">Os tokens estão no topo de <code>assets/css/style.css</code>,
      na seção 1. O <code>LEIA-ME.md</code> explica cada decisão e o que quebra ao mexer nela.</p>
  </div>
  <div>
    <div class="rot" style="color:var(--ink)">Peso</div>
    <p class="nota" style="margin:8px 0 0">HTML, CSS e JavaScript puros, sem build e sem dependência.
      A fonte são 93 KB; o JavaScript da página, 200 linhas. O primeiro carregamento no celular são 127 KB.</p>
  </div>
</div>"""

CSS_REGRAS = """
.rg{ display:grid; grid-template-columns:1fr 1fr; gap:34px; }
.rg__col{ border-top:2px solid var(--ink); padding-top:16px; }
.rg__col--nao{ border-top-color:var(--ink); }
.rg__t{ display:flex; align-items:center; gap:11px; font-size:15px; font-weight:600; letter-spacing:-.015em; }
.rg__t s{ width:20px; height:20px; background:var(--ink); color:var(--paper); text-decoration:none;
  display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:600; }
.rg__col--nao .rg__t s{ background:var(--ink); }
.rg__l{ margin:16px 0 0; padding:0; list-style:none; }
.rg__l li{ font-size:11.5px; line-height:1.62; color:var(--ink-70); padding:11px 0;
  border-top:1px solid var(--line-soft); }
.rg__l li b{ color:var(--ink); font-weight:600; }
.rg__rod{ margin-top:26px; padding-top:20px; border-top:1px solid var(--line);
  display:grid; grid-template-columns:1fr 1fr; gap:34px; }
"""

def aplicacao(img_hero, img_serv, img_proj):
    return f"""<h1 class="tit">Aplicação</h1>
<p class="sub">O sistema montado: hero com a bruma e a grade, dobra de conteúdo em cartões
  e página interna de projeto.</p>
<div class="corpo ap">
  <figure><img src="{img_hero}" alt=""><figcaption class="rot">Hero · bruma, grade e o botão preto</figcaption></figure>
  <div class="ap__dir">
    <figure><img src="{img_serv}" alt=""><figcaption class="rot">Dobra de conteúdo · três cartões, um tom cada</figcaption></figure>
    <figure><img src="{img_proj}" alt=""><figcaption class="rot">Página de projeto · a capa em malha</figcaption></figure>
  </div>
</div>"""

CSS_APL = """
.ap{ display:grid; grid-template-columns:1.28fr 1fr; gap:20px; }
.ap__dir{ display:flex; flex-direction:column; gap:20px; }
.ap figure{ margin:0; display:flex; flex-direction:column; height:100%; }
.ap img{ display:block; width:100%; height:auto; border:1px solid var(--line); flex:1; object-fit:cover; object-position:top; min-height:0; }
.ap figcaption{ margin-top:9px; }
"""

FIM = """<section class="slide pg pg--malha fim">
  <div class="fim__marca">picê</div>
  <p class="fim__t">Sistema visual · versão 1</p>
  <p class="fim__n">Este documento descreve o estado do site em setembro de 2026.
    Toda regra aqui tem correspondente em <code>assets/css/style.css</code>; quando os dois
    discordarem, o código é a fonte da verdade e este documento é que está velho.</p>
  <div class="fim__pe"><span class="micro">contato@pice.com.br</span><span class="micro">picê · São Paulo</span></div>
</section>"""

CSS_FIM = """
.fim{ justify-content:center; }
.fim__marca{ font-size:30px; font-weight:600; letter-spacing:-.03em; color:var(--white); }
.fim__t{ margin:22px 0 0; font-size:56px; font-weight:300; letter-spacing:-.028em; color:var(--white); }
.fim__n{ margin:24px 0 0; max-width:56ch; font-size:13px; line-height:1.72; color:rgba(255,255,255,.9); }
.fim__pe{ position:absolute; left:64px; right:64px; bottom:54px; display:flex; justify-content:space-between; }
.fim .micro{ color:rgba(255,255,255,.75); }
"""
