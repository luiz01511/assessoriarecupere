# Assessoria Recupere — Guia de configuração

Este site é um site estático simples (HTML/CSS/JS puro), sem build, para ficar
fácil de manter e hospedar na Vercel. Só existem 3 coisas manuais a fazer para
ele ficar 100% funcional e ligado à planilha de leads: (1) preencher os dados
reais da empresa, (2) criar a planilha de leads, (3) publicar e apontar o
domínio.

## 1. Preencher os dados reais da empresa

Abra o arquivo [`js/config.js`](js/config.js) e troque os valores que ainda
estão como exemplo:

- `phoneDisplay` — telefone formatado para exibir no site (ex: `(11) 98888-7777`)
- `whatsappNumber` — mesmo número, só dígitos, com DDI 55 (ex: `5511988887777`).
  **Use um número próprio da Recupere**, diferente do das outras assessorias.
- `email` — e-mail de contato
- `cnpj` — CNPJ da Assessoria Recupere
- `instagramUrl` — link do Instagram

Já preenchido (não precisa mexer, a não ser que mude):
- `address` / `mapEmbedSrc` — endereço do escritório do grupo (Av. Salgado
  Filho, 1056, Guarulhos/SP), o mesmo usado pela Drive Up, Doutor Regulariza
  e CNH em Dia.

Esse arquivo é o único lugar que precisa ser editado para atualizar telefone,
e-mail, endereço e redes sociais em **todas as páginas do site** (institucional
e as duas landing pages).

### Pixel do Google Ads (opcional, pode deixar para depois)

Enquanto a Recupere não tiver conta própria de Google Ads, deixe
`googleAdsId` e `googleAdsConversionLabel` em branco em `js/config.js` — o
site funciona normalmente. Quando tiver uma conta:
1. Em Google Ads → Ferramentas → Conversões, crie uma conversão e copie o ID
   (formato `AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX`).
2. Em `suspensa-principal.html`, `cassada-principal.html` e
   `bafometro-principal.html`, descomente o bloco
   `<!-- Google Ads Pixel ... -->` no `<head>` e troque `AW-XXXXXXXXX` pelo
   ID real.
3. Preencha `googleAdsId` (a parte antes da `/`) e `googleAdsConversionLabel`
   (a parte depois da `/`) em `js/config.js`.

## 2. Criar a planilha de leads (Google Sheets + Apps Script)

Isso conecta o formulário do site a uma planilha Google, no mesmo padrão que
já é usado pela Drive Up e pela Dr. Regulariza. Passo a passo (fazer com a
conta do Google/Gmail do Luiz, já logada nesse computador):

1. Acesse https://sheets.google.com e crie uma planilha nova. Renomeie para
   algo como **"Leads — Assessoria Recupere"**.
2. Na primeira linha (linha 1), crie as colunas (nessa ordem):
   `Data | Nome | Telefone | Email | Como conheceu | Mensagem | Página | Origem`

   > A coluna **Página** identifica de qual página veio o lead: o site
   > institucional envia em branco, e as landing pages enviam "Suspensão de
   > CNH" ou "Multa de Bafômetro".
3. No menu, vá em **Extensões → Apps Script**.
4. Apague todo o conteúdo do editor e cole exatamente este código:

   ```javascript
   function doPost(e) {
     var ss = SpreadsheetApp.getActiveSpreadsheet();
     var sheet = ss.getSheetByName('Página1') || ss.getActiveSheet();
     sheet.appendRow([
       new Date(),
       e.parameter.nome || '',
       e.parameter.telefone || '',
       e.parameter.email || '',
       e.parameter.comoConheceu || '',
       e.parameter.mensagem || '',
       e.parameter.pagina || '',
       e.parameter.origem || ''
     ]);
     return ContentService.createTextOutput('OK');
   }
   ```

   > Se o nome da aba da sua planilha não for "Página1" (por exemplo, se for
   > "Sheet1"), troque o texto entre aspas na linha `getSheetByName(...)`
   > para o nome real da aba.

5. Clique em **Salvar** (ícone de disquete) e dê um nome ao projeto, ex:
   "Recupere Leads".
6. Clique em **Implantar → Nova implantação**.
7. Em "Selecionar tipo", clique na engrenagem e escolha **App da Web**.
8. Configure:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** Qualquer pessoa
9. Clique em **Implantar**. Na primeira vez, o Google vai pedir autorização —
   clique em **Autorizar acesso**, escolha a conta do Luiz, e se aparecer um
   aviso de "app não verificado", clique em **Avançado → Acessar (nome do
   projeto), não seguro** (é normal para scripts pessoais, só você tem acesso
   a esse script).
10. Copie a **URL do app da Web** gerada (termina com `/exec`).
11. Cole essa URL no arquivo `js/config.js`, no campo `leadsSheetWebhookUrl`.

Pronto — todo envio do formulário do site vai aparecer como uma nova linha
nessa planilha, no mesmo formato que a planilha de leads das outras
assessorias do grupo, pronta para ser conectada depois ao sistema de gestão
de clientes.

**Se no futuro trocar o texto do formulário** (adicionar/remover um campo),
lembre de atualizar tanto o `name="..."` do campo (em `index.html`,
`suspensa-principal.html` ou `bafometro-principal.html`) quanto a linha
`sheet.appendRow([...])` no Apps Script, na mesma ordem.

## 3. Publicar o site e apontar o domínio

O site já está pronto para ir para o GitHub (`luiz01511/assessoriarecupere`)
e ser publicado na Vercel. Depois de o projeto estar no ar na Vercel:

1. No painel da Vercel do projeto → **Settings → Domains**, adicione
   `assessoriarecupere.com.br` e `www.assessoriarecupere.com.br`.
2. A Vercel vai mostrar os registros de DNS que faltam. Normalmente é:
   - Um registro **A** no domínio raiz apontando para `76.76.21.21`, ou
   - Um registro **CNAME** em `www` apontando para `cname.vercel-dns.com.`
3. No **Registro.br**, entre em **Painel → seu domínio → DNS** e cadastre
   exatamente os registros que a Vercel indicou (o valor exato pode mudar por
   projeto — sempre use o que aparecer na tela da Vercel, não o exemplo
   acima).
4. Aguarde a propagação (pode levar de alguns minutos a algumas horas). A
   Vercel emite o certificado SSL automaticamente assim que o DNS propaga.

Essa parte do DNS no Registro.br só pode ser feita por quem tem acesso à
conta do Registro.br do domínio — combine com quem comprou o domínio para
fazer esse passo, ou faça você mesmo seguindo os 4 passos acima.
