# Assessoria Recupere

Site institucional e de captação de leads da **Assessoria Recupere**, mais uma
assessoria do grupo, especializada em regularização de CNH (suspensão,
cassação, multa de bafômetro e excesso de pontos).

- **Domínio:** assessoriarecupere.com.br
- **Stack:** HTML + CSS + JS puro (sem build/framework), hospedado no
  **GitHub Pages** (repositório `luiz01511/assessoriarecupere`).
- **Identidade visual:** preto (`#141210`) + dourado (`#D4AF37`), baseada na
  logo oficial da Recupere (fundo preto, anel dourado, símbolo da balança da
  justiça). Sem uso de verde na marca (o verde do botão de WhatsApp é
  intencional, é a cor padrão reconhecida do app — usamos o logo oficial do
  WhatsApp).

## Páginas

Cada página é uma pasta com um `index.html` dentro, para gerar URLs limpas
(sem `.html`) no GitHub Pages — o mesmo padrão de URL usado pela CNH em Dia
Soluções:

- **`/`** (`index.html` na raiz) — site institucional (uma página só, com
  âncoras), a página do domínio "cru" (assessoriarecupere.com.br).
- **`/suspensa-principal`**, **`/cassada-principal`** e
  **`/bafometro-principal`** — landing pages de conversão: modal de lead com
  nome + WhatsApp, redirecionamento automático pro WhatsApp após o envio.
  Feitas para campanhas de tráfego pago (Google Ads/Meta Ads) apontando
  direto pra cada penalidade específica.

## Estrutura

```
index.html                       → site institucional (URL: /)
suspensa-principal/index.html    → landing page: CNH suspensa (URL: /suspensa-principal)
cassada-principal/index.html     → landing page: CNH cassada (URL: /cassada-principal)
bafometro-principal/index.html   → landing page: multa de bafômetro (URL: /bafometro-principal)
css/style.css                    → estilos do site institucional
css/landing.css                  → estilos compartilhados das 3 landing pages
js/config.js                     → ÚNICO lugar com telefone, e-mail, endereço,
                                    CNPJ, redes e o link da planilha de leads
                                    — edite aqui (usado pelas 4 páginas)
js/script.js                     → menu mobile, FAQ e formulário do site institucional
js/landing.js                    → modal, máscara de telefone e envio de lead
                                    das landing pages
img/logo.jpg                     → logo oficial (cabeçalho, rodapé e favicon)
CNAME                            → domínio customizado do GitHub Pages
SETUP.md                         → passo a passo manual: dados da empresa,
                                    planilha de leads (Google Sheets) e
                                    apontamento do domínio no GitHub Pages
```

Todo link entre páginas e todo `<link>`/`<script>`/`<img>` usa caminho
absoluto a partir da raiz (ex: `/css/style.css`, `/img/logo.jpg`) — assim
funciona igual em qualquer pasta, sem se preocupar com `../` ao criar novas
páginas.

O endereço já vem preenchido em `js/config.js` com o endereço do grupo
(Av. Salgado Filho, 1056 — Centro, Guarulhos/SP, mesmo escritório da Drive Up,
Doutor Regulariza e CNH em Dia). **Telefone/WhatsApp, e-mail e CNPJ da
Recupere ainda são placeholders** — veja o `SETUP.md`.

## Sobre o depoimento e os números de "avaliação"

As landing pages de referência (CNH em Dia) usam um depoimento fabricado com
nome de cliente fictício e um "Nota 5.0 no Google | +1.000 clientes
atendidos" — números que a Recupere, sendo uma empresa nova, ainda não tem
como comprovar. Nas páginas da Recupere, substituí esses dois pontos por:
um card de "compromisso" assinado pela própria equipe (sem fingir ser um
cliente real) e uma frase de posicionamento sem número inventado. Quando a
Recupere tiver os primeiros clientes e avaliações reais, dá pra trocar por
depoimentos e números verdadeiros.

## Antes de publicar

Siga o [`SETUP.md`](SETUP.md) — ele tem o passo a passo completo para:
1. Preencher telefone/e-mail/CNPJ reais em `js/config.js` (endereço já está
   preenchido).
2. Criar a planilha de leads no Google Sheets (própria da Recupere).
3. Ativar o GitHub Pages e apontar o domínio no Registro.br.

## Rodar localmente

Não precisa de instalação nem servidor — é só abrir `index.html` (ou o
`index.html` dentro de cada pasta de landing page) no navegador. Só que, como
os caminhos são absolutos (`/css/...`), pra ver o site se comportando de
verdade (inclusive as URLs limpas tipo `/suspensa-principal`) é melhor rodar
um servidor estático na raiz do projeto:

```bash
npx serve .
```
