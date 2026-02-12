(function () {
  "use strict";

  const SKIP_SELECTORS = [
    ".ytp-skip-ad-button",
    ".ytp-ad-skip-button-modern",
    ".ytp-ad-skip-button",
    ".ytp-ad-overlay-close-button",
    ".ytp-ad-skip-button-container button",
  ];

  function trySkipAds() {
    for (const selector of SKIP_SELECTORS) {
      const buttons = document.querySelectorAll(selector);
      for (const button of buttons) {
        if (button.offsetParent !== null) {
          button.click();
          console.log("[Blockey] Ad skipped/closed");
        }
      }
    }
  }

  // Run once for ads already present at load time
  trySkipAds();

  // Observe DOM changes on the player to detect new ads
  const target = document.getElementById("movie_player");
  if (target) {
    const observer = new MutationObserver(trySkipAds);
    observer.observe(target, { childList: true, subtree: true });
    console.log("[Blockey] Ad skipper observing #movie_player");
  } else {
    // Fallback: wait for the player to appear
    const bodyObserver = new MutationObserver(() => {
      const player = document.getElementById("movie_player");
      if (player) {
        bodyObserver.disconnect();
        const observer = new MutationObserver(trySkipAds);
        observer.observe(player, { childList: true, subtree: true });
        console.log("[Blockey] Ad skipper observing #movie_player (deferred)");
      }
    });
    bodyObserver.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
