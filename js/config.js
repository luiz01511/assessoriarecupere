// ============================================================
// CONFIGURAÇÕES DA ASSESSORIA RECUPERE
// Edite só este arquivo para atualizar telefone, e-mail, endereço,
// redes sociais, CNPJ e o link da planilha de leads.
// ============================================================

const RECUPERE_CONFIG = {
  // Telefone/WhatsApp para exibição (com máscara) e para o link de contato.
  // Preencha o "whatsappNumber" só com números, no formato DDI+DDD+NÚMERO
  // (ex: 55 11 98888-7777 vira "5511988887777").
  phoneDisplay: "(00) 00000-0000",
  whatsappNumber: "5500000000000",
  whatsappMessage: "Olá! Vim pelo site da Assessoria Recupere e quero uma análise gratuita do meu caso.",

  email: "contato@assessoriarecupere.com.br",

  address: "Atendimento 100% online para todo o Brasil",
  // Se a Recupere tiver endereço físico, troque a linha acima e o link do mapa abaixo.
  mapEmbedSrc: "https://www.google.com/maps?q=Brasil&output=embed",

  cnpj: "[CNPJ]",

  instagramUrl: "https://instagram.com/assessoriarecupere",

  // URL do Google Apps Script (Web App) que grava os leads na planilha.
  // Veja o passo a passo em SETUP.md para gerar essa URL.
  leadsSheetWebhookUrl: "COLE_AQUI_A_URL_DO_APPS_SCRIPT",
};
