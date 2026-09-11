(function () {
  "use strict";

  const cfg = window.RECUPERE_CONFIG || {};

  function waLink() {
    const msg = encodeURIComponent(cfg.whatsappMessage || "");
    return "https://wa.me/" + (cfg.whatsappNumber || "") + (msg ? "?text=" + msg : "");
  }

  // ---- Aplica os dados de config.js em todo elemento marcado com data-field ----
  function applyConfig() {
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
      el.href = waLink();
      el.target = "_blank";
      el.rel = "noopener";
    });
    document.querySelectorAll('[data-field="map-src"]').forEach((el) => {
      if (cfg.mapEmbedSrc) el.src = cfg.mapEmbedSrc;
    });
  }

  // ---- Menu mobile ----
  function setupNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("is-open"))
    );
  }

  // ---- Accordion de dúvidas ----
  function setupAccordion() {
    document.querySelectorAll(".accordion__item").forEach((item) => {
      const btn = item.querySelector(".accordion__btn");
      const panel = item.querySelector(".accordion__panel");
      if (!btn || !panel) return;
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".accordion__item.is-open").forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            other.querySelector(".accordion__panel").style.maxHeight = null;
          }
        });
        item.classList.toggle("is-open", !isOpen);
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });
  }

  // ---- Formulário de leads -> Google Sheets (Apps Script) + WhatsApp ----
  function setupLeadForm() {
    const form = document.getElementById("leadForm");
    const status = document.getElementById("formStatus");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const values = Object.fromEntries(data.entries());

      const webhook = cfg.leadsSheetWebhookUrl;
      const configured = webhook && !webhook.startsWith("COLE_AQUI");

      if (configured) {
        status.textContent = "Enviando...";
        status.className = "lead-form__status";
        try {
          await fetch(webhook, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams(values),
          });
        } catch (err) {
          // no-cors não deixa ler erro real de rede; seguimos para o WhatsApp mesmo assim.
        }
      }

      status.textContent = configured
        ? "Recebemos seus dados! Abrindo o WhatsApp..."
        : "Abrindo o WhatsApp para finalizar seu contato...";
      status.className = "lead-form__status is-success";

      const resumo = encodeURIComponent(
        `Olá! Sou ${values.nome || ""}, vim pelo site da Assessoria Recupere.\n` +
        `Telefone: ${values.telefone || ""}\n` +
        `Caso: ${values.mensagem || "quero uma análise gratuita"}`
      );
      window.open(
        "https://wa.me/" + (cfg.whatsappNumber || "") + "?text=" + resumo,
        "_blank"
      );

      form.reset();
    });
  }

  function setupYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    setupNav();
    setupAccordion();
    setupLeadForm();
    setupYear();
  });
})();
