(function () {
  var loadingPath = "/loading.html";
  var currentPath = window.location.pathname;
  var isTopPage = currentPath.endsWith("/") || currentPath.endsWith("/index.html");

  if (!isTopPage) {
    return;
  }

  if (sessionStorage.getItem("portfolioLoadingPassed") === "true") {
    sessionStorage.removeItem("portfolioLoadingPassed");
    sessionStorage.setItem("portfolioLoadingShown", "true");
    return;
  }

  if (sessionStorage.getItem("portfolioLoadingShown") === "true") {
    return;
  }

  var referrer = document.referrer;
  var isInternalReferrer = false;

  if (referrer) {
    try {
      var referrerUrl = new URL(referrer);
      isInternalReferrer = referrerUrl.origin === window.location.origin;
    } catch (error) {
      isInternalReferrer = false;
    }
  }

  if (isInternalReferrer) {
    return;
  }

  window.location.replace("." + loadingPath);
})();
