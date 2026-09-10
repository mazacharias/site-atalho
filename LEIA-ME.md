# picê — site

Site estático (HTML, CSS e JavaScript puros). Não precisa de build, Node, banco
de dados nem plugin. Basta enviar os arquivos para a hospedagem.

---

## 1. Como publicar na Hostinger

1. Entre no **hPanel** → **Sites** → escolha o seu domínio → **Gerenciador de arquivos**.
2. Abra a pasta **`public_html`** e apague o que estiver lá (normalmente um
   `default.php` ou uma página de "em construção").
3. Selecione **todo o conteúdo desta pasta** — os arquivos `.html`, a pasta
   `assets`, o `.htaccess`, o `robots.txt` e o `sitemap.xml` — e compacte em um `.zip`.
4. No Gerenciador de arquivos, clique em **Upload** e envie o `.zip`.
5. Clique com o botão direito no arquivo enviado → **Extract / Extrair**.
6. Apague o `.zip` e pronto: o site já está no ar.

> **Importante:** o conteúdo tem que ficar solto dentro de `public_html`, e não
> dentro de uma subpasta. O arquivo `index.html` precisa estar em
> `public_html/index.html`.

Se preferir FTP, os dados de acesso ficam em **hPanel → Arquivos → Contas de FTP**.

Depois de publicar, ative o **SSL grátis** em *Segurança → SSL*. Com o certificado
ativo, abra o `.htaccess` e descomente as três linhas que forçam `https`.

---

## 2. O que tem em cada arquivo

```
index.html            página única (estúdio, serviços, cronograma, projetos, dúvidas, contato)
projeto-01.html       página do projeto 1 — Meridiano Capital
projeto-02.html       página do projeto 2 — Verda
projeto-03.html       página do projeto 3 — Norte Coletivo
.htaccess             configuração do servidor (cache, compressão, URLs limpas)
robots.txt            instruções para buscadores
sitemap.xml           mapa do site para o Google

assets/css/style.css  todo o visual do site
assets/css/fonts.css  declaração da DM Sans
assets/js/main.js     menu, acordeão, revelação ao rolar e formulário
assets/fonts/         DM Sans hospedada no próprio site
assets/video/sistema.mp4   vídeo da seção Sistema (H.264, 103 KB)
assets/video/sistema.webm  o mesmo vídeo em WebM, para quem suporta
assets/img/sistema-poster.jpg  quadro que aparece antes do play
assets/img/favicon.svg  ícone da aba do navegador (o "p" da picê)
assets/img/*.svg        imagens dos projetos (espaços reservados)
```

---

## 3. O que trocar antes de publicar

Tudo abaixo é texto simples dentro dos arquivos `.html` — pode editar em
qualquer editor (VS Code, Bloco de Notas, ou o próprio editor da Hostinger).

**Dados de contato** — em `index.html`, procure por `contato@pice.com.br`:

- e-mail (aparece 2 vezes: na lista de contato e no atributo `data-to` do formulário);
- WhatsApp: troque `5511999999999` pelo seu número com DDI e DDD;
- Instagram: troque `pice.studio`.

**Números do estúdio** — a seção "Estúdio" tem `15+` e `6–8`. Ajuste para a
sua realidade.

**O hero** — tudo centrado, na ordem: o selo (`.selo`), o título (`<h1>`), a
linha de apoio (`.hero__lead`) e os dois botões. O selo aponta para a seção do
vídeo; troque o texto dele ou apague o bloco inteiro se não quiser.

O título quebra sozinho em até 15 caracteres por linha e a linha de apoio em
até 42 (`max-width` em `.hero h1` e `.hero__lead`).

**Domínio** — em `robots.txt` e `sitemap.xml`, troque
`https://www.pice.com.br` pelo seu endereço real.

---

## 4. Como trocar as imagens

As imagens que vieram no pacote são **espaços reservados** em SVG (formas
geométricas nas cores da marca). Você pode:

**Opção A — manter o nome do arquivo (mais simples).**
Salve a sua imagem com o mesmo nome do arquivo original, mas com a extensão
certa, e ajuste o `src` no HTML. Exemplo, em `index.html`:

```html
<!-- antes -->
<img src="assets/img/project-01.svg" alt="Projeto 01 — Meridiano Capital" ...>
<!-- depois -->
<img src="assets/img/meridiano-capa.jpg" alt="Meridiano Capital — identidade" ...>
```

**Opção B — trocar direto pela pasta.**
Envie os arquivos novos para `assets/img/` e atualize os `src` correspondentes.

Proporções usadas no layout (para cortar as imagens sem deformar):

| Onde | Arquivo atual | Proporção | Tamanho sugerido |
|---|---|---|---|
| Cartão de projeto (home) | `project-01/02/03.svg` | 4:5 (vertical) | 960 × 1200 px |
| Capa da página de projeto | `cover-01/02/03.svg` | 16:9 | 1600 × 900 px |
| Galeria dupla | `gal-a` … `gal-d.svg` | 4:3 | 1200 × 900 px |
| Galeria larga | `cover-0X.svg` | 16:9 | 1600 × 900 px |

Salve as fotos em **JPG** (qualidade 80) ou **WebP** e mantenha cada arquivo
abaixo de 300 KB — o site fica rápido e o Google gosta.

### O logo

A marca no cabeçalho e no rodapé é **a palavra "picê" escrita em DM Sans
minúscula**, como texto, não como imagem. Fica nítida em qualquer tela, sem
download nenhum, e a cor acompanha o fundo automaticamente.

Para mudar tamanho ou peso, edite `assets/css/style.css`:

```css
.brand{
  font-size: 21px;          /* tamanho */
  font-weight: 600;         /* 300, 400, 600 ou 700 */
  letter-spacing: -.026em;  /* mais negativo = letras mais juntas */
}
```

O favicon é a letra "p" da DM Sans, em branco sobre um ladrilho com a malha
de gradiente, em `assets/img/favicon.svg`. Não é texto: é o contorno da letra convertido em
vetor, para não depender de a fonte estar instalada em quem abre o arquivo.

### A fonte

O site inteiro usa **DM Sans**, hospedada no próprio servidor
(`assets/fonts/`) — nada é buscado no Google. É um único arquivo variável, com
os pesos de 300 a 700, o eixo óptico e a acentuação do português inteira, em
93 KB.

> **Sobre a Google Sans:** ela não pode ser usada aqui. É a tipografia
> proprietária do Google, não está no Google Fonts e a licença restringe o uso
> a produtos do próprio Google — não existe forma legítima de hospedá-la num
> site de terceiros. A DM Sans é a alternativa livre (SIL Open Font License)
> mais próxima dela: mesma família geométrica, mesmo ar de "a" e "g" de um
> andar só.

Trocar de fonte mexe em mais coisa do que o `font-family`: o tracking negativo
dos tamanhos de display no `style.css` está calibrado para o desenho estreito
da DM Sans. Numa grotesca mais larga, como a Open Sans, esses valores precisam
ficar mais negativos; numa mais estreita, menos.

## 5. Como funciona o formulário de contato

Por padrão, ao clicar em **Enviar mensagem** o site monta um e-mail já
preenchido e abre o programa de e-mail do visitante. Funciona em qualquer
hospedagem, sem configuração — mas depende de o visitante ter um app de e-mail
configurado.

Para receber as mensagens direto na sua caixa de entrada, escolha uma opção:

**Opção A — Formspree (grátis até 50 mensagens/mês, 2 minutos para configurar)**

1. Crie uma conta em `formspree.io` e um novo formulário. Você recebe uma URL
   parecida com `https://formspree.io/f/xxxxxxx`.
2. Em `index.html`, troque a linha de abertura do formulário por:

```html
<form class="form reveal" data-d="1" action="https://formspree.io/f/xxxxxxx" method="POST">
```

   (remova os atributos `id="form"`, `data-to` e `novalidate`).

3. Em `assets/js/main.js`, o bloco do formulário deixa de agir sozinho, porque
   ele só procura por um formulário com `id="form"`. Nada mais a fazer.

**Opção B — PHP da própria Hostinger**

A Hostinger executa PHP nos planos pagos. Crie um `enviar.php` na raiz com a
função `mail()` e aponte o `action` do formulário para ele. Se preferir esse
caminho, é só pedir que eu escrevo o arquivo.

---

## 6. O vídeo (seção Sistema)

A seção "Como um projeto anda" traz um filme de 20 segundos que explica o
sistema do estúdio em cinco atos: contato, conversa assíncrona, briefing,
cronograma e entregas. É tipografado em DM Sans, como o site, e termina no
último ato, sem cartela de marca no fim.

O player não baixa nada até alguém clicar em "Assistir": antes disso existe só
a imagem de capa (35 KB). O vídeo vai em dois formatos e o navegador escolhe —
WebM para quem suporta, MP4 para todo o resto.

### Trocar pelo seu vídeo

1. Exporte em **MP4 (H.264)**, 1600 × 900 ou 1920 × 1080, e salve como
   `assets/video/sistema.mp4`, sobrescrevendo o atual.
2. Exporte um quadro de capa e salve como `assets/img/sistema-poster.jpg`.
3. Se não tiver a versão WebM, apague o atributo `data-src-webm` da linha do
   `<figure class="video">` no `index.html`.

Mantenha o MP4 abaixo de 10 MB. Se o seu filme for maior, use YouTube ou Vimeo.

### Usar YouTube ou Vimeo

O player só carrega o embed depois do clique, então a página continua leve:

```html
<!-- YouTube: o ID é o que vem depois de v= na URL -->
<figure class="video reveal" data-youtube="SEU_ID_AQUI">

<!-- Vimeo: o ID é o número no fim da URL -->
<figure class="video reveal" data-vimeo="123456789">
```

Nos dois casos, apague `data-src` e `data-src-webm`, e troque a imagem de capa
dentro do `<figure>`.

### Como o vídeo atual foi feito

Não é filmagem nem software de motion: é uma animação em SVG desenhada por
código, renderizada quadro a quadro e codificada em vídeo. O arquivo-fonte da
animação não vai junto do site — se você quiser mudar o filme, o caminho normal
é exportar um novo de onde preferir e sobrescrever os arquivos acima.

O texto do botão ("Assistir · 20s") está no próprio `<button>`, e a linha
abaixo do vídeo está no bloco `<div class="video-meta">`. É texto comum.

## 7. Como adicionar um quarto projeto

1. Duplique `projeto-03.html` e renomeie para `projeto-04.html`.
2. Edite o conteúdo: título, textos, números e imagens.
3. Em `index.html`, dentro de `<div class="projects">`, duplique um bloco
   `<a class="project">…</a>` e aponte para `projeto-04.html`.
4. Acrescente o link no rodapé das quatro páginas e no `sitemap.xml`.

O layout dos projetos usa grade automática: com 4 cartões ele quebra em duas
linhas sozinho, sem precisar mexer no CSS.

---

## 8. Onde mexer no visual

Tudo o que define a aparência está no topo de `assets/css/style.css`, no bloco
`:root`. Trocar uma variável ali muda o site inteiro:

```css
--paper:  #f7f7f5;  /* chão da página */
--white:  #ffffff;  /* cartões, campos, mídia */
--ink:    #0e0e0d;  /* texto e botões */
--rosa:   #ff2d6f;  /* uma das sete cores de destaque */
--shell:  1280px;   /* largura máxima do conteúdo */
```

### A paleta

A base é branca. O chão da página é um branco levemente quente e as superfícies
elevadas são o branco puro; a diferença entre os dois, junto da sombra, é o que
separa cartão de fundo. **Nenhuma dobra é escura.**

```css
--paper:   #f7f7f5;   /* chão da página */
--paper-2: #fbfbfa;   /* faixa um pouco mais clara, usada no hero */
--white:   #ffffff;   /* cartões, campos, mídia */
--ink:     #0e0e0d;   /* texto e botões */
--ink-70 / --ink-50 / --ink-35        /* texto corrido, apoio, rótulo micro */
--line: 11% · --line-soft: 6%         /* réguas e divisórias */
```

A cor entra por cima disso, em sete matizes, e **cada uma tem duas versões**:

```css
--laranja: #ff8a00;   --laranja-t: #aa5c00;
--coral:   #ff5a3c;   --coral-t:   #db2200;
--rosa:    #ff2d6f;   --rosa-t:    #df0046;
--magenta: #e94ec4;   --magenta-t: #cd18a2;
--roxo:    #9b5df5;   --roxo-t:    #8c43f5;
--azul:    #4d7cff;   --azul-t:    #2961ff;
--ciano:   #16b3e0;   --ciano-t:   #0d7998;
```

São duas por causa do contraste. A versão viva é rasa: o `--laranja` tem 2,2:1
contra o papel, e branco sobre ele dá 2,4:1. Ela só preenche, e nunca é cor de
texto. Quem é texto, ou carrega texto branco, usa a versão `-t`, calibrada para
4,6:1 dos dois lados. Na prática: os quadrados da grade e a malha usam a viva;
número de dobra, rótulo, barra do cronograma e etiqueta usam a `-t`.

A regra é onde ela pode aparecer. **A cor nunca vira fundo de dobra e nunca
vira botão**; ela fica nos blocos de mídia, nos selos e nas marcas pequenas.
O que carrega peso continua sendo o preto: o botão principal é preto em toda
a página, porque com o fundo claro em todo lugar não existe mais a inversão
que a paleta anterior precisava.

Onde a cor aparece, na prática:

- os blocos de mídia (capas, galerias, o hero), que usam a mesma malha de
  gradiente girada no matiz;
- a bruma do hero e os quadrados acesos da grade, um por matiz;
- o número de cada dobra, que herda o `--tom` declarado na própria dobra;
- os cartões de serviço, as fases do cronograma, as entregas e os resultados,
  um tom cada, na ordem da paleta;
- a etiqueta "Novo" do selo, o anel de foco e a borda do campo em foco.

### O tom de cada dobra

Cada `<section>` declara o seu tom no próprio HTML, e tudo dentro dela herda:

```html
<section class="section s-white" id="servicos" style="--tom:var(--rosa-t)">
```

Para trocar a cor de uma dobra inteira, troque essa variável. Quem lê o `--tom`
é o número da dobra; os cartões de dentro têm o seu, definido por posição no
CSS.

### A malha de gradiente

Todos os blocos de mídia são o mesmo material: uma malha de cinco gradientes
radiais sobre um linear, sempre nas mesmas posições. O que muda de um bloco
para o outro é uma rotação de matiz, e é só isso que os diferencia.

Os arquivos em `assets/img/` são SVG gerados com essa malha, para servirem de
provisórios até entrarem as imagens reais. As rotações usadas ficam entre o
laranja e o azul, passando por rosa e violeta; girar para o verde-limão sai do
sistema.

### Cantos e sombras

Nada tem canto vivo. O raio faz parte do sistema:

```css
--r-lg:   26px;    /* blocos de mídia e cartões grandes */
--r-md:   16px;    /* cartões, campos, quadros pequenos */
--r-sm:   10px;
--r-pill: 999px;   /* botões, selos, etiquetas */
```

A elevação é uma sombra só, `--sombra`, com as duas camadas a 3%. Ela não
muda em nenhum estado: quem separa o cartão do fundo é a borda em `--line`,
e a sombra apenas sugere a altura.

### As guias tracejadas

Duas linhas tracejadas correm pela página inteira, nas margens. São um elemento
fixo (`.guias`), não uma borda de cada dobra: assim a linha não quebra na emenda
entre uma dobra e outra. Precisa de `z-index` acima das dobras, senão o fundo
opaco de cada uma a cobre. Abaixo de 860 px elas somem, porque o conteúdo passa
a encostar nas margens.

### A barra de navegação

A barra fica colada no topo e é translúcida: o fundo é o `--paper` a 82% com
`backdrop-filter`, então o conteúdo passa borrado por baixo dela. Ao rolar ela
encolhe, fica mais opaca e ganha uma sombra rasa.

Os links são pretos, sem esmaecer, e o retorno ao passar o mouse é um
sublinhado. O botão "Iniciar projeto" é preto, como todos os botões principais
do site. O menu mobile usa a mesma superfície.

Para mudar a barra, edite `.header` em `assets/css/style.css`:

```css
.header{ background:rgba(247, 247, 245, .82); backdrop-filter:blur(14px); }
```

### O hero

Uma dobra centrada, na ordem: o selo (`.selo`), o título, a linha de apoio e os
dois botões. O fundo é claro, o botão principal é preto e a etiqueta do selo
é rosa.

O fundo tem duas camadas. A de baixo (`.hero::after`) é a **bruma**: a mesma
paleta a uma fração da força, encostando no branco pelos quatro cantos, longe
do texto, que fica no meio. Ela está no token `--bruma`.

A de cima (`.hero::before`) é a **grade**. Não é imagem nem canvas: são dois
gradientes de uma listra só, um na vertical e outro na horizontal, repetidos
pelo `background-size`. Dois números controlam as linhas:

```css
.hero{
  --celula: clamp(74px, 7.6vw, 128px);   /* tamanho do quadrado */
  --grade:  rgba(14, 14, 13, .055);      /* força da linha */
}
```

A opacidade da linha precisa ficar no limite de "quase não se vê": subir
transforma a textura em wireframe. Os quadrados acesos são seis, um por matiz,
entre 15% e 20% de cor.

**Os quadrados acesos** são seis camadas `no-repeat` de uma célula cada, uma
por cor,
posicionadas a partir do centro:

```css
background-position: … , calc(50% - 5 * var(--celula)) calc(50% - 3 * var(--celula)), … ;
```

Como a grade também parte do centro, cada quadrado cai exatamente dentro de
uma célula em qualquer largura de tela. Para mudar onde eles ficam, troque os
pares de números; para ter mais ou menos, acrescente ou remova uma camada em
`background-image`, `background-repeat` e `background-position` ao mesmo tempo
— as três listas precisam ter o mesmo número de itens.

**A máscara** apaga a grade no meio, onde fica o texto, e a devolve em direção
às bordas:

```css
mask-image: radial-gradient(ellipse 62% 58% at 50% 50%,
            transparent 30%, rgba(0,0,0,.40) 68%, #000 100%);
```

Sem ela a textura corre de ponta a ponta e briga com o título. Ela precisa
estar no pseudo-elemento porque, aplicada no `.hero`, apagaria também o
texto.

> Versões anteriores tinham aqui um campo de pixels animado, desenhado em
> `<canvas>`. Ele saiu, e com ele saiu a seção 7 do `assets/js/main.js` — o
> arquivo hoje não tem nada ligado ao hero.

O título quebra sozinho em até 15 caracteres por linha e a linha de apoio em
até 42 (`max-width` em `.hero h1` e `.hero__lead`).

### O espaçamento entre as dobras

Um único token controla o respiro de todas as seções:

```css
--section: clamp(56px, 6.2vw, 96px);
```

### O cronograma

O diagrama da seção "Processo" é montado com duas variáveis por barra, dentro
do `index.html`:

```html
<span class="gantt__bar" style="--s:1; --n:2">Semanas 1–2</span>
```

`--s` é a semana em que a fase começa (1 a 8) e `--n` é quantas semanas ela dura.
Para trabalhar com mais semanas, mude o `repeat(8, 1fr)` das regras
`.gantt__scale`, `.gantt__track` e `.gantt__miles` no CSS.

---

## 9. Celular

O site é feito para a mão antes da mesa. O que sustenta isso:

### Alvos de toque

Todo link e botão tem **no mínimo 44 px de altura** abaixo de 860 px de
largura. É a medida em que o polegar acerta sem errar. Vários links do site são
texto puro, que nasce com a altura da linha (18 a 26 px), então eles ganham
`min-height` e viram `inline-flex` no bloco móvel do `style.css`.

Nas listas verticais (rodapé) o link ocupa a **largura da coluna**, não a da
palavra: numa lista, o que se acerta é a linha inteira.

### Altura da janela

```css
.hero{ min-height:clamp(520px, 84vh, 760px);
       min-height:clamp(520px, 84svh, 760px); }
```

As duas linhas são de propósito. No celular, `vh` mede a janela **sem** a barra
do navegador, então o hero nasce mais alto que a tela e salta quando a barra
some ao rolar. `svh` mede com a barra visível. A primeira linha é o reserva
para navegador antigo, que ignora a segunda.

Há ainda um bloco para **celular deitado** (`max-height: 560px`), onde o
`min-height` fixo empurraria os botões para fora da tela.

### Área segura

`viewport-fit=cover` no `<meta viewport>`, e a margem lateral vira
`max(clamp(...), env(safe-area-inset-left), env(safe-area-inset-right))`.
Sem isso, o conteúdo passa por baixo do entalhe quando o aparelho está deitado.
O rodapé soma `env(safe-area-inset-bottom)` para não encostar na barra de
gestos.

### Toque

O realce cinza padrão do navegador foi desligado (`-webkit-tap-highlight-color`),
e no lugar entrou um `:active` com opacidade, só onde não existe cursor
(`@media (hover:none)`). Desligar um sem colocar o outro deixa o toque sem
nenhuma resposta visível.

A gaveta do menu tem `overscroll-behavior:contain`, para o dedo não arrastar a
página atrás dela ao chegar no fim da lista.

### Peso

O primeiro carregamento são **127 KB em 4 arquivos**. A capa do vídeo (35 KB)
tem `loading="lazy"`: em conexão lenta ela sai do caminho crítico, que é
justamente quando isso importa. Em conexão rápida o navegador a busca de
qualquer jeito, e tudo bem.

Medido em rede de 1,6 Mbps com o processador 4× mais lento: LCP em 1,1 s.
