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
     todo junto. Os pontos são pixels quadrados, agrupados em seis níveis de
     brilho e desenhados em lote, com dithering Bayer entre os níveis.       */
  var tela = document.getElementById('padrao');
  if (tela && tela.getContext) {
    var ctx = tela.getContext('2d');
    var COR = [159, 176, 238];          /* o mesmo azul-claro do resto do hero */
    var PARADO = 3.2, TRANS = 2.1;      /* segundos parado em cada forma / de transição */
    var ESPALHA = 0.5;                  /* quanto os pontos se atrasam entre si */
    var FOV = 3.2;                      /* distância da câmera, em unidades de mundo */
    var FOLGA = 1.30;                   /* quanto o lençol passa da largura do quadro */
    var SOBRA_CIMA = 0.14, SOBRA_BAIXO = 0.34;  /* e das pontas, em alturas de quadro */

    var larg = 0, alt = 0, dpr = 1, cols = 0, linhas = 0, N = 0;
    var formas = [], atrasos = null;

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

    /* Seis níveis de brilho, do azul do hero até quase branco. Os pontos são
       agrupados por nível e desenhados em lote: um fillStyle por nível, e não
       um por ponto. A escadinha entre os níveis é quebrada pela matriz de
       dithering, a mesma Bayer 8x8 das versões anteriores do hero.          */
    var NIVEIS = 6, paleta = [], niveis = [];
    var BAYER = [
      [0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],
      [12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],
      [3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],
      [15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]
    ];
    var fazerPaleta = function () {
      paleta = [];
      for (var k = 0; k < NIVEIS; k++) {
        var f = k / (NIVEIS - 1);
        var r = Math.round(COR[0] + (255 - COR[0]) * f * 0.62);
        var g = Math.round(COR[1] + (255 - COR[1]) * f * 0.62);
        var b = Math.round(COR[2] + (255 - COR[2]) * f * 0.62);
        paleta.push('rgba(' + r + ',' + g + ',' + b + ','
          + Math.min(1, (k + 1.15) / NIVEIS).toFixed(3) + ')');
      }
    };

    var DEFS = [
      /* Estrela — halftone: a malha é uma folha de células quadradas e só
         acendem os pontos dentro da superelipse |x|^0.6 + |y|^0.6 <= 1. Torcer
         a malha para dentro da forma amontoaria pontos nas diagonais */
      { tipo: 'livre', plano: 1, giro: 1, ganho: 0.86,
        cam: { pitch: 0.05, escala: 0.47, sobe: 0.00 },
        vao: function (c) { return 2.24 * c.prop; },
        p: function (u, v, o, c) {
          var altura = 2.24, largura = altura * c.prop;
          var x = (u * 2 - 1) * largura / 2, y = (v * 2 - 1) * altura / 2;
          var d = Math.pow(Math.abs(x / 1.06), 0.6) + Math.pow(Math.abs(y / 1.06), 0.6);
          var peso = Math.min(1, Math.max(0, (1 - d) / 0.22));
          o[0] = x; o[1] = y; o[2] = (1 - Math.min(1, d)) * 0.26 * peso; o[3] = peso;
        } },
      /* Esfera — o acos espalha as latitudes por área igual, senão a malha
         engrossa no equador */
      { tipo: 'livre', plano: 0, giro: 1, ganho: 0.28, vao: 5.5,
        cam: { pitch: 0.08, escala: 0.50, sobe: 0.00 },
        p: function (u, v, o) {
          var th = u * Math.PI * 2, ph = Math.acos(1 - 2 * (v * 0.996 + 0.002));
          var sp = Math.sin(ph);
          o[0] = 0.96 * sp * Math.cos(th); o[1] = 0.96 * Math.cos(ph);
          o[2] = 0.96 * sp * Math.sin(th); o[3] = 1;
        } },
      /* Montanha — um pico central, texturizado pelo ruído. Numa malha regular
         na tela os pontos não se acumulam na silhueta, então a crista não
         acende sozinha: quem acende é a inclinação do terreno, medida aqui por
         diferença finita e guardada no peso do ponto */
      { tipo: 'lencol', plano: 0, giro: 0.30, ganho: 1,
        /* câmera baixa: assim a linha do horizonte entra no quadro e o pico
           sobe contra o céu escuro, em vez de virar uma cúpula vista de cima */
        cam: { pitch: 0.20, escala: 0.62, sobe: 0.02 },
        relevo: function (x, z) {
          /* o pico fica um pouco adiante do centro: assim sobra chão na frente
             dele, e a montanha é vista de longe em vez de colada na câmera */
          var dz = z + 1.0, r2 = x * x + dz * dz;
          return 0.85 * Math.exp(-2.2 * r2) * (0.70 + 0.52 * fbm(x * 0.95 + 3.4, z * 0.95 + 2.2))
               + 0.10 * fbm(x * 1.9 + 11, z * 1.9 + 6) - 0.06;
        },
        campo: function (x, z, o) {
          var e = 0.07, h = this.relevo(x, z);
          var gx = this.relevo(x + e, z) - this.relevo(x - e, z);
          var gz = this.relevo(x, z + e) - this.relevo(x, z - e);
          var incl = Math.sqrt(gx * gx + gz * gz) / (2 * e);
          o[0] = h;
          o[1] = 1;                                     /* tamanho do pixel */
          o[2] = 0.72 + 0.28 * Math.min(1, incl * 0.9);  /* brilho: acende a crista */
        } },
      /* Onda — o mesmo chão, agora só com senos cruzados, e estes andam com o
         tempo: é o único movimento próprio de uma forma */
      { tipo: 'lencol', plano: 0, giro: 0.30, ganho: 1,
        cam: { pitch: 0.50, escala: 0.62, sobe: -0.04 },
        campo: function (x, z, o) { o[0] = 0; o[1] = 1; o[2] = 1; },
        altura: function (x, z, t) {
          return 0.26 * Math.sin(x * 1.5 + z * 0.7 + t * 0.75)
               + 0.11 * Math.sin(z * 2.1 - t * 0.55);
        } }
    ];

    /* Onde o raio que passa por um ponto da tela encontra o plano do chão.
       É isto que faz o lençol cobrir o quadro inteiro por construção — se a
       malha fosse um retângulo no mundo, a borda dela entraria no
       enquadramento e abriria uma fenda preta atravessando a arte.          */
    var noChao = function (a, b, cp, sp, o) {
      var den = b * cp - sp * FOV;
      if (den > -1e-3) return false;            /* acima da linha do horizonte */
      var z = b * FOV / den;
      var pers = FOV / (FOV - z * cp);
      if (pers < 0.04) return false;
      o[0] = a / pers; o[1] = z;
      return true;
    };

    var montar = function () {
      var alvo = Math.min(5200, Math.max(1700, Math.round(larg * alt / 220)));
      var prop = Math.max(0.6, Math.min(1.9, larg / Math.max(1, alt)));
      cols = Math.max(24, Math.round(Math.sqrt(alvo * prop)));
      linhas = Math.max(18, Math.round(alvo / cols));
      N = cols * linhas;

      var meio = Math.min(larg, alt);
      formas = [];
      var o = [0, 0, 0, 1], ch = [0, 0], cp2 = [0, 1, 1], cfg = { prop: cols / linhas };

      for (var f = 0; f < DEFS.length; f++) {
        var D = DEFS[f], pos = new Float32Array(N * 3);
        var peso = new Float32Array(N), lum = new Float32Array(N);
        var xz = null, lado = 0, fixo = 1;

        if (D.tipo === 'lencol') {
          var cp = Math.cos(D.cam.pitch), sp = Math.sin(D.cam.pitch);
          var escala = meio * D.cam.escala;
          var cxs = larg / 2, cys = alt / 2 + meio * D.cam.sobe;
          xz = new Float32Array(N * 2);
          for (var i = 0; i < N; i++) {
            /* a malha é regular na tela, com folga nas laterais e nas pontas */
            var sx = cxs + ((i % cols) / (cols - 1) - 0.5) * larg * FOLGA;
            /* a folga em cima e embaixo é grande de propósito: o relevo desloca
               o ponto na vertical, e perto da câmera esse deslocamento passa de
               200 px. Sem essa sobra, abre um vazio na beirada do quadro */
            var sy = -alt * SOBRA_CIMA
                   + (Math.floor(i / cols) / (linhas - 1)) * alt * (1 + SOBRA_CIMA + SOBRA_BAIXO);
            var a = (sx - cxs) / escala, b = (cys - sy) / escala;
            var ok = noChao(a, b, cp, sp, ch);
            var x = ok ? ch[0] : a * 7, z = ok ? ch[1] : -7;
            D.campo.call(D, x, z, cp2);
            xz[i * 2] = x; xz[i * 2 + 1] = z;
            pos[i * 3] = x; pos[i * 3 + 1] = cp2[0]; pos[i * 3 + 2] = z;
            peso[i] = ok ? cp2[1] : 0; lum[i] = cp2[2];
          }
          /* na tela o espaçamento já é uniforme, então o lado quase não depende
             da profundidade — só o bastante para o perto pesar mais que o longe */
          lado = larg * FOLGA / cols * 0.44;
          fixo = 0.30;
        } else {
          var vao = typeof D.vao === 'function' ? D.vao(cfg) : D.vao;
          for (var j = 0; j < N; j++) {
            D.p((j % cols) / cols, (Math.floor(j / cols) + 0.5) / linhas, o, cfg);
            pos[j * 3] = o[0]; pos[j * 3 + 1] = o[1]; pos[j * 3 + 2] = o[2];
            peso[j] = o[3]; lum[j] = 1;
          }
          lado = meio * D.cam.escala * (vao / cols) * 0.62;
        }

        formas.push({ pos: pos, peso: peso, lum: lum, xz: xz, altura: D.altura || null,
                      cam: D.cam, plano: D.plano, giro: D.giro,
                      lado: lado * D.ganho, dep: fixo });
      }

      atrasos = new Float32Array(N);
      for (var k = 0; k < N; k++) atrasos[k] = hash2(k * 0.731, k * 0.219);
    };

    var medir = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      larg = tela.clientWidth; alt = tela.clientHeight;
      if (!larg || !alt) return;
      tela.width = Math.round(larg * dpr); tela.height = Math.round(alt * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      montar();
      if (!paleta.length) fazerPaleta();
      niveis = [];
      for (var k = 0; k < NIVEIS; k++) niveis.push({ v: new Float32Array(N * 3), n: 0 });
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
      var quantoGira = A.giro + (B.giro - A.giro) * me;

      /* no meio da transição os pontos se amontoam e a soma de luz estoura;
         esta queda de brilho segura o clarão e ainda ajuda a leitura */
      var fatorLuz = 1 - 0.38 * Math.sin(Math.PI * m);

      /* o lençol é desenhado a partir da tela, então gira pouco: um giro largo
         traria a borda dele para dentro do quadro */
      var yaw = Math.sin(t * 0.19) * 0.26 * quantoGira;
      var roll = t * 0.16 * chato;      /* giro no próprio plano, só nas formas chatas */
      var cy = Math.cos(yaw), sy = Math.sin(yaw);
      var cp = Math.cos(pitch), sp = Math.sin(pitch);
      var cr = Math.cos(roll), sr = Math.sin(roll);

      var meio = Math.min(larg, alt), escala = meio * esc;
      var cxs = larg / 2, cys = alt / 2 + meio * sobe;

      for (var q = 0; q < NIVEIS; q++) niveis[q].n = 0;

      var pa = A.pos, pb = B.pos, wa = A.peso, wb = B.peso, la2 = A.lum, lb2 = B.lum;
      for (var i = 0; i < N; i++) {
        var k = m === 0 ? 0 : suave(m * (1 + ESPALHA) - atrasos[i] * ESPALHA);
        var j = i * 3, i2 = i * 2;
        /* a onda tem movimento próprio: a altura dela é recalculada a cada quadro */
        var ya = A.altura ? A.altura(A.xz[i2], A.xz[i2 + 1], t) : pa[j + 1];
        var yb = B.altura ? B.altura(B.xz[i2], B.xz[i2 + 1], t) : pb[j + 1];

        var x = pa[j] + (pb[j] - pa[j]) * k;
        var y = ya + (yb - ya) * k;
        var z = pa[j + 2] + (pb[j + 2] - pa[j + 2]) * k;
        var peso = wa[i] + (wb[i] - wa[i]) * k;
        var lum = la2[i] + (lb2[i] - la2[i]) * k;
        if (peso < 0.02) continue;

        var x1 = x * cr - y * sr, y1 = x * sr + y * cr;      /* giro no plano */
        var x2 = x1 * cy + z * sy, z2 = -x1 * sy + z * cy;   /* giro no eixo vertical */
        var y3 = y1 * cp - z2 * sp, z3 = y1 * sp + z2 * cp;  /* inclinação da câmera */

        var pers = FOV / (FOV - z3);
        if (pers < 0.02) continue;
        var sx = cxs + x2 * escala * pers, sy2 = cys - y3 * escala * pers;
        if (sx < -14 || sx > larg + 14 || sy2 < -14 || sy2 > alt + 14) continue;

        /* no lençol o lado quase não varia, porque a malha já é regular na tela */
        var la = A.lado * (1 - A.dep + A.dep * pers);
        var lb = B.lado * (1 - B.dep + B.dep * pers);
        var lado = (la + (lb - la) * k) * peso;
        if (lado < 0.7) continue;
        if (lado > 13) lado = 13;
        var px = sx - lado / 2 | 0, py = sy2 - lado / 2 | 0;

        var prof = Math.min(1, Math.max(0, (pers - 0.30) / 1.2));
        var luz = (0.42 + 0.58 * prof) * peso * lum * fatorLuz;
        /* o dithering desmancha a escadinha entre os seis níveis */
        var nivel = luz * NIVEIS + (BAYER[(py >> 1) & 7][(px >> 1) & 7] / 64 - 0.5) | 0;
        if (nivel < 0) continue;
        if (nivel > NIVEIS - 1) nivel = NIVEIS - 1;

        var alvo = niveis[nivel], w = alvo.n * 3;
        alvo.v[w] = px; alvo.v[w + 1] = py; alvo.v[w + 2] = Math.round(lado) || 1;
        alvo.n++;
      }

      /* um fillStyle por nível, e os pontos daquele nível de uma vez */
      for (var q2 = 0; q2 < NIVEIS; q2++) {
        var nv = niveis[q2];
        if (!nv.n) continue;
        ctx.fillStyle = paleta[q2];
        var vv = nv.v;
        for (var e = 0, ate = nv.n * 3; e < ate; e += 3) {
          ctx.fillRect(vv[e], vv[e + 1], vv[e + 2], vv[e + 2]);
        }
      }
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
