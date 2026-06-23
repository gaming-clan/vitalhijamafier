/* ===== Vital Hixhama Fier — Skriptet ===== */
(function () {
  "use strict";

  // --- Konfigurim i shpejtë (ndrysho këtu të dhënat reale) ---
  const CONFIG = {
    phone: "355600000000",          // numri për WhatsApp/telefon, pa "+" për wa.me
    whatsappText: "Përshëndetje! Dua të rezervoj një termin për hixhame.",
  };

  // Vendos numrin e WhatsApp dhe tekstin paraprak në lidhjet përkatëse
  const waBase = "https://wa.me/" + CONFIG.phone;
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.href = waBase + "?text=" + encodeURIComponent(CONFIG.whatsappText);
  });

  // --- Menyja mobile ---
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Viti aktual në footer ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Reveal on scroll ---
  const revealTargets = document.querySelectorAll(
    ".section-head, .card, .benefit, .price-card, .info-card, .col-text, .booking-form"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("visible"); });
  }

  // --- Formulari i rezervimit ---
  const form = document.getElementById("booking-form");
  const note = document.getElementById("form-note");

  if (form) {
    // Mos lejo data në të kaluarën
    const dateInput = document.getElementById("data");
    if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form-note";

      const emri = form.emri.value.trim();
      const telefoni = form.telefoni.value.trim();
      const sherbimi = form.sherbimi.value;

      if (!emri || !telefoni || !sherbimi) {
        note.textContent = "Ju lutemi plotësoni emrin, telefonin dhe shërbimin.";
        note.classList.add("err");
        return;
      }

      const data = form.data.value;
      const mesazhi = form.mesazhi.value.trim();

      // Përpilon mesazhin dhe e dërgon në WhatsApp
      let msg = "Kërkesë e re rezervimi — Vital Hixhama Fier%0A";
      msg += "Emri: " + emri + "%0A";
      msg += "Telefoni: " + telefoni + "%0A";
      msg += "Shërbimi: " + sherbimi + "%0A";
      if (data) msg += "Data e preferuar: " + data + "%0A";
      if (mesazhi) msg += "Mesazh: " + mesazhi;

      window.open(waBase + "?text=" + msg, "_blank");

      note.textContent = "Faleminderit, " + emri + "! Po të kalojmë te WhatsApp për të konfirmuar terminin.";
      note.classList.add("ok");
      form.reset();
    });
  }
})();
