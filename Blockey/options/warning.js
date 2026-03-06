(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var rawUrl = params.get("url");

  if (!rawUrl) return;

  var hostname;
  try {
    hostname = new URL(rawUrl).hostname;
  } catch (e) {
    console.error("[Blockey] Invalid URL in warning page:", rawUrl);
    return;
  }

  // Exit: close this tab
  document.getElementById("exit").addEventListener("click", function () {
    chrome.tabs.getCurrent(function (tab) {
      if (tab) chrome.tabs.remove(tab.id);
    });
  });

  // Continue: save hostname to approved list and navigate
  document.getElementById("continue").addEventListener("click", function () {
    chrome.storage.sync.get({ approvedHttpHosts: [] }, function (data) {
      var hosts = Array.isArray(data.approvedHttpHosts)
        ? data.approvedHttpHosts
        : [];
      if (!hosts.includes(hostname)) {
        hosts.push(hostname);
      }
      chrome.storage.sync.set({ approvedHttpHosts: hosts }, function () {
        if (chrome.runtime.lastError) {
          console.error("[Blockey] Failed to save approved host:", chrome.runtime.lastError);
          return;
        }
        window.location.href = rawUrl;
      });
    });
  });
})();
