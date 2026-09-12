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

Cada página é uma **pasta com um `index.html` autocontido dentro** (HTML,
CSS e JS todos no mesmo arquivo, sem depender de arquivo externo nenhum) —
para gerar URLs limpas (sem `.html`) no GitHub Pages e seguir o mesmo padrão
usado pela CNH em Dia Soluções:

- **`/`** (`index.html` na raiz) — site institucional (uma página só, com
  âncoras), a página do domínio "cru" (assessoriarecupere.com.br).
- **`/suspensa-principal`**, **`/cassada-principal`** e
  **`/bafometro-principal`** — landing pages de conversão: modal de lead com
  nome + WhatsApp, redirecionamento automático pro WhatsApp após o envio.
  Feitas para campanhas de tráfego pago (Google Ads/Meta Ads) apontando
  direto pra cada penalidade específica.

## Estrutura

```
index.html                       → site institucional, completo (URL: /)
suspensa-principal/index.html    → landing page completa: CNH suspensa (URL: /suspensa-principal)
cassada-principal/index.html     → landing page completa: CNH cassada (URL: /cassada-principal)
bafometro-principal/index.html   → landing page completa: multa de bafômetro (URL: /bafometro-principal)
static/logo.jpg                  → ÚNICO arquivo fora dos index.html — a logo
                                    oficial (cabeçalho, rodapé e favicon das 4 páginas)
CNAME                            → domínio customizado do GitHub Pages
SETUP.md                         → passo a passo manual: dados da empresa,
                                    planilha de leads (Google Sheets) e
                                    apontamento do domínio no GitHub Pages
```

**Não existe mais `css/` nem `js/` como pastas separadas.** Cada página tem
seu próprio `<style>` e `<script>` inline, com uma cópia própria das
configurações (telefone, e-mail, endereço, CNPJ, link da planilha) logo no
topo do `<script>`, comentada como "CONFIGURAÇÕES DESTA PÁGINA — edite aqui".
A pasta `static/` guarda **só imagens** (hoje, só a logo).

**Trade-off importante:** como cada página é independente, atualizar um dado
(por exemplo, o telefone) significa editar as **4 páginas**, uma por uma —
não existe mais um arquivo de configuração único compartilhado. Isso é
proposital, para seguir o mesmo padrão de arquivos da CNH em Dia Soluções.

O endereço já vem preenchido em todas as páginas com o endereço do grupo
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
1. Preencher telefone/e-mail/CNPJ reais em cada uma das 4 páginas (endereço
   já está preenchido).
2. Criar a planilha de leads no Google Sheets (própria da Recupere) — já
   conectada nas 3 landing pages.
3. Ativar o GitHub Pages e apontar o domínio no Registro.br.

## Rodar localmente

Não precisa de instalação nem build — é só abrir `index.html` (ou o
`index.html` dentro de cada pasta de landing page) direto no navegador,
já que cada página é autocontida. Para ver as URLs limpas (tipo
`/suspensa-principal`) funcionando como no ar, rode um servidor estático na
raiz do projeto:

```bash
npx serve .
```
