# Manual do sistema visual

`atalho-sistema-visual.pdf` — 11 páginas A4 paisagem com cor, tipografia, grade,
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
python3 <caminho>/html_to_pdf.py sistema-visual.html atalho-sistema-visual.pdf
```

`medir.js` existe porque a página tem `overflow:hidden`: conteúdo a mais é
cortado em silêncio, sem erro nenhum. Rode sempre antes de converter.

As três capturas de tela (`ap-*.jpg`) alimentam a página "Aplicação"; refaça-as
quando o site mudar de cara.
