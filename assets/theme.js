// Shuffle Mode theme — vanilla interactions, no dependencies.
(function () {
  "use strict";

  /* ---- Mobile menu ---- */
  document.querySelectorAll("[data-menu-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var menu = document.querySelector("[data-menu]");
      if (!menu) return;
      var willOpen = menu.hasAttribute("hidden");
      menu.toggleAttribute("hidden");
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });

  /* ---- Drop countdown ---- */
  document.querySelectorAll("[data-countdown]").forEach(function (el) {
    var iso = el.getAttribute("data-countdown").replace(" ", "T");
    var target = new Date(iso).getTime();
    if (isNaN(target)) return;
    var d = el.querySelector("[data-d]"),
      h = el.querySelector("[data-h]"),
      m = el.querySelector("[data-m]"),
      s = el.querySelector("[data-s]");
    var pad = function (n) { return String(n).padStart(2, "0"); };
    function tick() {
      var ms = Math.max(0, target - Date.now());
      if (d) d.textContent = pad(Math.floor(ms / 86400000));
      if (h) h.textContent = pad(Math.floor((ms / 3600000) % 24));
      if (m) m.textContent = pad(Math.floor((ms / 60000) % 60));
      if (s) s.textContent = pad(Math.floor((ms / 1000) % 60));
    }
    tick();
    setInterval(tick, 1000);
  });

  /* ---- Shuffle my mood (panel toggling) ---- */
  var shuffle = document.querySelector("[data-shuffle]");
  if (shuffle) {
    var chips = Array.prototype.slice.call(shuffle.querySelectorAll("[data-mood]"));
    var panels = Array.prototype.slice.call(shuffle.querySelectorAll("[data-shuffle-panel]"));
    var current = 0, spinning = false;

    function show(i) {
      current = i;
      chips.forEach(function (c, idx) { c.setAttribute("aria-pressed", String(idx === i)); });
      panels.forEach(function (p, idx) { p.classList.toggle("is-active", idx === i); });
    }
    chips.forEach(function (c, idx) { c.addEventListener("click", function () { show(idx); }); });

    var btn = shuffle.querySelector("[data-shuffle-btn]");
    var icon = shuffle.querySelector("[data-shuffle-icon]");
    if (btn && panels.length) {
      btn.addEventListener("click", function () {
        if (spinning) return;
        spinning = true;
        if (icon) icon.classList.add("is-spinning");
        var ticks = 0;
        var id = setInterval(function () {
          show((current + 1) % panels.length);
          if (++ticks > 6) {
            clearInterval(id);
            spinning = false;
            if (icon) icon.classList.remove("is-spinning");
          }
        }, 110);
      });
    }
  }

  /* ---- Product gallery ---- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    var main = gallery.querySelector("[data-main]");
    gallery.querySelectorAll("[data-thumb]").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        if (!main) return;
        main.src = thumb.getAttribute("data-full");
        gallery.querySelectorAll("[data-thumb]").forEach(function (t) { t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });
  });

  /* ---- Product variants (option pills) ---- */
  document.querySelectorAll("[data-product]").forEach(function (root) {
    var dataEl = root.querySelector("[data-variants]");
    if (!dataEl) return;
    var variants;
    try { variants = JSON.parse(dataEl.textContent); } catch (e) { return; }

    var idInput = root.querySelector("[data-variant-id]");
    var priceEl = root.querySelector("[data-price]");
    var addBtn = root.querySelector("[data-add]");
    var addText = root.querySelector("[data-add-text]");
    var unavailable = root.querySelector("[data-unavailable]");
    var mainImg = root.querySelector("[data-main]");
    var groups = Array.prototype.slice.call(root.querySelectorAll(".option__values"));
    if (!groups.length) return;

    function selected() {
      return groups.map(function (g) {
        var active = g.querySelector(".pill.is-active");
        return active ? active.getAttribute("data-value") : null;
      });
    }

    function update() {
      var sel = selected();
      var match = variants.find(function (v) {
        return v.options.length === sel.length && v.options.every(function (o, i) { return o === sel[i]; });
      });

      if (!match) {
        if (unavailable) unavailable.hidden = false;
        if (addBtn) addBtn.disabled = true;
        if (addText) addText.textContent = "Unavailable";
        return;
      }
      if (unavailable) unavailable.hidden = true;
      if (idInput) idInput.value = match.id;
      if (priceEl) priceEl.textContent = match.price;
      if (mainImg && match.image) mainImg.src = match.image;
      if (addBtn) addBtn.disabled = !match.available;
      if (addText) addText.textContent = match.available ? "Add to bag" : "Sold out";
    }

    root.querySelectorAll("[data-option-value]").forEach(function (pill) {
      pill.addEventListener("click", function () {
        var group = pill.closest(".option__values");
        group.querySelectorAll(".pill").forEach(function (p) { p.classList.remove("is-active"); });
        pill.classList.add("is-active");
        update();
      });
    });

    update();
  });
})();
