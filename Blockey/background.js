/*
if user point the cursor to link it
create the check URL option in the menu 
this is chrome API
*/
chrome.contextMenus.create({
  title: "check the URL",
  contexts: ["link"],
  onclick: checkUrl
});

/*
this is main funtion of ad blocking process.
it use chrome's webRequest API to block given ad domains
*/

chrome.webRequest.onBeforeRequest.addListener(
function(details) { 
  // alert(JSON.stringify(details))
  // if(defaultUrls.indexOf(details.url) >=0 ){
    chrome.storage.local.get(["blockedCount"], function (local) {
      if (!local["blockedCount"] ) {
        chrome.storage.local.set({ "blockedCount": 1 }, function(){ //In the initial stage when blockedcount is empty 1 assinged in the inial stage 
          // alert('initialized to:  1')
        });
      } else {
        chrome.storage.local.set({ "blockedCount": parseInt(local["blockedCount"] + 1) }, function(){
          chrome.storage.local.get(["blockedCount"], function(local) {
            // alert(`blocked count : ${local["blockedCount"]}`)
          })
        });
      }
    });
  // }
  return { cancel: true }},
{ urls: blockList },
["blocking", "requestBody"]
)

/*
this is used to check safty of a  URL is safe or not
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

chrome.runtime.onInstalled.addListener(function () { // Block site  program 
  chrome.storage.local.get(["blocked", "enabled"], function (local) {// get the websites entered by the user 
    if (!Array.isArray(local.blocked)) { //checks whether the array is empty   
      chrome.storage.local.set({ blocked: [] });//set the entered websites to the "blocked" variable
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: false });//check whether enable function is turned on
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url; // here url is a constant variable we have assinged the pending url and the exiting url but,in the operating either one of them is assinged
  if (!url || !url.startsWith("http")) { // checks the url both http and https 
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local; // above two variable are passed as constants to local 
    if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {// if there is data in "blocked" if the enable button is turn on
      chrome.tabs.remove(tabId);// remove the tabs of the particular website
    }
  });
});

