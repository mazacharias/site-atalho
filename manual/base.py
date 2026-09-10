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
  --preto:#0a0908; --ink:#131211; --ink-2:#1c1a18; --ink-3:#272421;
  --fumaca:#b6b2ac; --areia:#dcd7cf;
  --verde:#aecd96; --verde-tinta:#3f5a2e;
  --ink-70:rgba(19,18,17,.70); --ink-50:rgba(19,18,17,.50); --ink-35:rgba(19,18,17,.35);
  --line:rgba(19,18,17,.15); --line-soft:rgba(19,18,17,.08); --tinta-7:rgba(19,18,17,.07);
  --paper:#e4e0d9; --paper-2:#f1eee9;
  --on-dark:#e9e5df; --on-dark-70:rgba(233,229,223,.68); --on-dark-45:rgba(233,229,223,.45);
  --on-dark-line:rgba(233,229,223,.14); --line-dark:rgba(182,178,172,.38);
  --slide-w:1123px; --slide-h:794px;
}
*,*::before,*::after{box-sizing:border-box;}
html,body{margin:0;padding:0;background:#22242c;}
body{font-family:'DM Sans',Arial,sans-serif;-webkit-font-smoothing:antialiased;}

/* uma página = uma folha A4 paisagem a 96 dpi */
.pg{
  position:relative; width:1123px; height:794px; overflow:hidden;
  background:var(--paper); color:var(--ink);
  padding:60px 64px 54px; margin:0 auto 26px; display:flex; flex-direction:column;
}
.pg--escura{ background:var(--ink); color:var(--on-dark); }
.pg--fumaca{ background:var(--fumaca); color:var(--ink); }

.topo{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:34px; }
.micro{ font-size:9.5px; font-weight:600; letter-spacing:.19em; text-transform:uppercase; color:var(--ink-35); }
.pg--escura .micro{ color:var(--on-dark-45); }
.pg--fumaca .micro{ color:rgba(19,18,17,.45); }
.micro b{ color:var(--ink); font-weight:600; }
.pg--escura .micro b{ color:var(--verde); }

h1.tit{ margin:0 0 6px; font-weight:300; font-size:44px; line-height:1.06; letter-spacing:-.022em; }
p.sub{ margin:0 0 26px; font-size:14px; line-height:1.6; color:var(--ink-50); max-width:74ch; }
.pg--escura p.sub{ color:var(--on-dark-70); }

.corpo{ flex:1; min-height:0; }
.nota{ font-size:11.5px; line-height:1.62; color:var(--ink-50); }
.pg--escura .nota{ color:var(--on-dark-70); }
.rot{ font-size:9.5px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:var(--ink-35); }
.pg--escura .rot{ color:var(--on-dark-45); }
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
