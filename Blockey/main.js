var pass_it;
var doc_protocol = document.location.protocol;
//Check whether the non https url exist in the storage 
chrome.storage.sync.get(null,function (response) {
	Object.values(response).forEach( function(element, index) {
		if (document.URL.indexOf(element) !== -1) {
			pass_it = true;
		}else {
			pass_it = false;
		}
});
check();
})

/*If the urls is not in the storage and  if it is not https, rederected to warning.html page with url. 
The url is saved as the 'get_url' parameter this would be used in warning.js file*/ 
function check() {
	if (!pass_it && doc_protocol !== 'https:') {
		var get_url = 'options/warning.html?url=' + document.URL 
		window.location.href = chrome.runtime.getURL(get_url);
	}else {
		console.log('This is a safe website');
	}
}