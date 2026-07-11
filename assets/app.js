/* anasantana.me — shared behavior: reveal, mobile nav, the wheel, year stamp.
   Semantic base first. Everything here is enhancement; nothing essential
   lives behind it. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- mobile nav ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.textContent = open ? "Close" : "Menu";
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.textContent = "Menu";
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- scroll reveal ---- */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
    // safety net: never leave content stuck invisible if the observer never fires
    window.setTimeout(function () {
      revealables.forEach(function (el) { el.classList.add("in"); });
    }, 1800);
  }

  /* ---- the wheel: node <-> center sync, plus the load rotation ---- */
  var stage = document.querySelector(".wheel-stage");
  var wheel = stage && stage.querySelector("[data-wheel]");
  if (stage && wheel) {
    var nodes = wheel.querySelectorAll(".wheel__node");
    var phaseBox = stage.querySelector(".wheel__phase");
    var pn = phaseBox && phaseBox.querySelector(".pn");
    var pname = phaseBox && phaseBox.querySelector(".pname");
    var pline = phaseBox && phaseBox.querySelector(".pline");

    function activate(node) {
      nodes.forEach(function (n) { n.classList.toggle("is-on", n === node); });
      if (pn) pn.textContent = node.getAttribute("data-num");
      if (pname) pname.textContent = node.getAttribute("data-name");
      if (pline) pline.textContent = node.getAttribute("data-line");
      stage.classList.add("is-active");
      wheel.setAttribute("data-active", "on");
    }
    function rest() {
      nodes.forEach(function (n) { n.classList.remove("is-on"); });
      stage.classList.remove("is-active");
      wheel.removeAttribute("data-active");
    }

    nodes.forEach(function (n) {
      n.addEventListener("mouseenter", function () { activate(n); });
      n.addEventListener("focus", function () { activate(n); });
    });
    stage.addEventListener("mouseleave", function () {
      if (!stage.contains(document.activeElement)) rest();
    });
    stage.addEventListener("focusout", function () {
      // reset only when focus has left the wheel entirely
      window.setTimeout(function () {
        if (!stage.contains(document.activeElement)) rest();
      }, 0);
    });

    /* load rotation — fire once when the wheel first enters view */
    if (!reduce && "IntersectionObserver" in window) {
      var spun = false;
      var wio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !spun) {
            spun = true;
            wheel.setAttribute("data-animate", "on");
            wio.unobserve(en.target);
          }
        });
      }, { threshold: 0.35 });
      wio.observe(wheel);
    }
  }

  /* ---- year stamp ---- */
  var y = document.querySelector("[data-year]");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
