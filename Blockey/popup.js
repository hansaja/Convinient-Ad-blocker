/*
window.onload = function () {
    document.getElementById('more').onclick = function () {
        //alert("open");
        chrome.browserAction.onClicked.addListener(function(tab) {
            chrome.tabs.create({url: chrome.extension.getURL('more.html')});
        });
    }
}

*/
//sends the number of ads blocked to the popup.html page.
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(["blockedCount"], function(local) {
        document.getElementById("blocked-count").innerHTML = local["blockedCount"]
    });
});