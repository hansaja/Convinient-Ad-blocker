/**
 * Blockey settings page — manages user-defined blocked domains.
 */
const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked }, () => {
    if (chrome.runtime.lastError) {
      console.error("[Blockey] Save failed:", chrome.runtime.lastError);
      return;
    }
    save.textContent = "Saved!";
    setTimeout(() => { save.textContent = "Save"; }, 1500);
  });
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled }, () => {
    if (chrome.runtime.lastError) {
      console.error("[Blockey] Checkbox save failed:", chrome.runtime.lastError);
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], (local) => {
    if (chrome.runtime.lastError) {
      console.error("[Blockey] Load failed:", chrome.runtime.lastError);
      return;
    }
    const { blocked, enabled } = local;
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
      checkbox.checked = enabled;
    }
  });
});
