(function (d) {
  var config = {
      kitId: "pgx3daq",
      scriptTimeout: 3000,
      async: true,
    },
    root = d.documentElement,
    timeout = setTimeout(function () {
      root.className =
        root.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    script = d.createElement("script"),
    loaded = false,
    firstScript = d.getElementsByTagName("script")[0],
    readyState;

  root.className += " wf-loading";
  script.src = "https://use.typekit.net/" + config.kitId + ".js";
  script.async = true;
  script.onload = script.onreadystatechange = function () {
    readyState = this.readyState;
    if (loaded || (readyState && readyState !== "complete" && readyState !== "loaded")) {
      return;
    }

    loaded = true;
    clearTimeout(timeout);

    try {
      Typekit.load(config);
    } catch (error) {
      root.className =
        root.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }
  };
  firstScript.parentNode.insertBefore(script, firstScript);
})(document);
