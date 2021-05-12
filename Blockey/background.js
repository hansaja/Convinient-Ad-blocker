/*
when user points the cursor to a link and if he/she right clicks it "check the url" option will be available
*/
chrome.contextMenus.create({
    title: "check the URL",
    contexts: ["link"],
    onclick: checkUrl
});

/*
this is the  main funtion of the ad blocking process. It uses chrome's webRequest API to block given ad domains.
plus outputs the number of ads blocked
 */
chrome.webRequest.onBeforeRequest.addListener(
  function(details) { 
    // alert(JSON.stringify(details))
    // if(defaultUrls.indexOf(details.url) >=0 ){
      
      chrome.storage.local.get(["blockedCount"], function (local) {
        if (!local["blockedCount"] ) {
                  chrome.storage.local.set({ "blockedCount" : 1}, function(){        
           
            
          });
        } else {
          chrome.storage.local.set({ "blockedCount": parseInt(local["blockedCount"] + 1)}, function(){
            chrome.storage.local.get(["blockedCount"], function(local) {
              // alert(`blocked count : ${local["blockedCount"]}`)
            })
          });
        }
      });
    // }
    return { cancel: true }},
  { urls: blockList },
  ["blocking", "requestBody"]//chrome api properties 
)

/*
this is used to check the safty of a URL, if it is safe or not
this funtion check the URL according to the given expresion and retun the URL and its safty status
*/
function checkUrl(link) {
    var url = link.linkUrl;

    regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(url)) {
        alert(url + '   safe');
    }
    else {
        alert("unsafe");
    }

}

/*Fuction checks if user had added website or ad domains to be blocked variable. If empty nothing is safed. 
Also sets enable checkbox to false is not marked */
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["blocked", "enabled"], function (local) {
      if (!Array.isArray(local.blocked)) {
        chrome.storage.local.set({ blocked: [] });
      }
  
      if (typeof local.enabled !== "boolean") {
        chrome.storage.local.set({ enabled: false });
      }
    });
  });
  
  //This method is there to see if tab is updated, if tab is updated URL information is taken to be used in the sub function
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (!url || !url.startsWith("http")) {
      return;
    }
  
    const hostname = new URL(url).hostname;// Since a its a url it is set to constant hostname

   /*Sub function removes tabs of the urls taken from the main fuction if those match the block urls set by the user*/
    chrome.storage.local.get(["blocked", "enabled"], function (local) {
      const { blocked, enabled } = local;
      if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {
        chrome.tabs.remove(tabId);
      }
    });
  });

