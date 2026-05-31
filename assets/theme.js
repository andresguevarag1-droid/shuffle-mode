// Shuffle Mode theme — minimal vanilla interactions.
(function () {
  "use strict";

  /* Mobile menu */
  document.querySelectorAll("[data-menu-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var menu = document.querySelector("[data-menu]");
      if (!menu) return;
      var open = menu.hasAttribute("hidden");
      if (open) menu.removeAttribute("hidden");
      else menu.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* Shuffle my mood */
  var root = document.querySelector("[data-shuffle]");
  if (root) {
    var dataEl = root.querySelector("[data-moods]");
    var moods = [];
    try {
      moods = JSON.parse(dataEl ? dataEl.textContent : "[]");
    } catch (e) {
      moods = [];
    }

    var labelEl = root.querySelector("[data-shuffle-label]");
    var lineEl = root.querySelector("[data-shuffle-line]");
    var card = root.querySelector("[data-shuffle-card]");
    var chips = Array.prototype.slice.call(root.querySelectorAll("[data-mood]"));
    var current = 0;
    var spinning = false;

    function render(i) {
      var m = moods[i];
      if (!m) return;
      if (labelEl) labelEl.textContent = m.label;
      if (lineEl) lineEl.textContent = "“" + m.line + "”";
      if (card) {
        card.style.background =
          "linear-gradient(145deg, " + m.c0 + ", " + m.c1 + ")";
      }
      chips.forEach(function (chip, idx) {
        chip.setAttribute("aria-pressed", String(idx === i));
      });
      current = i;
    }

    chips.forEach(function (chip, idx) {
      chip.addEventListener("click", function () {
        render(idx);
      });
    });

    var shuffleBtn = root.querySelector("[data-shuffle-btn]");
    if (shuffleBtn && moods.length) {
      shuffleBtn.addEventListener("click", function () {
        if (spinning) return;
        spinning = true;
        var ticks = 0;
        var id = setInterval(function () {
          render((current + 1) % moods.length);
          if (++ticks > 6) {
            clearInterval(id);
            spinning = false;
          }
        }, 110);
      });
    }
  }
})();
