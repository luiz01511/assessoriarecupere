(function () {
  "use strict";

  const cfg = window.RECUPERE_CONFIG || {};
  // applyRecupereConfig() e recupereWhatsappLink() vêm de js/config.js
  // (compartilhadas com as landing pages em js/landing.js).

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
    applyRecupereConfig();
    setupNav();
    setupAccordion();
    setupLeadForm();
    setupYear();
  });
})();
