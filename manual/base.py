import base64, pathlib
RAIZ = pathlib.Path(__file__).resolve().parent.parent

def b64(p, mime):
    return f"data:{mime};base64," + base64.b64encode((RAIZ/p).read_bytes()).decode()

FONTE_LAT     = b64('assets/fonts/dm-sans-var-latin.woff2', 'font/woff2')
FONTE_LAT_EXT = b64('assets/fonts/dm-sans-var-latin-ext.woff2', 'font/woff2')

CABECA = """<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>picê · Sistema visual</title>
<style>
@font-face{font-family:'DM Sans';font-style:normal;font-weight:300 700;
  src:url(FONTE_LAT_EXT) format('woff2');
  unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;}
@font-face{font-family:'DM Sans';font-style:normal;font-weight:300 700;
  src:url(FONTE_LAT) format('woff2');
  unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;}

:root{
  --paper:#f7f7f5; --paper-2:#fbfbfa; --white:#ffffff;
  --ink:#0e0e0d; --preto:#000000;
  --ink-70:rgba(14,14,13,.70); --ink-50:rgba(14,14,13,.50); --ink-35:rgba(14,14,13,.38);
  --line:rgba(14,14,13,.11); --line-soft:rgba(14,14,13,.06); --tinta-7:rgba(14,14,13,.05);
  --laranja:#ff8a00; --coral:#ff5a3c; --rosa:#ff2d6f; --magenta:#e94ec4;
  --roxo:#9b5df5; --azul:#4d7cff; --ciano:#16b3e0;
  --malha:
    radial-gradient(120% 130% at 8% 4%,   #ffb100 0%, #ff8a00 22%, transparent 62%),
    radial-gradient(110% 120% at 42% 32%, #ff1f4b 0%, #ff2d6f 34%, transparent 70%),
    radial-gradient(95% 110% at 88% 22%,  #ff5ea8 0%, transparent 66%),
    radial-gradient(110% 120% at 92% 96%, #cbb6ff 0%, #efe2ff 46%, transparent 78%),
    radial-gradient(100% 110% at 8% 98%,  #ffe9a8 0%, transparent 68%),
    linear-gradient(140deg, #ff9a00, #ff2255 42%, #ff5fa2 66%, #d9c2ff);
  --r-lg:26px; --r-md:16px; --r-sm:10px; --r-pill:999px;
  --sombra:0 1px 2px rgba(14,14,13,.05), 0 10px 30px -12px rgba(14,14,13,.14);
  --slide-w:1123px; --slide-h:794px;
}
*,*::before,*::after{box-sizing:border-box;}
html,body{margin:0;padding:0;background:#2a2b30;}
body{font-family:'DM Sans',Arial,sans-serif;-webkit-font-smoothing:antialiased;}

/* uma página = uma folha A4 paisagem a 96 dpi */
.pg{
  position:relative; width:1123px; height:794px; overflow:hidden;
  background:var(--paper); color:var(--ink);
  padding:60px 64px 54px; margin:0 auto 26px; display:flex; flex-direction:column;
}
.pg--branca{ background:var(--white); }
.pg--malha{ background-image:var(--malha); color:var(--white); }

.topo{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:34px; }
.micro{ font-size:9.5px; font-weight:600; letter-spacing:.19em; text-transform:uppercase; color:var(--ink-35); }
.pg--malha .micro{ color:rgba(255,255,255,.72); }
.micro b{ color:var(--ink); font-weight:600; }
.pg--malha .micro b{ color:var(--white); }

h1.tit{ margin:0 0 6px; font-weight:300; font-size:44px; line-height:1.06; letter-spacing:-.022em; }
p.sub{ margin:0 0 26px; font-size:14px; line-height:1.6; color:var(--ink-50); max-width:74ch; }
.pg--malha p.sub{ color:rgba(255,255,255,.86); }

.corpo{ flex:1; min-height:0; }
.nota{ font-size:11.5px; line-height:1.62; color:var(--ink-50); }
.pg--malha .nota{ color:rgba(255,255,255,.86); }
.rot{ font-size:9.5px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-35); }
.pg--malha .rot{ color:rgba(255,255,255,.72); }
code{ font-family:'DM Sans',monospace; font-weight:500; font-variant-numeric:tabular-nums; }
</style></head><body><div class="deck">
""".replace('FONTE_LAT_EXT', FONTE_LAT_EXT).replace('FONTE_LAT', FONTE_LAT)

RODAPE = "</div></body></html>\n"

def pagina(n, total, secao, corpo, classe=''):
    return f"""<section class="slide pg {classe}">
  <div class="topo">
    <span class="micro"><b>{n:02d}</b> &nbsp; {secao}</span>
    <span class="micro">picê · Sistema visual</span>
  </div>
  {corpo}
</section>
"""
