window.onload = function () {
    document.getElementById('more').onclick = function () {
        //alert("open");
        chrome.browserAction.onClicked.addListener(function(tab) {
            chrome.tabs.create({url: chrome.extension.getURL('more.html')});
        });
    }
}


