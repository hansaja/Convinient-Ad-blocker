const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");
//Above constants are representing the elements in the block.html page


//Save button  fuctions, saves the URLS entered in the textarea of block.html 
save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked });
});
//Enable checkbox setting ,making the urls entered in textarea in block.html be enabled to be saved 
checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled });
});

//This function shows the user what urls he/she entered before for blocking 
window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked,enabled } = local;
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
      checkbox.checked = enabled;
    }
  });
});

