(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var enteredAt = new Date();
  var startAt = new Date(enteredAt.getTime() - 60 * 60 * 1000);
  var minimumDuration = reduceMotion ? 300 : 3000;
  var maximumDuration = 8000;
  var doorDuration = reduceMotion ? 300 : 1400;
  var loadedCount = 0;
  var isLoadComplete = false;
  var isFinished = false;
  var startedAt = performance.now();
  var isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
  var firstViewAssets = isSmallScreen
    ? [
        "./images/top/mv-bg-righton-sp.webp",
        "./images/top/MV-myself-sp.png",
        "./images/top/mv-myself-right-sp.png",
      ]
    : [
        "./images/top/mv-bg.webp",
        "./images/top/MV-myself.png",
        "./images/top/mv-myself-right.png",
      ];
  var assets = firstViewAssets.concat([
    "./images/top/mv-dog-sp.png",
    "./images/top/mv-welcome.png",
    "./images/top/MV-people.png",
    "./images/top/introduction-bg.webp",
    "./images/top/intro-star-large.png",
    "./images/top/intro-star-medium.png",
    "./images/top/intro-star-small.png",
    "./images/top/intro-sparkle-dots-1.png",
    "./images/top/intro-sparkle-dots-2.png",
    "./images/top/intro-mayself.webp",
    "./images/top/intro-mayself-click.png",
    "./images/top/dog-peek-paw-right.png",
    "./images/top/dog-peek-paw-left.png",
    "./images/top/dog-peek-face.png",
    "./images/top/speciality-bg.webp",
    "./images/top/specoality-star-titleleft.png",
    "./images/top/specoality-star-titleright.png",
    "./images/top/skill-design.png",
    "./images/top/skill-cording.png",
    "./images/top/skill-analysis.png",
    "./images/top/skill-AI.png",
    "./images/top/skill-communication.png",
    "./images/top/skill-others.png",
    "./images/top/performances-bg.webp",
    "./images/top/dog-walk-01.png",
    "./images/top/dog-walk-02.png",
    "./images/top/performance-stars-left.png",
    "./images/top/performance-stars-right.png",
    "./images/top/Performances-salonbook.png",
    "./images/top/Performances-burgerbook.png",
    "./images/top/Performances-icebook.png",
    "./images/top/Performances-workersbook.png",
    "./images/top/Performances-cafebook.png",
    "./images/top/Performances-mobilebook.png",
    "./images/top/Performances-click1.png",
    "./images/top/Performances-click2.png",
    "./images/top/performances-click1-sp.png",
    "./images/top/Performances-click2-sp.png",
    "./images/top/performance-morebtn.png",
    "./images/top/castingcall-bg.webp",
    "./images/top/footer-myself.png",
  ]);

  var clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
  };

  var getClockAngles = function (date) {
    var hours = date.getHours() % 12;
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    var minuteProgress = minutes + seconds / 60 + milliseconds / 60000;
    var hourProgress = hours + minuteProgress / 60;

    return {
      short: hourProgress * 30,
      long: minuteProgress * 6,
    };
  };

  var setClockProgress = function (progress) {
    var currentTime =
      startAt.getTime() + (enteredAt.getTime() - startAt.getTime()) * progress;
    var angles = getClockAngles(new Date(currentTime));

    document.documentElement.style.setProperty(
      "--loading-short-hand-angle",
      angles.short + "deg",
    );
    document.documentElement.style.setProperty(
      "--loading-long-hand-angle",
      angles.long + "deg",
    );
  };

  var preloadImage = function (src) {
    return new Promise(function (resolve) {
      var image = new Image();
      var finish = function () {
        loadedCount += 1;
        resolve();
      };

      image.onload = finish;
      image.onerror = finish;
      image.src = src;
    });
  };

  var finishLoading = function () {
    if (isFinished) {
      return;
    }

    isFinished = true;
    setClockProgress(1);
    document.body.classList.add("is-opening");

    window.setTimeout(function () {
      sessionStorage.setItem("portfolioLoadingPassed", "true");
      window.location.replace("./index.html");
    }, doorDuration);
  };

  var tick = function () {
    var elapsed = performance.now() - startedAt;
    var loadProgress = assets.length ? loadedCount / assets.length : 1;
    var timeProgress = clamp(elapsed / minimumDuration, 0, 1);
    var progress = clamp(Math.min(loadProgress, timeProgress), 0, 0.98);

    if (isFinished) {
      return;
    }

    setClockProgress(progress);

    if (isLoadComplete && elapsed >= minimumDuration) {
      finishLoading();
      return;
    }

    if (elapsed >= maximumDuration) {
      finishLoading();
      return;
    }

    window.requestAnimationFrame(tick);
  };

  setClockProgress(0);
  window.requestAnimationFrame(tick);
  Promise.all(assets.map(preloadImage)).then(function () {
    isLoadComplete = true;
  });
})();
