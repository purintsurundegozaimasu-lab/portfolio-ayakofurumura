(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var openDelay = reduceMotion ? 300 : 3200;
  var redirectDelay = reduceMotion ? 900 : 5200;

  window.setTimeout(function () {
    document.body.classList.add("is-opening");
  }, openDelay);

  window.setTimeout(function () {
    window.location.href = "./index.html";
  }, redirectDelay);
})();
