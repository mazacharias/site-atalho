# -*- coding: utf-8 -*-

TEXTURA = """<h1 class="tit">A textura do hero</h1>
<p class="sub">Uma grade de quadrados sobre o preto, com alguns deles acesos.
  Não é imagem nem canvas: são dois gradientes de uma listra só, repetidos pelo
  <code>background-size</code> e centrados, para as linhas caírem simétricas em qualquer largura.</p>
<div class="corpo tx">
  <div class="tx__demo">
    <div class="tx__grade"></div>
    <div class="tx__veu"></div>
    <div class="tx__txt">Design é a estratégia<br>que se pode ver.</div>
  </div>
  <div>
    <div class="rot">Os três números</div>
    <table class="tab" style="margin-top:10px">
      <tr><th>Token</th><th>Valor</th><th>Controla</th></tr>
      <tr><td><code>--celula</code></td><td>74 → 128 px</td><td>Tamanho do quadrado</td></tr>
      <tr><td><code>--grade</code></td><td>azul-claro 16%</td><td>Força da linha</td></tr>
      <tr><td><code>--aceso</code></td><td>azul-claro 5,5%</td><td>Quadrados preenchidos</td></tr>
    </table>
    <p class="nota" style="margin-top:16px">As duas opacidades vivem no limite do "quase não se vê".
      Subir a da linha transforma a textura em wireframe; subir a dos quadrados faz eles virarem manchas.</p>
    <div class="rot" style="margin-top:22px">Os quadrados acesos</div>
    <p class="nota" style="margin:8px 0 0">Seis camadas <code>no-repeat</code> de uma célula cada,
      posicionadas a partir do centro. Como a grade também parte do centro, cada quadrado cai
      exatamente dentro de uma célula, sem media query. Para mover, troque os pares de números;
      para acrescentar, some uma camada em <code>background-image</code>, <code>background-repeat</code>
      e <code>background-position</code> ao mesmo tempo: as três listas precisam ter o mesmo número de itens.</p>
    <div class="rot" style="margin-top:22px">A máscara</div>
    <p class="nota" style="margin:8px 0 0">Uma elipse radial apaga a grade no meio, onde fica o texto,
      e a devolve em direção às bordas. Sem ela a textura corre de ponta a ponta e briga com o título.
      Ela vive em <code>.hero::before</code> e não no <code>.hero</code>: aplicada no elemento,
      apagaria também o texto.</p>
  </div>
</div>"""

CSS_TEXTURA = """
.tx{ display:grid; grid-template-columns:1.05fr 1fr; gap:46px; }
.tx__demo{ position:relative; background:var(--ink); height:100%; min-height:400px; overflow:hidden; }
.tx__grade{ position:absolute; inset:0;
  --celula:76px; --grade:rgba(90,108,226,.16); --aceso:rgba(90,108,226,.055);
  background-image:
    linear-gradient(to right,  var(--grade) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grade) 1px, transparent 1px),
    linear-gradient(var(--aceso), var(--aceso)),
    linear-gradient(var(--aceso), var(--aceso)),
    linear-gradient(var(--aceso), var(--aceso));
  background-size:var(--celula) var(--celula);
  background-repeat:repeat,repeat,no-repeat,no-repeat,no-repeat;
  background-position:center center, center center,
    calc(50% - 2 * var(--celula)) calc(50% - 2 * var(--celula)),
    calc(50% + 2 * var(--celula)) calc(50% + 2 * var(--celula)),
    calc(50% - 3 * var(--celula)) calc(50% + 1 * var(--celula));
}
.tx__veu{ position:absolute; inset:0;
  background:radial-gradient(ellipse 62% 58% at 50% 50%, #0c0d12 30%, rgba(12,13,18,.60) 68%, rgba(12,13,18,0) 100%); }
.tx__txt{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  text-align:center; color:var(--on-dark); font-size:31px; font-weight:600;
  letter-spacing:-.026em; line-height:1.05; }
"""

# ---------------------------------------------------------- 07 · MOVIMENTO
MOV = """<h1 class="tit">Movimento</h1>
<p class="sub">O site quase não se mexe. Existem três movimentos, e só três.</p>
<div class="corpo mv">
  <div class="mv__c">
    <div class="mv__n">01</div>
    <h3>Revelação ao rolar</h3>
    <p class="nota">Cada bloco sobe 14 px e ganha opacidade quando entra na tela, uma vez só.
      O atraso em cascata vem do atributo <code>data-d</code> na marcação, não do CSS.</p>
    <div class="mv__d">
      <span style="opacity:.25">bloco</span><span style="opacity:.55">bloco</span><span style="opacity:1">bloco</span>
    </div>
  </div>
  <div class="mv__c">
    <div class="mv__n">02</div>
    <h3>A seta do botão</h3>
    <p class="nota">Anda 4 px para a direita no <code>:hover</code>, em 0,3 s.
      É o único retorno de interação além da troca de cor.</p>
    <div class="mv__d"><span class="mv__bt">Iniciar projeto →</span></div>
  </div>
  <div class="mv__c">
    <div class="mv__n">03</div>
    <h3>O filme da dobra Sistema</h3>
    <p class="nota">Vinte segundos em cinco atos: contato, conversa assíncrona, briefing, cronograma
      e entregas. Feito em SVG e renderizado quadro a quadro; sai em H.264 (103 KB) e VP9 (212 KB).
      Nada é baixado antes do clique: até lá existe só a imagem de capa.</p>
    <div class="mv__atos"><i>01</i><i>02</i><i>03</i><i>04</i><i>05</i></div>
  </div>
</div>
<div class="mv__rod">
  <div class="rot" style="color:var(--brand)">Curva e acessibilidade</div>
  <p class="nota" style="margin:8px 0 0;max-width:none">Toda transição usa a mesma curva,
    <code>cubic-bezier(.22, .61, .36, 1)</code>, guardada no token <code>--ease</code>.
    Com <code>prefers-reduced-motion</code> ligado, a revelação é desligada e os blocos aparecem prontos.
    O site também funciona sem JavaScript: uma regra em <code>&lt;noscript&gt;</code> devolve
    a opacidade de todos os blocos.</p>
</div>"""

CSS_MOV = """
.mv{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
.mv__c{ border-top:2px solid var(--ink); padding-top:16px; display:flex; flex-direction:column; }
.mv__n{ font-size:9.5px; font-weight:600; letter-spacing:.16em; color:var(--brand); }
.mv__c h3{ margin:10px 0 8px; font-size:17px; font-weight:600; letter-spacing:-.015em; }
.mv__d{ margin-top:auto; padding-top:20px; display:flex; gap:8px; align-items:center; }
.mv__d > span{ font-size:10px; padding:7px 11px; background:var(--brand-tint); color:var(--ink-70); }
.mv__bt{ background:var(--brand) !important; color:#fff !important; font-weight:600; padding:10px 15px !important; }
.mv__atos{ margin-top:auto; padding-top:20px; display:flex; gap:6px; }
.mv__atos i{ flex:1; height:30px; background:var(--brand); color:#fff; font-style:normal;
  font-size:9.5px; font-weight:600; display:flex; align-items:center; justify-content:center; }
.mv__atos i:nth-child(1){ opacity:1 }
.mv__atos i:nth-child(2){ opacity:.85 }
.mv__atos i:nth-child(3){ opacity:.7 }
.mv__atos i:nth-child(4){ opacity:.55 }
.mv__atos i:nth-child(5){ opacity:.4 }
.mv__rod{ margin-top:26px; padding-top:20px; border-top:1px solid var(--line); }
"""
