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

  /* ---------- 7. Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
