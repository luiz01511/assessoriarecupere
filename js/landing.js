// ============================================================
// Comportamento das landing pages (suspensa-principal, bafometro-principal)
// Depende de js/config.js (RECUPERE_CONFIG, applyRecupereConfig).
// Cada página define window.RECUPERE_PAGE = { pagina, mensagemWhatsapp }
// antes de carregar este arquivo.
// ============================================================
(function () {
  "use strict";

  const cfg = window.RECUPERE_CONFIG || {};
  const page = window.RECUPERE_PAGE || {};

  // ---- Reveal ao rolar a página ----
  function setupReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  // ---- Modal de lead ----
  function setupModal() {
    const modal = document.getElementById("leadModal");
    const openBtns = document.querySelectorAll(".js-open-lead");
    const closeBtn = document.getElementById("modalClose");
    if (!modal) return;

    function fecharModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    openBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        const nomeInput = document.getElementById("nome");
        if (nomeInput) setTimeout(() => nomeInput.focus(), 100);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", fecharModal);
    window.addEventListener("click", (e) => {
      if (e.target === modal) fecharModal();
    });

    return fecharModal;
  }

  // ---- Máscara de telefone ----
  function setupPhoneMask() {
    const phoneInput = document.getElementById("telefone");
    if (!phoneInput) return;
    phoneInput.addEventListener("input", (e) => {
      const digits = e.target.value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !digits[2] ? digits[1] : "(" + digits[1] + ") " + digits[2] + (digits[3] ? "-" + digits[3] : "");
    });
  }

  // ---- Envio do formulário -> planilha + WhatsApp + conversão (opcional) ----
  function setupForm(fecharModal) {
    const form = document.getElementById("leadForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const btn = document.getElementById("btnSubmit");
      const nomeInput = document.getElementById("nome");
      const nome = nomeInput ? nomeInput.value : "";

      if (btn) {
        btn.disabled = true;
        btn.innerText = "ENVIANDO...";
      }

      const data = new FormData(form);
      data.append("pagina", page.pagina || "");
      data.append("origem", "assessoriarecupere.com.br");
      const values = Object.fromEntries(data.entries());

      const webhook = cfg.leadsSheetWebhookUrl;
      const configured = webhook && !webhook.startsWith("COLE_AQUI");
      if (configured) {
        try {
          await fetch(webhook, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams(values),
          });
        } catch (err) {
          // no-cors não permite ler erro real de rede; seguimos para o WhatsApp mesmo assim.
        }
      }

      if (window.gtag && cfg.googleAdsId && cfg.googleAdsConversionLabel) {
        window.gtag("event", "conversion", {
          send_to: cfg.googleAdsId + "/" + cfg.googleAdsConversionLabel,
        });
      }

      const mensagem = encodeURIComponent(
        `Olá, me chamo ${nome} e ${page.mensagemWhatsapp || "vim pelo site da Assessoria Recupere."}`
      );
      const link = "https://wa.me/" + (cfg.whatsappNumber || "") + "?text=" + mensagem;

      if (fecharModal) fecharModal();
      if (btn) {
        btn.disabled = false;
        btn.innerText = "INICIAR ATENDIMENTO";
      }
      form.reset();
      window.location.href = link;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyRecupereConfig();
    setupReveal();
    const fecharModal = setupModal();
    setupPhoneMask();
    setupForm(fecharModal);
  });
})();
