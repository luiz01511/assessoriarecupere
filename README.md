# Assessoria Recupere

Site institucional e de captação de leads da **Assessoria Recupere**, mais uma
assessoria do grupo, especializada em regularização de CNH (suspensão,
cassação, multa de bafômetro e excesso de pontos).

- **Domínio:** assessoriarecupere.com.br
- **Stack:** HTML + CSS + JS puro (sem build/framework), hospedado na Vercel.
- **Identidade visual:** roxo (`#5B21B6`) + dourado/âmbar (`#F5A524`), sem uso
  de verde na marca (o verde do botão de WhatsApp é intencional, é a cor
  padrão reconhecida do app).

## Estrutura

```
index.html      → todas as seções do site (topo, hero, serviços, FAQ, contato...)
css/style.css   → estilos
js/config.js    → ÚNICO lugar com telefone, e-mail, endereço, CNPJ, redes e
                  o link da planilha de leads — edite aqui
js/script.js    → menu mobile, FAQ, e envio do formulário para a planilha
img/favicon.svg → ícone do site
SETUP.md        → passo a passo manual: dados da empresa, planilha de leads
                  (Google Sheets) e apontamento do domínio
```

## Antes de publicar

Siga o [`SETUP.md`](SETUP.md) — ele tem o passo a passo completo para:
1. Preencher telefone/e-mail/endereço/CNPJ reais em `js/config.js`.
2. Criar a planilha de leads no Google Sheets.
3. Publicar na Vercel e apontar o domínio no Registro.br.

## Rodar localmente

Não precisa de instalação nem servidor — é só abrir `index.html` no navegador,
ou rodar um servidor estático simples, por exemplo:

```bash
npx serve .
```
