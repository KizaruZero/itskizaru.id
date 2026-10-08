/* ============ ITS Kizaru — interactions ============ */
(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");

  function currentTheme() {
    var stored = null;
    try { stored = localStorage.getItem("itskizaru-theme"); } catch (e) {}
    if (stored === "light" || stored === "dark") return stored;
    if (root.getAttribute("data-theme") === "light" || root.getAttribute("data-theme") === "dark") {
      return root.getAttribute("data-theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("itskizaru-theme", theme); } catch (e) {}
  }

  // Apply stored / system theme on load (attribute starts as "auto")
  if (root.getAttribute("data-theme") === "auto") {
    applyTheme(currentTheme());
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Hero headline: word-by-word entrance ---------- */
  var heroTitle = document.getElementById("heroTitle");
  if (heroTitle) {
    var words = heroTitle.textContent.trim().split(/\s+/);
    heroTitle.setAttribute("aria-label", words.join(" "));
    heroTitle.textContent = "";
    words.forEach(function (w, i) {
      var span = document.createElement("span");
      span.className = "word";
      span.textContent = w;
      span.style.animationDelay = (0.15 + i * 0.13) + "s";
      span.setAttribute("aria-hidden", "true");
      heroTitle.appendChild(span);
      heroTitle.appendChild(document.createTextNode(" "));
    });
  }

  /* ---------- Scroll-triggered reveals ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Magnetic buttons (fine pointers only) ---------- */
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      var strength = 22;
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform =
          "translate(" + (x / r.width * strength).toFixed(1) + "px," +
          (y / r.height * strength).toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "translate(0px, 0px)";
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = ["services", "stack", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window && sections.length) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("active", active);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { navIo.observe(s); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
