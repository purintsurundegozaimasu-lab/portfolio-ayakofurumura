document.addEventListener("DOMContentLoaded", function () {
  const confettiArea = document.querySelector(".confetti_area");

  if (confettiArea) {
    const confettiImages = [
      "./images/top/confetti01.png",
      "./images/top/confetti02.png",
      "./images/top/confetti03.png",
      "./images/top/confetti04.png",
    ];

    const confettiCount = window.matchMedia("(max-width: 640px)").matches
      ? 10
      : 18;
    const confettiFragment = document.createDocumentFragment();

    for (let i = 0; i < confettiCount; i++) {
      const randomImage =
        confettiImages[Math.floor(Math.random() * confettiImages.length)];
      const randomSize = 8 + Math.random() * 18;
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 6;
      const randomDuration = 6 + Math.random() * 7;
      const randomSway = -80 + Math.random() * 160;
      const randomRotate = 180 + Math.random() * 720;

      const confetti = document.createElement("img");
      confetti.src = randomImage;
      confetti.alt = "";
      confetti.className = "confetti";
      confetti.style.left = `${randomLeft}%`;
      confetti.style.setProperty("--confetti-size", `${randomSize}px`);
      confetti.style.setProperty("--confetti-delay", `${randomDelay}s`);
      confetti.style.setProperty("--confetti-duration", `${randomDuration}s`);
      confetti.style.setProperty("--confetti-sway", `${randomSway}px`);
      confetti.style.setProperty("--confetti-rotate", `${randomRotate}deg`);
      confettiFragment.appendChild(confetti);
    }

    confettiArea.appendChild(confettiFragment);

    confettiArea.classList.add("is-animated");
  }

  const dogPeek = document.querySelector(".dog_peek");
  const clamp = (value, min = 0, max = 1) =>
    Math.min(Math.max(value, min), max);
  let ticking = false;
  let scrollEndTimer;
  const scrollCallbacks = [];
  const requestScrollUpdate = () => {
    document.documentElement.classList.add("is-scrolling");
    window.clearTimeout(scrollEndTimer);
    scrollEndTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("is-scrolling");
    }, 140);

    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      scrollCallbacks.forEach((callback) => callback());
    });
  };
  const addScrollCallback = (callback) => {
    scrollCallbacks.push(callback);
    callback();
  };

  if (dogPeek) {
    const getDogRatio = (name, fallback) => {
      const rawValue = getComputedStyle(dogPeek).getPropertyValue(name).trim();
      const value = parseFloat(rawValue);

      if (!Number.isFinite(value)) {
        return fallback;
      }

      return rawValue.endsWith("%") ? value / 100 : value;
    };

    const setDogPeekProgress = () => {
      const rect = dogPeek.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const motionStart = getDogRatio("--dog-peek-motion-start", 0.78);
      const motionRange = getDogRatio("--dog-peek-motion-range", 0.42);
      const progress = clamp(
        (viewportHeight * motionStart - rect.top) /
          (viewportHeight * motionRange),
      );
      const leftPawProgress = clamp(progress * 3.2);
      const rightPawProgress = clamp((progress - 0.22) * 3.2);
      const faceProgress = clamp((progress - 0.48) * 2.4);

      dogPeek.style.setProperty(
        "--dog-left-y",
        `${(1 - leftPawProgress) * 70}%`,
      );
      dogPeek.style.setProperty(
        "--dog-right-y",
        `${(1 - rightPawProgress) * 70}%`,
      );
      dogPeek.style.setProperty("--dog-face-y", `${(1 - faceProgress) * 82}%`);
      dogPeek.style.setProperty("--dog-left-opacity", leftPawProgress);
      dogPeek.style.setProperty("--dog-right-opacity", rightPawProgress);
      dogPeek.style.setProperty("--dog-face-opacity", faceProgress);
    };

    addScrollCallback(setDogPeekProgress);
  }

  const introduction = document.querySelector(".introduction");

  if (introduction) {
    const introTitle = introduction.querySelector(".section_title");

    const setIntroTitleLightProgress = () => {
      const rect = (introTitle || introduction).getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const progress = clamp(
        (viewportHeight * 0.72 - rect.top) / (viewportHeight * 0.16),
      );
      const lightLeft = (1 - progress) * 100;
      const lightRight = progress > 0 ? 100 : lightLeft;
      const introRect = introduction.getBoundingClientRect();
      const introSpotProgress = clamp(
        (viewportHeight * 0.84 - introRect.top) / (viewportHeight * 0.7),
      );
      const spotMove = (1 - introSpotProgress) * 100;
      const profileImageProgress = clamp((introSpotProgress - 0.78) / 0.18);

      introduction.style.setProperty(
        "--intro-title-light-left",
        `${lightLeft}%`,
      );
      introduction.style.setProperty(
        "--intro-title-light-right",
        `${lightRight}%`,
      );
      introduction.style.setProperty("--intro-title-light-opacity", progress);
      introduction.style.setProperty(
        "--intro-spot-right-motion-x",
        `${spotMove}vw`,
      );
      introduction.style.setProperty(
        "--intro-spot-left-motion-x",
        `-${spotMove}vw`,
      );
      introduction.style.setProperty(
        "--intro-profile-image-opacity",
        profileImageProgress,
      );
    };

    addScrollCallback(setIntroTitleLightProgress);
  }

  const walkingDog = document.querySelector(".works_walking_dog");
  const performances = document.querySelector(".performances");

  if (walkingDog && performances) {
    const workBooks = Array.from(performances.querySelectorAll(".work_book"));
    const randomWorkBooks = workBooks
      .map((book) => ({ book, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map(({ book }) => book);

    const setWalkingDogProgress = () => {
      const rect = performances.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const progress = clamp(
        (viewportHeight * 0.72 - rect.top) /
          (viewportHeight * 0.72 + rect.height * 0.34),
      );
      const step = Math.floor(progress * 12) % 2;
      const dogLeftRatio = (36 + progress * 24) / 100;
      const dogTopRatio = (10.5 + progress * 4) / 100;

      walkingDog.style.setProperty("--works-dog-left-ratio", dogLeftRatio);
      walkingDog.style.setProperty("--works-dog-top-ratio", dogTopRatio);
      walkingDog.classList.toggle("is-step-2", step === 1);
    };

    addScrollCallback(setWalkingDogProgress);

    if (randomWorkBooks.length) {
      const setPerformanceCardsProgress = () => {
        const rect = performances.getBoundingClientRect();
        const viewportHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const progress = clamp(
          (viewportHeight * 0.86 - rect.top) / (viewportHeight * 0.62),
        );
        const cardStep = 0.72 / randomWorkBooks.length;

        randomWorkBooks.forEach((book, index) => {
          const threshold = 0.08 + cardStep * index;
          book.classList.toggle("is-visible", progress >= threshold);
        });

        performances.classList.toggle("is-decorated", progress >= 0.82);
      };

      addScrollCallback(setPerformanceCardsProgress);
    }
  }

  const castingCall = document.querySelector(".casting_call");

  if (castingCall) {
    const setCastingSpotProgress = () => {
      const rect = castingCall.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const progress = clamp(
        (viewportHeight * 1 - rect.top) / (viewportHeight * 0.7),
      );
      const spotMove = (1 - progress) * 100;

      castingCall.style.setProperty(
        "--casting-left-spot-motion-x",
        `-${spotMove}vw`,
      );
      castingCall.style.setProperty(
        "--casting-right-spot-motion-x",
        `${spotMove}vw`,
      );
    };

    addScrollCallback(setCastingSpotProgress);
  }

  if (scrollCallbacks.length) {
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
  }
});
