// Shuffle Mode theme — vanilla interactions, no dependencies.
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function money(cents, currency) {
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency: currency || "USD" }).format(cents / 100); }
    catch (e) { return "$" + (cents / 100).toFixed(2); }
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ============ Cart module (drawer + AJAX) ============ */
  var Cart = (function () {
    var drawer = $("[data-cart-drawer]");
    if (!drawer) return { add: function () {}, open: function () {}, refresh: function () {} };

    var panel = $(".cart-drawer__panel", drawer);
    var currency = panel.getAttribute("data-currency") || "USD";
    var freeEnabled = panel.getAttribute("data-free-enabled") === "true";
    var threshold = parseInt(panel.getAttribute("data-free-threshold"), 10) || 0;

    function open() { drawer.hidden = false; document.body.style.overflow = "hidden"; requestAnimationFrame(function () { drawer.classList.add("is-open"); }); }
    function close() { drawer.classList.remove("is-open"); document.body.style.overflow = ""; setTimeout(function () { drawer.hidden = true; }, 300); }

    $$("[data-cart-close]", drawer).forEach(function (b) { b.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !drawer.hidden) close(); });

    function render(cart) {
      var itemsEl = $("[data-cart-items]", drawer), empty = $("[data-cart-empty]", drawer), foot = $("[data-cart-foot]", drawer);
      $$("[data-cart-count]").forEach(function (c) { c.textContent = cart.item_count; c.hidden = cart.item_count === 0; });

      if (cart.item_count === 0) { itemsEl.innerHTML = ""; empty.hidden = false; foot.hidden = true; }
      else {
        empty.hidden = true; foot.hidden = false;
        itemsEl.innerHTML = cart.items.map(function (item, i) {
          var variant = item.variant_title && item.variant_title.indexOf("Default") === -1 ? '<div class="card__cat">' + esc(item.variant_title) + "</div>" : "";
          var img = item.image ? '<img src="' + item.image.replace(/(\.[a-z]+)(\?|$)/i, "_160x$1$2") + '" alt="">' : "";
          return '<div class="cart-item" data-line="' + (i + 1) + '">' +
            '<a class="cart-item__media" href="' + item.url + '">' + img + "</a>" +
            '<div class="cart-item__body"><a class="cart-item__name" href="' + item.url + '">' + esc(item.product_title) + "</a>" + variant +
            '<div class="cart-item__row"><div class="qty qty--sm">' +
            '<button type="button" class="qty__btn" data-line-minus aria-label="Decrease">−</button>' +
            '<span class="qty__val">' + item.quantity + "</span>" +
            '<button type="button" class="qty__btn" data-line-plus aria-label="Increase">+</button></div>' +
            '<button type="button" class="cart-item__remove" data-line-remove>Remove</button></div></div>' +
            '<div class="cart-item__price">' + money(item.final_line_price, currency) + "</div></div>";
        }).join("");
      }
      var sub = $("[data-cart-subtotal]", drawer); if (sub) sub.textContent = money(cart.total_price, currency);

      var fs = $("[data-freeship]", drawer);
      if (fs && freeEnabled && threshold > 0) {
        fs.hidden = cart.item_count === 0;
        var txt = $("[data-freeship-text]", fs), fill = $("[data-freeship-fill]", fs);
        if (cart.total_price >= threshold) { if (txt) txt.innerHTML = "✦ You&rsquo;ve unlocked free shipping."; if (fill) fill.style.width = "100%"; }
        else { if (txt) txt.textContent = "You're " + money(threshold - cart.total_price, currency) + " away from free shipping."; if (fill) fill.style.width = Math.min(100, (cart.total_price / threshold) * 100) + "%"; }
      }
      bindLines();
    }

    function refresh() { return fetch("/cart.js", { headers: { Accept: "application/json" } }).then(function (r) { return r.json(); }).then(render); }
    function change(line, quantity) {
      return fetch("/cart/change.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ line: line, quantity: quantity }) })
        .then(function (r) { return r.json(); }).then(render);
    }
    function bindLines() {
      $$(".cart-item", drawer).forEach(function (row) {
        var line = parseInt(row.getAttribute("data-line"), 10);
        var val = parseInt($(".qty__val", row).textContent, 10) || 1;
        var mn = $("[data-line-minus]", row), pl = $("[data-line-plus]", row), rm = $("[data-line-remove]", row);
        if (mn) mn.addEventListener("click", function () { change(line, Math.max(0, val - 1)); });
        if (pl) pl.addEventListener("click", function () { change(line, val + 1); });
        if (rm) rm.addEventListener("click", function () { change(line, 0); });
      });
    }

    function add(body, isForm) {
      var opts = { method: "POST", headers: { Accept: "application/json" } };
      if (isForm) opts.body = body;
      else { opts.headers["Content-Type"] = "application/json"; opts.body = JSON.stringify(body); }
      return fetch("/cart/add.js", opts).then(function (r) { if (!r.ok) return r.json().then(function (j) { throw j; }); return r.json(); })
        .then(function () { return refresh(); }).then(open);
    }

    $$("[data-cart-toggle]").forEach(function (t) { t.addEventListener("click", function (e) { e.preventDefault(); refresh().then(open); }); });

    return { add: add, open: open, refresh: refresh };
  })();

  /* ============ Mobile menu ============ */
  $$("[data-menu-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var menu = $("[data-menu]"); if (!menu) return;
      var willOpen = menu.hasAttribute("hidden"); menu.toggleAttribute("hidden"); btn.setAttribute("aria-expanded", String(willOpen));
    });
  });

  /* ============ Search toggle ============ */
  $$("[data-search-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var p = $("[data-search-panel]"); if (!p) return;
      var willOpen = p.hasAttribute("hidden"); p.toggleAttribute("hidden"); btn.setAttribute("aria-expanded", String(willOpen));
      if (willOpen) { var i = $("[data-search-input]", p); if (i) i.focus(); }
    });
  });

  /* ============ Countdown ============ */
  $$("[data-countdown]").forEach(function (el) {
    var target = new Date(el.getAttribute("data-countdown").replace(" ", "T")).getTime(); if (isNaN(target)) return;
    var d = $("[data-d]", el), h = $("[data-h]", el), m = $("[data-m]", el), s = $("[data-s]", el);
    var pad = function (n) { return String(n).padStart(2, "0"); };
    function tick() { var ms = Math.max(0, target - Date.now()); if (d) d.textContent = pad(Math.floor(ms / 86400000)); if (h) h.textContent = pad(Math.floor((ms / 3600000) % 24)); if (m) m.textContent = pad(Math.floor((ms / 60000) % 60)); if (s) s.textContent = pad(Math.floor((ms / 1000) % 60)); }
    tick(); setInterval(tick, 1000);
  });

  /* ============ Shuffle ============ */
  var shuffle = $("[data-shuffle]");
  if (shuffle) {
    var chips = $$("[data-mood]", shuffle), panels = $$("[data-shuffle-panel]", shuffle), cur = 0, spinning = false;
    function show(i) { cur = i; chips.forEach(function (c, x) { c.setAttribute("aria-pressed", String(x === i)); }); panels.forEach(function (p, x) { p.classList.toggle("is-active", x === i); }); }
    chips.forEach(function (c, x) { c.addEventListener("click", function () { show(x); }); });
    var sBtn = $("[data-shuffle-btn]", shuffle), sIcon = $("[data-shuffle-icon]", shuffle);
    if (sBtn && panels.length) sBtn.addEventListener("click", function () {
      if (spinning) return; spinning = true; if (sIcon) sIcon.classList.add("is-spinning");
      var t = 0, id = setInterval(function () { show((cur + 1) % panels.length); if (++t > 6) { clearInterval(id); spinning = false; if (sIcon) sIcon.classList.remove("is-spinning"); } }, 110);
    });
  }

  /* ============ Product gallery ============ */
  $$("[data-gallery]").forEach(function (gallery) {
    var main = $("[data-main]", gallery);
    $$("[data-thumb]", gallery).forEach(function (thumb) {
      thumb.addEventListener("click", function () { if (!main) return; main.src = thumb.getAttribute("data-full"); $$("[data-thumb]", gallery).forEach(function (t) { t.classList.remove("is-active"); }); thumb.classList.add("is-active"); });
    });
  });

  /* ============ Product variants, qty, add, sticky bar ============ */
  $$("[data-product]").forEach(function (root) {
    var idInput = $("[data-variant-id]", root), priceEl = $("[data-price]", root), addBtn = $("[data-add]", root),
      addText = $("[data-add-text]", root), unavailable = $("[data-unavailable]", root), mainImg = $("[data-main]", root),
      stockEl = $("[data-stock]", root), stickyPrice = $("[data-sticky-price]"), stickyAdd = $("[data-sticky-add]"),
      groups = $$(".option__values", root), variants = null, dataEl = $("[data-variants]", root);
    if (dataEl) { try { variants = JSON.parse(dataEl.textContent); } catch (e) {} }

    function updateVariant() {
      if (!variants || !groups.length) return;
      var sel = groups.map(function (g) { var a = $(".pill.is-active", g); return a ? a.getAttribute("data-value") : null; });
      var match = variants.find(function (v) { return v.options.length === sel.length && v.options.every(function (o, i) { return o === sel[i]; }); });
      if (!match) { if (unavailable) unavailable.hidden = false; if (addBtn) addBtn.disabled = true; if (addText) addText.textContent = "Unavailable"; return; }
      if (unavailable) unavailable.hidden = true;
      if (idInput) idInput.value = match.id;
      if (priceEl) priceEl.textContent = match.price;
      if (stickyPrice) stickyPrice.textContent = match.price;
      if (mainImg && match.image) mainImg.src = match.image;
      if (addBtn) addBtn.disabled = !match.available;
      if (stickyAdd) stickyAdd.disabled = !match.available;
      if (addText) addText.textContent = match.available ? "Add to bag" : "Sold out";
      if (stockEl) { if (match.tracked && match.inventory > 0 && match.inventory <= 10) { stockEl.textContent = "Only " + match.inventory + " left"; stockEl.hidden = false; } else { stockEl.hidden = true; } }
    }
    $$("[data-option-value]", root).forEach(function (pill) {
      pill.addEventListener("click", function () { $$(".pill", pill.closest(".option__values")).forEach(function (p) { p.classList.remove("is-active"); }); pill.classList.add("is-active"); updateVariant(); });
    });
    if (variants && groups.length) updateVariant();

    var qty = $("[data-qty]", root);
    if (qty) {
      var input = $(".qty__input", qty);
      $("[data-qty-minus]", qty).addEventListener("click", function () { input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1); });
      $("[data-qty-plus]", qty).addEventListener("click", function () { input.value = (parseInt(input.value, 10) || 1) + 1; });
    }

    var form = $("#product-form", root) || $("#product-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = $("[data-add]", form), label = $("[data-add-text]", form), prev = label ? label.textContent : "";
        if (btn) btn.disabled = true; if (label) label.textContent = "Adding…";
        Cart.add(new FormData(form), true)
          .then(function () { if (label) label.textContent = prev; if (btn) btn.disabled = false; })
          .catch(function (err) { if (label) label.textContent = (err && err.description) ? err.description : "Couldn't add"; setTimeout(function () { if (label) label.textContent = prev; if (btn) btn.disabled = false; }, 2200); });
      });
    }

    // Sticky add-to-cart (mobile)
    var sticky = $("[data-sticky-atc]");
    if (sticky && addBtn) {
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { sticky.hidden = en.isIntersecting; });
        }, { rootMargin: "0px 0px -40% 0px" }).observe(addBtn);
      }
      if (stickyAdd) stickyAdd.addEventListener("click", function () {
        var id = idInput ? idInput.value : null, q = qty ? (parseInt($(".qty__input", qty).value, 10) || 1) : 1;
        if (id) Cart.add({ id: id, quantity: q }, false);
      });
    }
  });

  /* ============ Quick-add from product cards ============ */
  $$("[data-quick-add]").forEach(function (btn) {
    if (btn.tagName === "A") return; // "Choose options" link
    btn.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      var vid = btn.getAttribute("data-vid");
      if (vid) { Cart.add({ id: vid, quantity: 1 }, false); return; }
      var card = btn.closest("[data-card]"); var tray = card ? $("[data-size-tray]", card) : null;
      if (tray) tray.toggleAttribute("hidden");
    });
  });
  $$("[data-card-size]").forEach(function (sz) {
    sz.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      var vid = sz.getAttribute("data-vid"); if (vid) Cart.add({ id: vid, quantity: 1 }, false);
    });
  });

  /* ============ Collection filters: auto-submit ============ */
  var filterForm = $("[data-filter-form]");
  if (filterForm) filterForm.addEventListener("change", function () { filterForm.submit(); });
})();
