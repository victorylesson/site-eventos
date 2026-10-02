/* ============================================================
   MANNY DECK BAR — Protótipo v1
   Interações em JavaScript puro (sem dependências)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Header: some ao rolar a página ---------- */
  var header = document.getElementById("header");
  var HIDE_AFTER = 80;            // px rolados até a barra sumir
  var SHOW_ON_SCROLL_UP = false;  // true = a barra volta quando a pessoa rola para cima
  var lastY = window.scrollY;

  function onScrollHeader() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);

    if (!header.classList.contains("menu-open")) {
      var hide = y > HIDE_AFTER;
      if (hide && SHOW_ON_SCROLL_UP && y < lastY) hide = false;
      header.classList.toggle("is-hidden", hide);
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  // Quem navega pelo teclado sempre vê a barra
  header.addEventListener("focusin", function () {
    header.classList.remove("is-hidden");
  });

  /* ---------- Menu mobile (hambúrguer + X) ---------- */
  var toggle = document.getElementById("menuToggle");
  var closeBtn = document.getElementById("navClose");
  var nav = document.getElementById("nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      header.classList.remove("is-hidden");
      closeBtn.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });

  // Botão X fecha o menu e volta para a página
  closeBtn.addEventListener("click", function () {
    setMenu(false);
    toggle.focus({ preventScroll: true });
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  // Fecha ao tocar no fundo do menu (fora dos links)
  nav.addEventListener("click", function (e) {
    if (e.target === nav) setMenu(false);
  });

  // Fecha com a tecla Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus({ preventScroll: true });
    }
  });

  // Se a tela crescer (ex.: girar o celular), garante o menu fechado
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1100 && nav.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- Scroll suave com compensação do header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = anchor.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    // Pequeno stagger entre irmãos
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--reveal-delay", (i % 4) * 0.08 + "s");
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Parallax sutil no hero ---------- */
  var parallaxBg = document.querySelector("[data-parallax]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (parallaxBg && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < window.innerHeight * 1.2) {
            parallaxBg.style.transform = "translateY(" + y * 0.28 + "px)";
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Abas do cardápio ---------- */
  var tabs = document.querySelectorAll(".menu__tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      document.querySelectorAll(".menu__items").forEach(function (panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
      });
      var panel = document.getElementById("tab-" + tab.dataset.tab);
      if (panel) {
        panel.hidden = false;
        panel.classList.add("is-active");
      }
    });
  });

  /* ---------- Link ativo na navegação ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav__link");
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.classList.toggle(
                "is-active",
                l.getAttribute("href") === "#" + entry.target.id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- WhatsApp: número único para todos os links ---------- */
  var WHATSAPP_NUMBER = "558197550378"; // WhatsApp do Manny Deck Bar
  function waLink(text) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }
  document.querySelectorAll("[data-wa]").forEach(function (link) {
    link.href = waLink(link.getAttribute("data-wa"));
  });

  /* ---------- Formulário de orçamento -> WhatsApp ---------- */
  var quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    var fields = quoteForm.elements;
    var today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    fields["data"].min = today.toISOString().slice(0, 10);

    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!quoteForm.reportValidity()) return;
      var lines = [
        "Olá! Gostaria de solicitar um orçamento para um evento no Manny Deck.",
        "",
        "Nome: " + fields["nome"].value.trim(),
        "Tipo de evento: " + fields["tipo"].value
      ];
      if (fields["data"].value) lines.push("Data: " + fields["data"].value.split("-").reverse().join("/"));
      if (fields["pessoas"].value) lines.push("Pessoas: " + fields["pessoas"].value);
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- Ano dinâmico no footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();