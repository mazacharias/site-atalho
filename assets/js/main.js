/* =========================================================
   ATALHO STUDIO — comportamentos da interface
   Sem dependências. Funciona em qualquer hospedagem estática.
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header muda de estado ao rolar ---------- */
  var header = document.getElementById('header');
  if (header && !header.classList.contains('header--solid')) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 2. Menu mobile ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    var setNav = function (open) {
      document.body.classList.toggle('nav-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    burger.addEventListener('click', function () {
      setNav(!document.body.classList.contains('nav-open'));
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) setNav(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && document.body.classList.contains('nav-open')) setNav(false);
    });
  }

  /* ---------- 3. Acordeão de dúvidas ---------- */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    var btn = item.querySelector('.faq__q');
    var panel = item.querySelector('.faq__a');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // fecha os demais (comportamento de acordeão)
      item.closest('.faq').querySelectorAll('.faq__item.is-open').forEach(function (other) {
        if (other === item) return;
        other.classList.remove('is-open');
        other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq__a').style.height = '0px';
      });

      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.style.height = isOpen ? '0px' : panel.scrollHeight + 'px';
    });

    // mantém a altura correta quando a janela muda de largura
    window.addEventListener('resize', function () {
      if (item.classList.contains('is-open')) panel.style.height = panel.scrollHeight + 'px';
    });
  });

  /* ---------- 4. Revelação ao rolar ---------- */
  var targets = document.querySelectorAll('.reveal, .gantt');
  if (!('IntersectionObserver' in window) || reduced) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. Formulário de contato ----------
     Monta um e-mail com os dados preenchidos e abre o cliente de e-mail
     do visitante. Não exige backend — roda em hospedagem estática.
     Para receber direto na caixa de entrada, veja o LEIA-ME.md.       */
  var form = document.getElementById('form');
  if (form) {
    var status = document.getElementById('form-status');
    var padrao = status ? status.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var dados = {
        nome:     (form.nome.value || '').trim(),
        email:    (form.email.value || '').trim(),
        tipo:     form.tipo.value,
        prazo:    form.prazo.value,
        mensagem: (form.mensagem.value || '').trim()
      };

      if (!dados.nome || !dados.email || !dados.mensagem) {
        if (status) status.textContent = 'Preencha nome, e-mail e uma breve descrição.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(dados.email)) {
        if (status) status.textContent = 'Confira o endereço de e-mail.';
        return;
      }

      var destino = form.getAttribute('data-to') || 'contato@atalhostudio.com.br';
      var assunto = 'Novo projeto — ' + dados.tipo + ' — ' + dados.nome;
      var corpo =
        'Nome: ' + dados.nome + '\n' +
        'E-mail: ' + dados.email + '\n' +
        'Tipo de projeto: ' + dados.tipo + '\n' +
        'Prazo desejado: ' + dados.prazo + '\n\n' +
        'Sobre o projeto:\n' + dados.mensagem + '\n\n' +
        '— enviado pelo site do Atalho Studio';

      window.location.href = 'mailto:' + destino +
        '?subject=' + encodeURIComponent(assunto) +
        '&body='    + encodeURIComponent(corpo);

      if (status) {
        status.textContent = 'Abrindo seu app de e-mail… se não abrir, escreva para ' + destino + '.';
        setTimeout(function () { status.textContent = padrao; }, 12000);
      }
    });
  }

  /* ---------- 6. Vídeo ----------
     O pôster só dá lugar ao player quando alguém clica: nada de vídeo é
     baixado antes disso. Funciona com arquivo local (data-src / data-src-webm)
     ou com YouTube/Vimeo (data-youtube / data-vimeo). Veja o LEIA-ME.md.   */
  document.querySelectorAll('.video').forEach(function (fig) {
    var btn = fig.querySelector('.video__btn');
    if (!btn) return;

    var titulo = (fig.querySelector('.video__poster') || {}).alt || 'Vídeo';
    btn.setAttribute('aria-label', 'Reproduzir: ' + titulo);

    btn.addEventListener('click', function () {
      var yt = fig.getAttribute('data-youtube');
      var vm = fig.getAttribute('data-vimeo');
      var src = fig.getAttribute('data-src');
      var midia;

      if (yt || vm) {
        midia = document.createElement('iframe');
        midia.src = yt
          ? 'https://www.youtube-nocookie.com/embed/' + yt + '?autoplay=1&rel=0&modestbranding=1'
          : 'https://player.vimeo.com/video/' + vm + '?autoplay=1&title=0&byline=0';
        midia.allow = 'autoplay; fullscreen; picture-in-picture';
        midia.setAttribute('allowfullscreen', '');
        midia.title = titulo;
      } else if (src) {
        midia = document.createElement('video');
        midia.controls = true;
        midia.playsInline = true;
        midia.preload = 'auto';
        midia.setAttribute('playsinline', '');
        if (fig.getAttribute('data-poster')) midia.poster = fig.getAttribute('data-poster');

        var webm = fig.getAttribute('data-src-webm');
        if (webm) {
          var s1 = document.createElement('source');
          s1.src = webm; s1.type = 'video/webm';
          midia.appendChild(s1);
        }
        var s2 = document.createElement('source');
        s2.src = src; s2.type = 'video/mp4';
        midia.appendChild(s2);
      } else {
        return;
      }

      fig.classList.add('is-playing');
      fig.appendChild(midia);

      // se o navegador recusar o autoplay com som, toca sem som em vez de
      // deixar o visitante olhando para um quadro parado
      if (midia.play) {
        var tentativa = midia.play();
        if (tentativa && tentativa.catch) {
          tentativa.catch(function () { midia.muted = true; midia.play().catch(function () {}); });
        }
      }
    });
  });

  /* ---------- 7. Campo de pixels ----------
     Uma grade fixa de células quadradas, sem perspectiva: todo pixel tem o
     mesmo tamanho e a mesma cor. Cada forma é um campo — uma função que, para
     um ponto da tela, devolve um valor de 0 a 1. Quem transforma esse valor
     em preto e branco é o dithering (matriz Bayer 8x8): quanto maior o valor,
     mais chance a célula tem de acender. É o mesmo desenho da estrela e do
     pássaro, agora com três formas que se sucedem.

     A transição é a interpolação entre dois campos, com um atraso por célula:
     em vez de um corte, uma forma se desmancha em pixels enquanto a outra se
     escreve por cima.                                                       */
  var tela = document.getElementById('padrao');
  if (tela && tela.getContext) {
    var ctx = tela.getContext('2d');
    /* 4% mais escuro que o azul do fundo (#182889): o desenho aparece por
       diferença de tom, de leve, sem competir com o texto */
    var COR = '#172684';
    var PARADO = 3.4, TRANS = 1.9;   /* segundos parado em cada forma / de transição */
    var ESPALHA = 0.55;              /* quanto as células se atrasam entre si */

    var BAYER = [
      [0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],
      [12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],
      [3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],
      [15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]
    ];

    var larg = 0, alt = 0, dpr = 1, PASSO = 14, LADO = 9;
    var cols = 0, linhas = 0, meia = 1, mx = 0, my = 0, atrasos = null;
    var cxArte = 0, cyArte = 0, deitado = true;

    /* ---- as três formas, cada uma um campo (x, y, t) -> 0..1 ---- */

    /* Estrela: superelipse de expoente 0,6. Abaixo de 1 os lados ficam
       côncavos, e é daí que nascem as quatro pontas. Gira no próprio plano */
    var estrela = function (x, y, t) {
      var a = t * 0.17, c = Math.cos(a), s = Math.sin(a), R = 1.15;
      var u = (x * c + y * s) / R, w = (-x * s + y * c) / R;
      var d = Math.pow(Math.abs(u), 0.6) + Math.pow(Math.abs(w), 0.6);
      return (1 - d) / 0.20;
    };

    /* Duas setas para a direita. Cada uma é a faixa em volta de um "V"
       deitado: a aresta dianteira fica em x = ponta - |y|, e o que acende é
       a distância até ela. Uma onda de brilho atravessa as duas da esquerda
       para a direita — é ela que dá o sentido de avanço */
    var ALTURA = 1.05, GROSSURA = 0.34, PASSO_SETA = 0.82;
    var umaSeta = function (x, y, ponta) {
      if (Math.abs(y) > ALTURA) return 0;
      var d = Math.abs(x - (ponta - Math.abs(y)));
      return (GROSSURA - d) / 0.13;
    };
    var setas = function (x, y, t) {
      var anda = Math.sin(t * 0.8) * 0.045;
      /* as duas faixas correm paralelas, com uma folga constante de
         PASSO_SETA - 2 x GROSSURA entre elas. Encostar esse passo na grossura
         faz as setas se fundirem numa mancha só */
      var v = Math.max(umaSeta(x, y, 0.72 + anda), umaSeta(x, y, 0.72 - PASSO_SETA + anda));
      if (v <= 0) return 0;
      return v * (0.80 + 0.32 * Math.sin(x * 2.4 - t * 2.1));
    };

    /* Redemoinho: braços que saem do centro. O ângulo é somado ao raio, e é
       essa soma que entorta o braço reto e o transforma em espiral */
    var redemoinho = function (x, y, t) {
      var r = Math.sqrt(x * x + y * y);
      if (r < 0.02) return 1;
      var ang = Math.atan2(y, x);
      var braco = Math.sin(8 * (ang + r * 1.5) - t * 1.1);
      var disco = (1.06 - r) / 0.26;          /* a borda do disco se esfarela */
      return Math.min(disco, 0.40 + 0.74 * braco);
    };

    var CAMPOS = [estrela, setas, redemoinho];

    var hash2 = function (a, b) {
      var n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };

    var medir = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      larg = tela.clientWidth; alt = tela.clientHeight;
      if (!larg || !alt) return;
      tela.width = Math.round(larg * dpr); tela.height = Math.round(alt * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      PASSO = Math.max(9, Math.min(15, Math.round(Math.min(larg, alt) / 40)));
      LADO = Math.max(3, Math.round(PASSO * 0.62));   /* sobra preto entre um pixel e outro */
      cols = Math.ceil(larg / PASSO); linhas = Math.ceil(alt / PASSO);
      /* sobra dividida nas duas pontas, para a grade ficar centrada */
      mx = (larg - cols * PASSO) / 2; my = (alt - linhas * PASSO) / 2;

      /* A arte cobre o hero inteiro. No formato deitado o texto fica à
         esquerda, então o desenho é jogado para a direita; no formato em pé
         ele desce para baixo do texto. `meia` é grande de propósito: as formas
         passam das bordas e são cortadas por elas — é daí que vem o corte  */
      deitado = larg / Math.max(1, alt) > 1.15;
      meia = Math.min(larg, alt) * (deitado ? 0.62 : 0.80);
      cxArte = larg / 2;
      cyArte = alt / 2;

      atrasos = new Float32Array(cols * linhas);
      for (var i = 0; i < atrasos.length; i++) atrasos[i] = hash2(i * 0.731, i * 0.219);
    };

    var suave = function (v) {
      return v <= 0 ? 0 : v >= 1 ? 1 : v * v * v * (v * (v * 6 - 15) + 10);
    };

    var desenhar = function (t) {
      if (!cols) return;
      ctx.clearRect(0, 0, larg, alt);
      ctx.fillStyle = COR;

      var ciclo = PARADO + TRANS, n = CAMPOS.length, volta = ciclo * n;
      var fase = ((t % volta) + volta) % volta;
      var ia = Math.floor(fase / ciclo), local = fase - ia * ciclo;
      var A = CAMPOS[ia], B = CAMPOS[(ia + 1) % n];
      var m = local <= PARADO ? 0 : (local - PARADO) / TRANS;

      for (var j = 0; j < linhas; j++) {
        var py = my + j * PASSO;
        var y = (cyArte - (py + PASSO / 2)) / meia;
        for (var i = 0; i < cols; i++) {
          var px = mx + i * PASSO;
          var x = (px + PASSO / 2 - cxArte) / meia;

          /* o texto fica no meio, então o desenho abre um vazio ali. Não é uma
             máscara por cima: é o próprio valor do campo que cai perto do
             centro, e o dithering rareia os pixels sozinho — por isso a
             passagem não tem borda */
          /* Não há mais vazio no meio: com a cor a 4% do fundo, o desenho passa
             por trás do texto sem disputar leitura, e a forma fica inteira    */
          var v = A(x, y, t);
          if (m > 0) {
            var k = suave(m * (1 + ESPALHA) - atrasos[j * cols + i] * ESPALHA);
            if (k > 0) v += (B(x, y, t) - v) * k;
          }
          if (v <= 0) continue;
          if (v > 1) v = 1;

          /* o dithering troca o degradê por uma decisão por célula */
          if (v > 0.30 + (BAYER[j & 7][i & 7] / 64) * 0.58) {
            ctx.fillRect(Math.round(px), Math.round(py), LADO, LADO);
          }
        }
      }
    };

    var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var visivel = true, inicio = 0, ultimo = 0;
    var quadro = function (agora) {
      if (!inicio) inicio = agora;
      /* 20 quadros por segundo: o passo visível combina com a estética de pixel */
      if (visivel && agora - ultimo > 50) { ultimo = agora; desenhar((agora - inicio) / 1000); }
      requestAnimationFrame(quadro);
    };
    medir();
    if (parado) desenhar(PARADO * 0.5);   /* uma pose só: a estrela */
    else requestAnimationFrame(quadro);

    /* fora da tela não há por que gastar bateria desenhando */
    if (!parado && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; })
        .observe(tela);
    }

    var remedir;
    window.addEventListener('resize', function () {
      clearTimeout(remedir);
      remedir = setTimeout(function () {
        medir(); if (parado) desenhar(PARADO * 0.5);
      }, 140);
    });
  }

  /* ---------- 8. Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
