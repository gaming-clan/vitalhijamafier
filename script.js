/* ===== Lona Health and Beauty Clinic — Skriptet ===== */
(function () {
  "use strict";

  // --- Konfigurim i shpejtë (ndrysho këtu të dhënat reale) ---
  const CONFIG = {
    phone: "355693576145",          // numri për WhatsApp/telefon, pa "+" për wa.me
    whatsappText: "Përshëndetje! Dua të rezervoj një termin për masazh në Lona Clinic.",
  };

  // Vendos numrin e WhatsApp dhe tekstin paraprak në lidhjet përkatëse
  const waBase = "https://wa.me/" + CONFIG.phone;
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.href = waBase + "?text=" + encodeURIComponent(CONFIG.whatsappText);
  });

  // Shkrim dore i vërtetë me Vara.js — fjala vizatohet me pendë (pa kursor, pa "prerje").
  // Teksti statik (.hw-fallback) rri gjithmonë; animacioni e zëvendëson VETËM kur Vara ia del,
  // kështu që fjala nuk mbetet kurrë bosh (p.sh. nëse fonti s'ngarkohet në file://).
  const hwEl = document.getElementById("hw-word");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hwWords = ["qetësi", "relaksim", "mirëqenie"];

  function heroFontPx() {
    const h1 = hwEl ? hwEl.closest("h1") : null;
    const sz = h1 ? parseFloat(getComputedStyle(h1).fontSize) : 56;
    return Math.max(34, Math.round(sz * 0.9));
  }

  if (hwEl && window.Vara && !reduceMotion) {
    // Fonti si data-URL inline => punon edhe me file:// (pa asnjë kërkesë rrjeti/skedari).
    const fontSrc = window.__SATISFY_FONT_URL || "assets/vara/Satisfy.json";
    let idx = 0;
    let everDrew = false;
    const draw = function () {
      try {
        hwEl.innerHTML = "";
        const v = new Vara("#hw-word", fontSrc, [{
          text: hwWords[idx],
          fontSize: heroFontPx(),
          strokeWidth: 1.7,
          color: "#f4dca0",
          duration: 1700,
          textAlign: "left",
          letterSpacing: -2,
          y: 8
        }], { autoAnimation: true });

        v.ready(function () {
          everDrew = true;
          v.animationEnd(function () {
            window.setTimeout(function () {
              idx = (idx + 1) % hwWords.length;
              draw();
            }, 1900);
          });
        });
      } catch (e) {
        hwEl.textContent = hwWords[idx];
      }
      // Rrjetë sigurie: nëse Vara s'vizaton dot (rast ekstrem), ktheji fjalën statike — kurrë bosh.
      window.setTimeout(function () {
        if (!everDrew && !hwEl.querySelector("svg")) { hwEl.textContent = hwWords[idx]; }
      }, 3500);
    };
    draw();
  } else if (hwEl) {
    hwEl.textContent = "qetësi";
  }

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
      let msg = "Kërkesë e re rezervimi — Lona Health and Beauty Clinic%0A";
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

/* ===== Pricing carousel — next/previous, dots, auto-rotate ===== */
(function () {
  "use strict";
  const root = document.getElementById("price-carousel");
  const track = document.getElementById("price-track");
  const dotsWrap = document.getElementById("price-dots");
  if (!root || !track || !dotsWrap) return;

  const viewport = root.querySelector(".carousel-viewport");
  const prevBtn = root.querySelector(".carousel-prev");
  const nextBtn = root.querySelector(".carousel-next");
  const cards = Array.prototype.slice.call(track.children);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer = null;

  function startAuto() {
    if (reduce || timer) return;
    timer = setInterval(function () { goTo(index + 1); }, 5000);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function resetAuto() { stopAuto(); startAuto(); } // restart the timer after a manual move

  // Build dot indicators
  cards.forEach(function (c, i) {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Shko te paketa " + (i + 1));
    b.addEventListener("click", function () { goTo(i); resetAuto(); });
    dotsWrap.appendChild(b);
  });
  const dots = Array.prototype.slice.call(dotsWrap.children);

  function setActive(i) {
    dots.forEach(function (d, di) { d.setAttribute("aria-current", di === i ? "true" : "false"); });
  }

  function goTo(i) {
    index = (i + cards.length) % cards.length; // loops back to the first after the last
    const card = cards[index];
    const left = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
    viewport.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" });
    setActive(index);
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); resetAuto(); });

  // Keep active dot in sync with manual swipe/scroll
  let st;
  viewport.addEventListener("scroll", function () {
    clearTimeout(st);
    st = setTimeout(function () {
      const center = viewport.scrollLeft + viewport.clientWidth / 2;
      let best = 0, bestD = Infinity;
      cards.forEach(function (c, i) {
        const cc = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bestD) { bestD = d; best = i; }
      });
      index = best;
      setActive(index);
    }, 90);
  }, { passive: true });

  setActive(0);

  // Continuous auto-rotate: pauses on hover/focus, briefly after touch; disabled for reduced motion
  if (!reduce) {
    root.addEventListener("mouseenter", stopAuto);
    root.addEventListener("mouseleave", startAuto);
    root.addEventListener("focusin", stopAuto);
    root.addEventListener("focusout", startAuto);
    root.addEventListener("touchstart", stopAuto, { passive: true });
    root.addEventListener("touchend", function () { setTimeout(startAuto, 2500); }, { passive: true });
    startAuto();
  }
})();

/* ===== Back to top button ===== */
(function () {
  "use strict";
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function toggle() {
    if (window.scrollY > 500) btn.classList.add("visible");
    else btn.classList.remove("visible");
  }
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
})();
