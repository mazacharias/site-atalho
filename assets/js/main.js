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

  /* ---------- 7. Pássaro de pixels ----------
     O bicho não é sprite: a silhueta é um campo matemático — elipses para
     corpo, cabeça, cauda e asas — amostrado numa grade. Cada célula acende
     quando o campo passa de um limiar, e o limiar carrega uma matriz de
     dithering (Bayer 8x8): é ela que esfarela a borda em pixels em vez de
     deixar um contorno liso.                                              */
  var tela = document.getElementById('passaro');
  if (tela && tela.getContext) {
    var ctx = tela.getContext('2d');
    var BAYER = [
      [0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],
      [12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],
      [3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],
      [15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]
    ];
    var PASSO = 16, LADO = 11, larg = 0, alt = 0, escala = 1, dpr = 1;

    /* elipse com borda macia: 1 no miolo, some ao longe */
    var elipse = function (x, y, cx, cy, rx, ry, giro) {
      var dx = x - cx, dy = y - cy;
      var c = Math.cos(giro), s = Math.sin(giro);
      var u = (dx * c + dy * s) / rx, w = (-dx * s + dy * c) / ry;
      var d = Math.sqrt(u * u + w * w);
      return 1 - Math.min(1, Math.max(0, (d - 0.80) / 0.40));
    };

    /* asa: uma sequência de elipses ao longo de um arco, afinando para a ponta.
       Uma elipse só daria um bastão; a corrente é o que dá a curva da asa.   */
    var asa = function (x, y, lado, bat) {
      var v = 0;
      for (var k = 0; k <= 8; k++) {
        var u = k / 8;                                   // 0 no ombro, 1 na ponta
        var px = lado * (0.05 + u * 0.62);
        var py = -0.04
               + bat * Math.pow(u, 1.30) * 0.40          // sobe e desce
               + Math.pow(u, 2.2) * 0.07;                // leve queda da ponta
        var r = 0.082 * (1 - u * 0.80);                  // afina
        v = Math.max(v, elipse(x, y, px, py, r * 1.45, r, lado * bat * 0.5));
      }
      return v;
    };

    var campo = function (x, y, t) {
      var bat = Math.sin(t * Math.PI * 2);
      y -= bat * 0.030;                                  // o corpo sobe na batida
      var v = 0;
      v = Math.max(v, asa(x, y, -1, bat));               // asa esquerda
      v = Math.max(v, asa(x, y,  1, bat));               // asa direita
      v = Math.max(v, elipse(x, y, 0, 0.03, 0.062, 0.175, 0));      // corpo
      v = Math.max(v, elipse(x, y, 0, -0.155, 0.052, 0.050, 0));    // cabeça
      v = Math.max(v, elipse(x, y, 0, -0.215, 0.020, 0.026, 0));    // bico
      v = Math.max(v, elipse(x, y, -0.045, 0.255, 0.030, 0.075, 0.30));  // cauda
      v = Math.max(v, elipse(x, y,  0.045, 0.255, 0.030, 0.075, -0.30));
      return v;
    };

    var medir = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      larg = tela.clientWidth; alt = tela.clientHeight;
      tela.width = Math.round(larg * dpr);
      tela.height = Math.round(alt * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      PASSO = Math.max(10, Math.min(17, Math.round(Math.min(larg, alt) / 26)));
      LADO = PASSO - 5;
      // a envergadura vai de -0,67 a 0,67 e a altura de -0,47 a 0,34:
      // a escala sai daí, para as pontas das asas nunca saírem do quadro
      escala = Math.min(larg * 0.70, alt * 1.12);
    };

    var desenhar = function (t) {
      ctx.clearRect(0, 0, larg, alt);
      ctx.fillStyle = '#9fb0ee';
      var cx = larg / 2, cy = alt / 2;
      var cols = Math.ceil(larg / PASSO), linhas = Math.ceil(alt / PASSO);
      var mx = (larg - cols * PASSO) / 2, my = (alt - linhas * PASSO) / 2;

      for (var j = 0; j < linhas; j++) {
        for (var i = 0; i < cols; i++) {
          var px = mx + i * PASSO, py = my + j * PASSO;
          var x = (px + PASSO / 2 - cx) / escala;
          var y = (py + PASSO / 2 - cy) / escala;
          var v = campo(x, y, t);
          if (v <= 0) continue;
          var limiar = 0.42 + (BAYER[j & 7][i & 7] / 64 - 0.5) * 0.58;
          if (v > limiar) ctx.fillRect(Math.round(px), Math.round(py), LADO, LADO);
        }
      }
    };

    var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var inicio = 0;
    var quadro = function (agora) {
      if (!inicio) inicio = agora;
      desenhar(((agora - inicio) / 1000) * 0.52);          // ~0,5 batida por segundo
      requestAnimationFrame(quadro);
    };

    medir();
    if (parado) desenhar(0.62); else requestAnimationFrame(quadro);

    var remedir;
    window.addEventListener('resize', function () {
      clearTimeout(remedir);
      remedir = setTimeout(function () { medir(); if (parado) desenhar(0.25); }, 140);
    });
  }

  /* ---------- 8. Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
