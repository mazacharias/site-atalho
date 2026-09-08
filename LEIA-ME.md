# Atalho Studio — site

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
assets/css/fonts.css  declaração da Open Sans
assets/js/main.js     menu, acordeão, animações e formulário
assets/fonts/         Open Sans hospedada no próprio site
assets/video/sistema.mp4   vídeo da seção Sistema (H.264, 108 KB)
assets/video/sistema.webm  o mesmo vídeo em WebM, para quem suporta
assets/img/sistema-poster.jpg  quadro que aparece antes do play
assets/img/favicon.svg  ícone da aba do navegador
assets/img/logo*.svg    a marca que você enviou, guardada mas fora de uso
assets/img/*.svg        imagens dos projetos (espaços reservados)
```

---

## 3. O que trocar antes de publicar

Tudo abaixo é texto simples dentro dos arquivos `.html` — pode editar em
qualquer editor (VS Code, Bloco de Notas, ou o próprio editor da Hostinger).

**Dados de contato** — em `index.html`, procure por `contato@atalhostudio.com.br`:

- e-mail (aparece 2 vezes: na lista de contato e no atributo `data-to` do formulário);
- WhatsApp: troque `5511999999999` pelo seu número com DDI e DDD;
- Instagram: troque `atalho.studio`.

**Números do estúdio** — a seção "Estúdio" tem `40+` e `6–8`, e a faixa
inferior do hero repete essas informações. Ajuste para a sua realidade.

**Domínio** — em `robots.txt` e `sitemap.xml`, troque
`https://www.atalhostudio.com.br` pelo seu endereço real.

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

A marca no cabeçalho e no rodapé é **a palavra "atalho" escrita em Open Sans**,
como texto — não é imagem. Isso deixa tudo nítido em qualquer tela, sem
download nenhum, e a cor acompanha automaticamente o fundo (clara sobre o hero,
azul sobre fundo claro).

Para mudar tamanho ou peso, edite `assets/css/style.css`:

```css
.brand{
  font-size: 21px;          /* tamanho */
  font-weight: 600;         /* 300, 400, 600 ou 700 */
  letter-spacing: -.035em;  /* mais negativo = letras mais juntas */
}
```

O arquivo de marca que você enviou continua guardado em
`assets/img/logo.svg` e `assets/img/logo-branco.svg`. Se quiser voltar a usá-lo,
troque no HTML das 4 páginas o texto por uma imagem:

```html
<!-- de -->
<a class="brand" href="./">atalho</a>
<!-- para -->
<a class="brand" href="./" aria-label="Atalho Studio — início">
  <img src="assets/img/logo.svg" alt="Atalho Studio" style="height:29px;width:auto">
</a>
```

(No hero e no rodapé, use `logo-branco.svg`.)

O favicon é a letra "a" da Open Sans em branco sobre o quadrado azul, em
`assets/img/favicon.svg`.

### A fonte

O site inteiro usa **Open Sans**, hospedada no próprio servidor
(`assets/fonts/`) — nada é buscado no Google. É um único arquivo variável, com
os pesos de 300 a 700 e a acentuação do português inteira, em 88 KB.

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
cronograma e entregas.

O player não baixa nada até alguém clicar em "Assistir": antes disso existe só
a imagem de capa (19 KB). O vídeo vai em dois formatos e o navegador escolhe —
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
--brand:  #182889;  /* azul de destaque */
--ink:    #0d0e13;  /* preto dos blocos escuros */
--paper:  #f4f4f0;  /* off-white de fundo */
--shell:  1240px;   /* largura máxima do conteúdo */
```

### A barra de navegação

A barra é um elemento separado do hero: fica no fluxo da página, acima dele, na
mesma cor das dobras claras (`--paper`), com um filete embaixo para se ler como
elemento próprio mesmo quando o fundo abaixo tem a mesma cor. Ao rolar ela gruda
no topo, encolhe um pouco e ganha uma sombra rasa.

Os links são escuros, sem esmaecer, e o retorno ao passar o mouse é um
sublinhado. O botão "Iniciar projeto" fica azul dentro da barra, para ter
contraste. O menu mobile usa a mesma superfície.

Para mudar a cor da barra, edite `.header` em `assets/css/style.css`:

```css
.header{ background:var(--paper); color:var(--ink); }
```

### O hero

Painel escuro dividido em dois: texto à esquerda, uma nuvem de pixels à direita.
Não é imagem nem vídeo — é gerada em `<canvas>` a cada quadro, na seção 7 do
`assets/js/main.js`.

São sempre **os mesmos pontos**, que se remodelam em quatro formas, em ciclo:

| | forma | o que é |
|---|---|---|
| 1 | estrela | a marca: silhueta de quatro pontas em halftone |
| 2 | esfera | malha de pixels sobre a superfície |
| 3 | montanha | um pico contra o céu, com a linha do horizonte no quadro |
| 4 | onda | um lençol ondulado, em fuga, que anda com o tempo |

Cada ponto tem um índice numa malha `(u, v)`, e cada forma é uma função
`(u, v) → posição no espaço + tamanho + brilho do ponto`. A transição é só
interpolar as duas formas vizinhas — com um atraso diferente por ponto, para o
enxame não chegar todo junto. A câmera também interpola: cada forma guarda a
sua própria inclinação e o seu próprio zoom, então o enquadramento acompanha a
mudança.

Para mudar o ritmo, ajuste no topo da seção 7:

```js
var PARADO = 3.2, TRANS = 2.1;   // segundos parado em cada forma / de transição
```

Com quatro formas, o ciclo inteiro dá 21 segundos.

#### Por que os lençóis são gerados a partir da tela

Montanha e onda são um chão visto em perspectiva. Se esse chão fosse um
retângulo no mundo, a borda dele entraria no enquadramento e abriria **uma
fenda preta atravessando a arte** — foi o que aconteceu na primeira versão.

A malha então não é feita no mundo, e sim na tela: para cada célula de uma
grade que cobre o quadro (com folga), um raio é lançado e o ponto nasce onde
esse raio encontra o plano do chão. Assim o lençol cobre o enquadramento por
construção, e de quebra o espaçamento entre os pixels fica igual em toda a
tela.

A folga precisa ser generosa, principalmente embaixo: o relevo desloca o ponto
na vertical, e perto da câmera esse deslocamento passa de 200 px.

```js
var FOLGA = 1.30;                            // nas laterais
var SOBRA_CIMA = 0.14, SOBRA_BAIXO = 0.34;   // em alturas de quadro
```

Como a malha é regular na tela, os pontos não se acumulam na silhueta e a
crista da montanha não acende sozinha. Quem acende é a **inclinação do
terreno**, medida por diferença finita e guardada no brilho do ponto.

#### Os pixels

Cada ponto é um quadrado de lado inteiro, encaixado na grade de pixels da tela.
O brilho é quantizado em seis níveis, do azul do hero até quase branco, e os
pontos são desenhados em lote — **um `fillStyle` por nível**, e não um por
ponto. A escadinha entre os níveis é quebrada por dithering com a matriz
Bayer 8×8, a mesma das versões anteriores do hero.

O desenho usa soma de luz (`globalCompositeOperation = 'lighter'`): onde os
pixels se acumulam a luz soma e estoura em branco. De quebra, dispensa ordenar
os pontos por profundidade. No meio da transição essa soma vira um clarão, e é
por isso que existe o `fatorLuz`, que derruba o brilho justamente ali.

A nuvem sangra até as bordas do hero — para cima, para baixo e para a direita
até a beirada da tela — por margens negativas em `.painel__arte`, casadas com o
respiro do hero via as variáveis `--pt` e `--pb`. Se mudar o respiro, as margens
acompanham sozinhas.

O desenho roda a 30 quadros por segundo e para sozinho quando o hero sai da
tela. Com `prefers-reduced-motion` ligado, desenha só a estrela, parada.

Para trocar a cor, mude a linha `var COR = [159, 176, 238];` — são os valores
R, G e B do azul-claro do hero.

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
