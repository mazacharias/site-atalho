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
assets/fonts/         Open Sans + Reanimation, hospedadas no próprio site
assets/img/logo.svg           logotipo completo, azul (fundos claros)
assets/img/logo-branco.svg    logotipo completo, off-white (fundos escuros)
assets/img/logo-simbolo*.svg  só a letra "a", nas duas versões
assets/img/favicon.svg        ícone da aba do navegador
assets/img/*.svg              imagens dos projetos (espaços reservados)
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

O logotipo oficial do estúdio já está aplicado. São cinco arquivos dentro de
`assets/img/`, todos em SVG (vetor, nítido em qualquer tela e em qualquer
tamanho de impressão):

| Arquivo | Onde aparece |
|---|---|
| `logo.svg` | cabeçalho sobre fundo claro — azul #182889 |
| `logo-branco.svg` | cabeçalho sobre o hero e rodapé — off-white |
| `logo-simbolo.svg` | só o "a", versão azul — para avatar, carimbo, favicon |
| `logo-simbolo-branco.svg` | só o "a", versão clara |
| `favicon.svg` | o "a" em branco dentro do quadrado azul, para a aba do navegador |

O arquivo original tem proporção de **3 : 1** (489 × 163). O CSS fixa só a
altura — 29px no cabeçalho, 30px no rodapé — e a largura se ajusta sozinha.
Para mudar o tamanho, edite em `assets/css/style.css`:

```css
.brand{ height:29px; }                 /* cabeçalho */
.footer__brand .brand{ height:30px; }  /* rodapé */
```

O símbolo e o favicon foram recortados do próprio logotipo (a letra "a"), então
são exatamente as mesmas curvas — não há redesenho nem aproximação.

Se um dia o logo mudar, basta sobrescrever `logo.svg` e `logo-branco.svg`
mantendo os mesmos nomes: nenhum HTML precisa ser tocado. Só confira a
proporção — se a nova versão for bem mais quadrada, ajuste a altura acima.

### As fontes

Duas famílias, ambas hospedadas no próprio site (nada é buscado no Google):

| Fonte | Arquivo | Onde é usada |
|---|---|---|
| **Open Sans** | `assets/fonts/open-sans-var-latin*.woff2` | todo o site — títulos de seção, textos, menus, formulário |
| **REANIMATION Sans Serif** | `assets/fonts/reanimation.woff2` | só o título do hero |

A Reanimation veio do arquivo `.ttf` que você enviou. Recortei para latim +
acentuação do português e converti para woff2: o arquivo caiu de 124 KB para
**17 KB**, com a acentuação inteira preservada (á à â ã é ê í ó ô õ ú ü ç).

**Para usá-la também nos títulos das seções**, abra `assets/css/style.css` e
acrescente `.h2` à regra do hero (seção 7 do arquivo):

```css
.hero h1,
.h2 {                                /* <- acrescente esta linha */
  font-family: var(--display-font);
  font-weight: 400;
  letter-spacing: 0;
}
```

E acrescente o preload nas páginas de projeto, no `<head>`, junto do que já
existe para a Open Sans:

```html
<link rel="preload" href="assets/fonts/reanimation.woff2" as="font" type="font/woff2" crossorigin>
```

**Não recomendo usá-la em textos corridos.** É uma condensada pesada, feita
para tamanhos grandes; em parágrafo ela cansa a leitura e briga com o tom
sóbrio do resto. O contraste entre ela (display) e a Open Sans (leitura) é o
que faz o hero funcionar.

**Sobre licença:** o arquivo traz copyright da Everglow Std e a permissão de
embutir marcada como *Preview & Print*. Uso como webfont normalmente pede uma
licença específica de web — vale confirmar com a fundição antes de o site ir
ao ar. É uma questão de contrato, não técnica: o site funciona do jeito que
está.

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

## 6. Como adicionar um quarto projeto

1. Duplique `projeto-03.html` e renomeie para `projeto-04.html`.
2. Edite o conteúdo: título, textos, números e imagens.
3. Em `index.html`, dentro de `<div class="projects">`, duplique um bloco
   `<a class="project">…</a>` e aponte para `projeto-04.html`.
4. Acrescente o link no rodapé das quatro páginas e no `sitemap.xml`.

O layout dos projetos usa grade automática: com 4 cartões ele quebra em duas
linhas sozinho, sem precisar mexer no CSS.

---

## 7. Onde mexer no visual

Tudo o que define a aparência está no topo de `assets/css/style.css`, no bloco
`:root`. Trocar uma variável ali muda o site inteiro:

```css
--brand:  #182889;  /* azul de destaque */
--ink:    #0d0e13;  /* preto dos blocos escuros */
--paper:  #f4f4f0;  /* off-white de fundo */
--shell:  1240px;   /* largura máxima do conteúdo */
```

### O grid do hero

O fundo quadriculado do hero é feito só com CSS, em `assets/css/style.css`:

```css
.hero__grid{
  background-size: clamp(56px, 6.2vw, 92px) ...;  /* tamanho do quadrado */
  opacity: .085;                                  /* intensidade da malha */
}
.hero__cols span{ opacity: .07; }                 /* linhas das 12 colunas */
```

Aumente a `opacity` para deixar a grade mais presente, ou diminua para quase
sumir. O `background-size` controla o tamanho de cada quadrado.

### O cronograma

O diagrama da seção "Processo" é montado com duas variáveis por barra, dentro
do `index.html`:

```html
<span class="gantt__bar" style="--s:1; --n:2">Semanas 1–2</span>
```

`--s` é a semana em que a fase começa (1 a 8) e `--n` é quantas semanas ela dura.
Para trabalhar com mais semanas, mude o `repeat(8, 1fr)` das regras
`.gantt__scale`, `.gantt__track` e `.gantt__miles` no CSS.
