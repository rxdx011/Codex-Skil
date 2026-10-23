# Banner "Raízes do Brasil — Blues"

Guia para gerar (e regerar) o banner escolar de 2,50 m × 2,00 m.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `banner.html` | Banner completo (conteúdo + design). É aqui que se edita texto. |
| `build.mjs` | Gera o PDF e as imagens e confere se algum texto saiu do lugar. |
| `img/` | Fotos e logos (opcionais; sem eles aparece um espaço marcado). |

## Fotos e logos (opcionais)

Coloque em `img/` com **exatamente** estes nomes:

- `logo-escola.png`, `logo-proerer.png`
- `algodao.jpg`, `bessie-smith.jpg`, `celso-blues-boy.jpg`, `festival-rio-das-ostras.jpg`

Use fotos de domínio público (ex.: Wikimedia Commons, Library of Congress) com mais de 3000 px de largura.
Depois troque `[PREENCHER]` pela fonte real, na legenda de cada foto em `banner.html`.

## Gerar

Requer Node.js e Playwright (com Chromium).

```bash
cd banner-blues
node build.mjs
```

> Se o Playwright não estiver instalado globalmente, ajuste o caminho no topo de `build.mjs`
> (`createRequire(...)`) e o `executablePath` do Chromium.

Saídas:

- `banner-250x200cm.pdf` — gráfica (250 × 200 cm, vetorial)
- `banner-alta-qualidade.jpg` — celular (5000 × 4000 px)
- `banner-maxima.png` — qualidade máxima (7500 × 6000 px)
- `banner-celular.jpg` — versão leve (2500 × 2000 px)

O script imprime `INFO ...` e **nenhum aviso** quando está tudo certo. Avisos possíveis:
`ESTOURA`, `FORA DO BLOCO`, `SOBREPOSIÇÃO`, `FONTE PEQUENA`, `TÍTULO < 90pt`, `TEXTO > 48pt`.

## Regras da escola aplicadas

- Horizontal, 2,50 × 2,00 m, fundo bege claro (`#f5ecd9`)
- 3 cores: marrom `#3b2412`, amarelo-ocre `#e0a526`, verde `#2f5d3a`
- Fonte sem serifa: Montserrat, com Arial como alternativa
- Títulos ≥ 90 pt; texto entre 36 e 48 pt no tamanho real (1 px = 0,75 pt; 48 px = 36 pt; 64 px = 48 pt)
- Textos curtos em blocos; fotos com legenda e fonte; espaço para logos no cabeçalho

## Prompt para refazer com o Claude

```text
Crie um banner escolar horizontal de 2,50 m × 2,00 m sobre o BLUES (projeto "Raízes do Brasil:
Identidade, Ancestralidade, Diversidade e Representatividade"), fundo bege claro, no máximo 3 cores
(marrom, amarelo-ocre, verde), fonte sem serifa (Montserrat ou Arial), títulos ≥ 90 pt, texto de 36 a 48 pt
no tamanho real, textos curtos em blocos, imagens com legenda e fonte, espaço para logos da escola e do
ProERER no cabeçalho. Seções: 01 O que é o Blues; 02 Raízes africanas; 03 Resistência e identidade;
04 Representatividade; 05 Linha do tempo; 06 O Blues no Brasil; 07 Estereótipos e apropriação;
08 Por que valorizar (Lei 10.639/2003). Inclua uma ficha (o que é, onde, quando, quem criou), rodapé com os
integrantes, campos de turma e professores e a lista de fontes. Entregue PNG/JPG para celular e PDF em
250 × 200 cm, e confira que nenhum texto saiu do lugar.
```
