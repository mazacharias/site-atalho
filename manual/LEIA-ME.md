# Manual do sistema visual

`pice-sistema-visual.pdf` — 11 páginas A4 paisagem com cor, tipografia, grade,
superfícies, componentes, a textura do hero, movimento, regras e aplicação.

**Este diretório não vai para a hospedagem.** O pacote que sobe para o servidor
é montado a partir dos arquivos da raiz (`index.html`, `projeto-0X.html`,
`assets/`, `.htaccess`, `robots.txt`, `sitemap.xml`, `LEIA-ME.md`); o manual
fica de fora de propósito, para não virar download público.

## Como refazer o PDF

O documento é HTML: uma `<section class="slide pg">` por página, com 1123 × 794 px
(A4 paisagem a 96 dpi) e as fontes do site embutidas em base64.

```
python3 montar.py            # gera sistema-visual.html
node medir.js                # avisa se alguma página estourou a altura
python3 <caminho>/html_to_pdf.py sistema-visual.html pice-sistema-visual.pdf
```

`medir.js` existe porque a página tem `overflow:hidden`: conteúdo a mais é
cortado em silêncio, sem erro nenhum. Rode sempre antes de converter.

As três capturas de tela (`ap-*.jpg`) alimentam a página "Aplicação"; refaça-as
quando o site mudar de cara. Elas são prints de viewport, nos tamanhos
1000x625, 900x499 e 900x475; desligue o `scroll-behavior:smooth` antes de
rolar, senão o print sai no meio do caminho.

## Como refazer o vídeo

`filme.html` é o fonte do filme de 20 segundos da dobra "Sistema": um SVG com
uma função `render(t)` determinística, sem dependência nenhuma. Ele carrega a
fonte de `assets/fonts/`, então precisa de um servidor, não de `file://`.

```
python3 -m http.server 8899 &     # a partir da raiz do site
mkdir -p quadros
node manual/render-filme.js       # 600 quadros PNG, 30 q/s

ffmpeg -framerate 30 -i quadros/f%04d.png -vf scale=1280:720:flags=lanczos \
  -c:v libx264 -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart \
  assets/video/sistema.mp4
ffmpeg -framerate 30 -i quadros/f%04d.png -vf scale=1280:720:flags=lanczos \
  -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 assets/video/sistema.webm
ffmpeg -i quadros/f0455.png -q:v 5 assets/img/sistema-poster.jpg
```

As cores do filme estão em duas linhas, no topo do `<script>`: `FUNDO`,
`TINTA` e `CINZA`, e depois `LARANJA`, `CORAL`, `ROSA`, `ROXO` e `AZUL`. A
malha dos blocos fica nos `<defs>` do SVG, igual à das capas.
