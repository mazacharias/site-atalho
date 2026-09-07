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

## 6. O diagrama animado (seção Sistema)

A seção "Como um projeto anda" é um SVG desenhado à mão, animado só com CSS —
não é vídeo, não é GIF, não carrega biblioteca nenhuma. Pesa cerca de 10 KB e
fica nítido em qualquer tela.

São duas versões do mesmo diagrama, dentro do `index.html`: `.fluxo--h`
(horizontal, no desktop) e `.fluxo--v` (vertical, abaixo de 860px). O CSS
mostra uma e esconde a outra.

### Como o tempo funciona

Um ciclo de 20 segundos dividido em 5 etapas de 4 segundos. Cada etapa carrega
`style="--i:0"` até `--i:4`, e todo o resto sai daí:

```css
.et{ animation-delay: calc(var(--i) * 4s); }
```

Fora da sua vez, a etapa continua legível, só que rebaixada — o diagrama nunca
fica pela metade. Para acelerar ou desacelerar, troque os `20s` e os `4s` na
seção 10b do `style.css`, mantendo a proporção de 1 para 5.

### Como mudar os textos

Estão dentro do SVG, como `<text>` comum — procure por "Contato",
"Conversa assíncrona" e assim por diante no `index.html`. Como SVG não quebra
linha sozinho, cada linha da descrição é um `<text>` separado: se o seu texto
for mais longo, acrescente outro `<text>` copiando o `y` do anterior e somando
19.

### Como mudar as etapas

Se o processo do estúdio mudar, o caminho mais curto é reescrever os textos
das cinco etapas existentes. Para mudar a quantidade, é mais trabalho: além do
SVG, é preciso ajustar o `4s` do CSS (ciclo de 20s dividido pelo número de
etapas).

Quem preferir voltar a ter um vídeo de verdade nessa seção: é só trocar o
`<div class="fluxo-wrap">` por um `<video controls poster="...">` apontando
para o arquivo, e apagar a seção 10b do CSS.

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

### O fundo do hero

A malha de pontos do hero é feita só com CSS, em `assets/css/style.css`:

```css
.hero__dots{
  background-size: clamp(20px, 2.1vw, 28px) ...;  /* distância entre os pontos */
  opacity: .08;                                   /* intensidade */
}
```

Aumente a `opacity` para deixar os pontos mais presentes, ou diminua para quase
sumir. O `background-size` controla o espaçamento da malha.

### O cronograma

O diagrama da seção "Processo" é montado com duas variáveis por barra, dentro
do `index.html`:

```html
<span class="gantt__bar" style="--s:1; --n:2">Semanas 1–2</span>
```

`--s` é a semana em que a fase começa (1 a 8) e `--n` é quantas semanas ela dura.
Para trabalhar com mais semanas, mude o `repeat(8, 1fr)` das regras
`.gantt__scale`, `.gantt__track` e `.gantt__miles` no CSS.
