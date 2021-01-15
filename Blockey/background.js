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
    function (details) { 
        return { cancel: true }; 
    },
    { urls: blockList },
    ["blocking"]
);

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


