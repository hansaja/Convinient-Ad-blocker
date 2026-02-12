(function () {
  "use strict";

  var protocol = document.location.protocol;

  // Only warn on HTTP pages
  if (protocol !== "http:") return;

  chrome.storage.sync.get({ approvedHttpHosts: [] }, function (data) {
    var hostname = document.location.hostname;
    var approved = data.approvedHttpHosts;

    if (Array.isArray(approved) && approved.includes(hostname)) {
      console.log("[Blockey] HTTP host approved by user:", hostname);
      return;
    }

    var warningUrl =
      "options/warning.html?url=" + encodeURIComponent(document.URL);
    window.location.href = chrome.runtime.getURL(warningUrl);
  });
})();
