// ============================================================
// CONFIGURAÇÕES DA ASSESSORIA RECUPERE
// Edite só este arquivo para atualizar telefone, e-mail, endereço,
// redes sociais, CNPJ e o link da planilha de leads.
// Usado pela página institucional (index.html) e pelas landing pages
// (suspensa-principal.html, bafometro-principal.html).
// ============================================================

window.RECUPERE_CONFIG = {
  // Telefone/WhatsApp para exibição (com máscara) e para o link de contato.
  // Preencha o "whatsappNumber" só com números, no formato DDI+DDD+NÚMERO
  // (ex: 55 11 98888-7777 vira "5511988887777").
  // IMPORTANTE: use um número PRÓPRIO da Recupere, diferente do das outras
  // assessorias do grupo.
  phoneDisplay: "(00) 00000-0000",
  whatsappNumber: "5500000000000",
  whatsappMessage: "Olá! Vim pelo site da Assessoria Recupere e quero uma análise gratuita do meu caso.",

  email: "contato@assessoriarecupere.com.br",

  // Endereço físico — mesmo endereço do grupo (escritório compartilhado
  // com Drive Up, Doutor Regulariza e CNH em Dia).
  address: "Av. Salgado Filho, 1056 - Centro, Guarulhos - SP, 07115-000",
  mapEmbedSrc: "https://www.google.com/maps?q=Av.+Salgado+Filho,+1056+-+Centro,+Guarulhos+-+SP&output=embed",

  cnpj: "[CNPJ]",

  instagramUrl: "https://instagram.com/assessoriarecupere",

  // URL do Google Apps Script (Web App) que grava os leads na planilha.
  // IMPORTANTE: crie uma planilha e um Apps Script PRÓPRIOS da Recupere —
  // não reaproveite a URL/credencial Google de nenhuma outra assessoria.
  //
  // Duas URLs separadas de propósito, pra poder ligar uma sem mexer na outra:
  //
  // - landingPagesWebhookUrl: usada pelas 3 landing pages (suspensa, cassada,
  //   bafometro). Cada envio manda só nome, telefone e página (o mesmo
  //   padrão simples usado pelas outras assessorias do grupo).
  // - leadsSheetWebhookUrl: usada pelo formulário da página institucional
  //   (index.html), que ainda vai ser redesenhado — deixe como está
  //   ("COLE_AQUI...") até decidirem o formato final dele.
  //
  // Passo a passo completo em SETUP.md.
  landingPagesWebhookUrl: "https://script.google.com/macros/s/AKfycbzLa3KpO-Dr5VXlAx-QlYZYdKLyBgSwN0gImmg2ynfN5WQpi8U2u3XAQaq4ic79EYO6/exec",
  leadsSheetWebhookUrl: "COLE_AQUI_A_URL_DO_APPS_SCRIPT",

  // ID de conversão do Google Ads (Google Ads → Ferramentas → Conversões).
  // Formato "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX". Opcional: enquanto não
  // houver uma conta de Google Ads própria da Recupere, deixe como está —
  // o site funciona normalmente, só não envia o evento de conversão.
  googleAdsId: "",
  googleAdsConversionLabel: "",
};

// ---- Aplica os dados acima em todo elemento marcado com data-field ----
// Compartilhado entre js/script.js (index.html) e js/landing.js
// (suspensa-principal.html, bafometro-principal.html).
function recupereWhatsappLink(customMessage) {
  const cfg = window.RECUPERE_CONFIG || {};
  const msg = encodeURIComponent(customMessage || cfg.whatsappMessage || "");
  return "https://wa.me/" + (cfg.whatsappNumber || "") + (msg ? "?text=" + msg : "");
}

function applyRecupereConfig() {
  const cfg = window.RECUPERE_CONFIG || {};

  document.querySelectorAll('[data-field="phone"]').forEach((el) => {
    el.textContent = cfg.phoneDisplay || el.textContent;
  });
  document.querySelectorAll('[data-field="phone-tel"]').forEach((el) => {
    el.href = "tel:+" + (cfg.whatsappNumber || "").replace(/\D/g, "");
  });
  document.querySelectorAll('[data-field="email"]').forEach((el) => {
    el.textContent = cfg.email || el.textContent;
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach((el) => {
    if (cfg.email) el.href = "mailto:" + cfg.email;
  });
  document.querySelectorAll('[data-field="address"]').forEach((el) => {
    el.textContent = cfg.address || el.textContent;
  });
  document.querySelectorAll('[data-field="cnpj"]').forEach((el) => {
    el.textContent = cfg.cnpj || el.textContent;
  });
  document.querySelectorAll('[data-field="instagram"]').forEach((el) => {
    el.href = cfg.instagramUrl || el.href;
  });
  document.querySelectorAll('[data-field="whatsapp-link"], [data-field="whatsapp-cta"]').forEach((el) => {
    el.href = recupereWhatsappLink();
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll('[data-field="map-src"]').forEach((el) => {
    if (cfg.mapEmbedSrc) el.src = cfg.mapEmbedSrc;
  });
}
