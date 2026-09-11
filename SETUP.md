# Assessoria Recupere — Guia de configuração

Este site é um site estático simples (HTML/CSS/JS puro), sem build, para ficar
fácil de manter e hospedar no **GitHub Pages**. Só existem 3 coisas manuais a
fazer para ele ficar 100% funcional e ligado à planilha de leads: (1)
preencher os dados reais da empresa, (2) criar a planilha de leads, (3)
ativar o GitHub Pages e apontar o domínio.

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
2. Em `suspensa-principal/index.html`, `cassada-principal/index.html` e
   `bafometro-principal/index.html`, descomente o bloco
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
lembre de atualizar tanto o `name="..."` do campo (em `index.html` ou no
`index.html` dentro de uma das pastas de landing page) quanto a linha
`sheet.appendRow([...])` no Apps Script, na mesma ordem.

## 3. Ativar o GitHub Pages e apontar o domínio

O repositório já está no GitHub (`luiz01511/assessoriarecupere`), com um
arquivo `CNAME` na raiz apontando para `assessoriarecupere.com.br` e cada
landing page numa pasta própria com `index.html` dentro (`/suspensa-principal`,
`/cassada-principal`, `/bafometro-principal`), pra gerar URLs sem `.html` —
isso já é compatível com o GitHub Pages, só falta ligar duas coisas:

### 3.1 Ativar o GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **Deploy from a branch**.
3. Em **Branch**, selecione `main` e a pasta `/ (root)`, depois **Save**.
4. Ainda nessa tela, em **Custom domain**, digite `assessoriarecupere.com.br`
   e clique em **Save** (o GitHub vai usar o `CNAME` que já está no repo, ou
   recriar ele se pedir).
5. Aguarde alguns minutos — o GitHub mostra "Your site is published at..."
   quando terminar de publicar (nesse primeiro momento, ainda no endereço
   `luiz01511.github.io/assessoriarecupere`, antes do domínio próprio
   propagar).

### 3.2 Apontar o domínio no Registro.br

No **Registro.br** → **Painel → seu domínio → DNS**, cadastre os registros
abaixo (são os IPs fixos do GitHub Pages, documentados pela própria GitHub —
não mudam por projeto, ao contrário de outros provedores):

**No domínio raiz (`assessoriarecupere.com.br`), 4 registros tipo A:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**No subdomínio `www`, 1 registro tipo CNAME:**
```
luiz01511.github.io.
```
(repare no ponto final — em alguns painéis de DNS é obrigatório, em outros
não faz diferença)

Depois de cadastrar os registros, volte em **Settings → Pages** no GitHub e
marque **Enforce HTTPS** assim que a opção aparecer disponível (pode levar
de alguns minutos a algumas horas até o DNS propagar e o certificado SSL ser
emitido automaticamente pelo GitHub).

Essa parte do DNS no Registro.br só pode ser feita por quem tem acesso à
conta do Registro.br do domínio — combine com quem comprou o domínio para
fazer esse passo, ou faça você mesmo seguindo os passos acima.
