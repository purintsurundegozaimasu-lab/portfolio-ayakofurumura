document.addEventListener("DOMContentLoaded", function () {
  var closeMenu = function (button) {
    var header = button.closest(".header");
    var menu = document.getElementById(button.getAttribute("aria-controls"));

    if (!menu) {
      return;
    }

    menu.classList.remove("is-open");
    header.classList.remove("is-menu-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "メニューを開く");

    window.setTimeout(function () {
      if (button.getAttribute("aria-expanded") !== "true") {
        menu.hidden = true;
      }
    }, 460);
  };

  document.querySelectorAll(".menu_button").forEach(function (button) {
    button.addEventListener("click", function () {
      var header = button.closest(".header");
      var menu = document.getElementById(button.getAttribute("aria-controls"));
      var isOpen = button.getAttribute("aria-expanded") === "true";

      if (!menu) {
        return;
      }

      if (isOpen) {
        closeMenu(button);
        return;
      }

      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "メニューを閉じる");
      menu.hidden = false;

      window.requestAnimationFrame(function () {
        header.classList.add("is-menu-open");
        menu.classList.add("is-open");
      });
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.closest(".header")) {
      return;
    }

    document
      .querySelectorAll(".menu_button[aria-expanded='true']")
      .forEach(closeMenu);
  });

  document.querySelectorAll(".performance_mockup_link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("data-overlay-target");
      var target = document.getElementById(targetId);

      if (!target || !target.classList.contains("performance_work_overlay")) {
        return;
      }

      event.preventDefault();
      target.classList.add("is-active");
    });
  });

  document.querySelectorAll(".performance_gallery_item a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      var isSpList = window.matchMedia("(max-width: 768px)").matches;
      var item = link.closest(".performance_gallery_item");

      if (
        !isSpList ||
        !item ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target
      ) {
        return;
      }

      event.preventDefault();
      item.classList.add("is-spotlit");

      window.setTimeout(function () {
        window.location.href = link.href;
      }, 180);
    });
  });

  document.querySelectorAll("[data-burger-slide-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var section = button.closest("[data-burger-slide-section]");

      if (!section) {
        return;
      }

      var nextSlide = section.getAttribute("data-active-slide") === "a" ? "b" : "a";
      var currentLabel = nextSlide === "a" ? "B" : "A";
      var buttonImage = button.querySelector(".burger_slide_toggle_img");

      section.setAttribute("data-active-slide", nextSlide);
      section.querySelectorAll("[data-slide-panel]").forEach(function (panel) {
        panel.setAttribute(
          "aria-hidden",
          String(panel.getAttribute("data-slide-panel") !== nextSlide),
        );
      });

      if (buttonImage) {
        buttonImage.setAttribute(
          "src",
          "./images/performance-burger/swipe-btn-" + currentLabel.toLowerCase() + ".png",
        );
        buttonImage.setAttribute("alt", "swipe " + currentLabel);
      }

      button.setAttribute("aria-label", currentLabel + "案の説明へ切り替え");
    });
  });

  document
    .querySelectorAll(".performance_work_overlay_backdrop, .performance_work_view_close")
    .forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var overlay = button.closest(".performance_work_overlay");

        if (overlay) {
          overlay.classList.remove("is-active");
        }

        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      });
    });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    document
      .querySelectorAll(".performance_work_overlay.is-active")
      .forEach(function (overlay) {
        overlay.classList.remove("is-active");
      });

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });
});
