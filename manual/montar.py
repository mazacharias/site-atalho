# -*- coding: utf-8 -*-
import sys, base64, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from base import CABECA, RODAPE, pagina
import paginas as p1, paginas2 as p2, paginas3 as p3, paginas4 as p4, paginas5 as p5

M = pathlib.Path(__file__).parent
def jpg(n):
    return "data:image/jpeg;base64," + base64.b64encode((M/n).read_bytes()).decode()

css = "<style>" + "".join([
    p1.CSS_CAPA, p1.CSS_COR, p2.CSS_TIPO, p2.CSS_GRADE,
    p3.CSS_SUP, p3.CSS_COMP, p4.CSS_TEXTURA, p4.CSS_MOV,
    p5.CSS_REGRAS, p5.CSS_APL, p5.CSS_FIM,
]) + "</style>"

paginas = [
    p1.CAPA,
    pagina(1, 9, 'Cor',                  p1.COR),
    pagina(2, 9, 'Tipografia',           p2.TIPO),
    pagina(3, 9, 'Grade e espaçamento',  p2.GRADE),
    pagina(4, 9, 'Superfícies',          p3.SUP),
    pagina(5, 9, 'Componentes',          p3.COMP),
    pagina(6, 9, 'A textura do hero',    p4.TEXTURA),
    pagina(7, 9, 'Movimento',            p4.MOV),
    pagina(8, 9, 'Regras',               p5.REGRAS),
    pagina(9, 9, 'Aplicação',            p5.aplicacao(jpg('ap-hero.jpg'), jpg('ap-serv.jpg'), jpg('ap-proj.jpg'))),
    p5.FIM,
]

html = CABECA + css + "\n".join(paginas) + RODAPE
saida = M / 'sistema-visual.html'
saida.write_text(html, encoding='utf-8')
print(saida, round(len(html)/1024), 'KB ·', len(paginas), 'páginas')
