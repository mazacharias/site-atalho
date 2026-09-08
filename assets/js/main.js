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

  /* ---------- 7. Nuvem de pontos ----------
     Um único conjunto de pontos, indexado por uma malha (u,v), que se remodela
     entre quatro formas: estrela, esfera, montanha e onda. Cada forma é uma
     função (u,v) -> posição no espaço + peso do ponto; a transição interpola
     as duas formas vizinhas, com atraso por ponto para o enxame não chegar
     todo junto. O desenho usa composição 'lighter': onde os pontos se
     acumulam a luz soma e estoura em branco, e é daí que vem o brilho — sem
     ela seria preciso ordenar os pontos por profundidade, aqui não é.       */
  var tela = document.getElementById('padrao');
  if (tela && tela.getContext) {
    var ctx = tela.getContext('2d');
    var COR = [159, 176, 238];          /* o mesmo azul-claro do resto do hero */
    var PARADO = 3.2, TRANS = 2.1;      /* segundos parado em cada forma / de transição */
    var ESPALHA = 0.5;                  /* quanto os pontos se atrasam entre si */

    var larg = 0, alt = 0, dpr = 1, cols = 0, linhas = 0, N = 0;
    var formas = [], atrasos = null, sprite = null;

    /* ruído de valor, para o relevo da montanha */
    var hash2 = function (x, y) {
      var n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    var ruido = function (x, y) {
      var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      var a = hash2(xi, yi), b = hash2(xi + 1, yi);
      var c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };
    var fbm = function (x, y) {
      return ruido(x, y) * 0.54 + ruido(x * 2.1 + 5.2, y * 2.1 + 1.3) * 0.29
           + ruido(x * 4.3 + 9.1, y * 4.3 + 7.7) * 0.17;
    };

    var DEFS = [
      /* Estrela — halftone: a malha é uma folha de células quadradas e só
         acendem os pontos dentro da superelipse |x|^0.6 + |y|^0.6 <= 1. Torcer
         a malha para dentro da forma concentraria pontos demais nas diagonais */
      { plano: 1, cam: { pitch: 0.05, escala: 0.47, sobe: 0.00 }, ganho: 1.34,
        p: function (u, v, o, c) {
          var altura = 2.24, largura = altura * c.prop;
          var x = (u * 2 - 1) * largura / 2, y = (v * 2 - 1) * altura / 2;
          var d = Math.pow(Math.abs(x / 1.06), 0.6) + Math.pow(Math.abs(y / 1.06), 0.6);
          var peso = Math.min(1, Math.max(0, (1 - d) / 0.22));
          o[0] = x; o[1] = y; o[2] = (1 - Math.min(1, d)) * 0.26 * peso; o[3] = peso;
        } },
      /* Esfera — o acos espalha as latitudes por área igual, senão a malha
         engrossa no equador */
      { plano: 0, cam: { pitch: 0.08, escala: 0.50, sobe: 0.00 }, ganho: 0.60,
        p: function (u, v, o) {
          var th = u * Math.PI * 2, ph = Math.acos(1 - 2 * (v * 0.996 + 0.002));
          var sp = Math.sin(ph);
          o[0] = 0.96 * sp * Math.cos(th); o[1] = 0.96 * Math.cos(ph);
          o[2] = 0.96 * sp * Math.sin(th); o[3] = 1;
        } },
      /* Montanha — um pico central em sino, texturizado pelo ruído */
      { plano: 0, cam: { pitch: 0.34, escala: 0.62, sobe: -0.06 }, ganho: 1,
        p: function (u, v, o) {
          var x = (u * 2 - 1) * 1.5, z = (v * 2 - 1) * 1.5, r2 = x * x + z * z;
          var h = 1.60 * Math.exp(-1.4 * r2) * (0.70 + 0.52 * fbm(x * 0.95 + 3.4, z * 0.95 + 2.2))
                + 0.24 * fbm(x * 1.9 + 11, z * 1.9 + 6) - 0.20;
          o[0] = x; o[1] = h - 0.40; o[2] = z;
          o[3] = 0.55 + 0.45 * Math.min(1, Math.max(0, h));
        } },
      /* Onda — o mesmo lençol da montanha, agora só com senos cruzados */
      { plano: 0, cam: { pitch: 0.50, escala: 0.62, sobe: -0.04 }, ganho: 1,
        p: function (u, v, o) {
          var x = (u * 2 - 1) * 1.55, z = (v * 2 - 1) * 1.35;
          o[0] = x; o[2] = z;
          o[1] = 0.40 * Math.sin(x * 1.9 + z * 0.8) + 0.17 * Math.sin(z * 2.6 - 0.7) - 0.02;
          o[3] = 1;
        } }
    ];

    var montar = function () {
      var alvo = Math.min(4600, Math.max(1700, Math.round(larg * alt / 230)));
      var prop = Math.max(0.6, Math.min(1.9, larg / Math.max(1, alt)));
      cols = Math.max(24, Math.round(Math.sqrt(alvo * prop)));
      linhas = Math.max(18, Math.round(alvo / cols));
      N = cols * linhas;

      formas = [];
      var o = [0, 0, 0, 1], cfg = { prop: cols / linhas };
      for (var f = 0; f < DEFS.length; f++) {
        var pos = new Float32Array(N * 3), peso = new Float32Array(N);
        for (var i = 0; i < N; i++) {
          DEFS[f].p((i % cols) / cols, (Math.floor(i / cols) + 0.5) / linhas, o, cfg);
          pos[i * 3] = o[0]; pos[i * 3 + 1] = o[1]; pos[i * 3 + 2] = o[2];
          peso[i] = o[3];
        }
        formas.push({ pos: pos, peso: peso, cam: DEFS[f].cam,
                      plano: DEFS[f].plano, ganho: DEFS[f].ganho });
      }
      atrasos = new Float32Array(N);
      for (var k = 0; k < N; k++) atrasos[k] = hash2(k * 0.731, k * 0.219);
    };

    var fazerSprite = function () {
      var lado = 34, c = document.createElement('canvas');
      c.width = c.height = lado;
      var g = c.getContext('2d');
      var rgb = COR[0] + ',' + COR[1] + ',' + COR[2];
      var grad = g.createRadialGradient(lado / 2, lado / 2, 0, lado / 2, lado / 2, lado / 2);
      grad.addColorStop(0.00, 'rgba(255,255,255,1)');
      grad.addColorStop(0.26, 'rgba(' + rgb + ',0.78)');
      grad.addColorStop(0.60, 'rgba(' + rgb + ',0.20)');
      grad.addColorStop(1.00, 'rgba(' + rgb + ',0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, lado, lado);
      sprite = c;
    };

    var medir = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      larg = tela.clientWidth; alt = tela.clientHeight;
      if (!larg || !alt) return;
      tela.width = Math.round(larg * dpr); tela.height = Math.round(alt * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      montar();
      if (!sprite) fazerSprite();
    };

    var suave = function (x) {
      return x <= 0 ? 0 : x >= 1 ? 1 : x * x * x * (x * (x * 6 - 15) + 10);
    };

    var desenhar = function (t) {
      if (!N) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, larg, alt);
      ctx.globalCompositeOperation = 'lighter';

      var ciclo = PARADO + TRANS, n = formas.length, volta = ciclo * n;
      var fase = ((t % volta) + volta) % volta;
      var ia = Math.floor(fase / ciclo), local = fase - ia * ciclo;
      var A = formas[ia], B = formas[(ia + 1) % n];
      var m = local <= PARADO ? 0 : (local - PARADO) / TRANS, me = suave(m);

      /* a câmera também interpola: cada forma tem o seu enquadramento */
      var pitch = A.cam.pitch + (B.cam.pitch - A.cam.pitch) * me;
      var esc = A.cam.escala + (B.cam.escala - A.cam.escala) * me;
      var sobe = A.cam.sobe + (B.cam.sobe - A.cam.sobe) * me;
      var chato = A.plano + (B.plano - A.plano) * me;
      var ganho = A.ganho + (B.ganho - A.ganho) * me;

      /* no meio da transição os pontos se amontoam e a soma de luz estoura;
         esta queda de brilho segura o clarão e ainda ajuda a leitura */
      var fatorLuz = 1 - 0.38 * Math.sin(Math.PI * m);

      var yaw = Math.sin(t * 0.19) * 0.30 + t * 0.055;
      var roll = t * 0.16 * chato;      /* giro no próprio plano, só nas formas chatas */
      var cy = Math.cos(yaw), sy = Math.sin(yaw);
      var cp = Math.cos(pitch), sp = Math.sin(pitch);
      var cr = Math.cos(roll), sr = Math.sin(roll);

      var meio = Math.min(larg, alt), escala = meio * esc;
      var cxs = larg / 2, cys = alt / 2 + meio * sobe;
      /* raio do ponto = espaçamento da malha na tela, 3 unidades de mundo / cols */
      var raio0 = Math.max(0.7, meio * esc * (3.0 / cols) * 0.46 * ganho);
      var FOV = 3.2;

      var pa = A.pos, pb = B.pos, wa = A.peso, wb = B.peso;
      for (var i = 0; i < N; i++) {
        var k = m === 0 ? 0 : suave(m * (1 + ESPALHA) - atrasos[i] * ESPALHA);
        var j = i * 3;
        var x = pa[j] + (pb[j] - pa[j]) * k;
        var y = pa[j + 1] + (pb[j + 1] - pa[j + 1]) * k;
        var z = pa[j + 2] + (pb[j + 2] - pa[j + 2]) * k;
        var peso = wa[i] + (wb[i] - wa[i]) * k;
        if (peso < 0.02) continue;

        var x1 = x * cr - y * sr, y1 = x * sr + y * cr;      /* giro no plano */
        var x2 = x1 * cy + z * sy, z2 = -x1 * sy + z * cy;   /* giro no eixo vertical */
        var y3 = y1 * cp - z2 * sp, z3 = y1 * sp + z2 * cp;  /* inclinação da câmera */

        var pers = FOV / (FOV - z3);
        var sx = cxs + x2 * escala * pers, sy2 = cys - y3 * escala * pers;
        var r = raio0 * pers * peso;
        if (r < 0.25 || sx < -20 || sx > larg + 20 || sy2 < -20 || sy2 > alt + 20) continue;

        var prof = Math.min(1, Math.max(0, (pers - 0.72) / 0.60));
        ctx.globalAlpha = (0.34 + 0.66 * prof) * peso * fatorLuz;
        ctx.drawImage(sprite, sx - r * 1.35, sy2 - r * 1.35, r * 2.7, r * 2.7);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var visivel = true, inicio = 0, ultimo = 0;
    var quadro = function (agora) {
      if (!inicio) inicio = agora;
      /* 30 quadros por segundo: acima disso o custo dobra sem ganho visível */
      if (visivel && agora - ultimo > 33) { ultimo = agora; desenhar((agora - inicio) / 1000); }
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
