document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["blockedCount"], function (local) {
    if (chrome.runtime.lastError) {
      console.error("[Blockey] Storage error:", chrome.runtime.lastError);
      return;
    }
    var count = local.blockedCount || 0;
    document.getElementById("blocked-count").textContent = count.toLocaleString();
  });
});
