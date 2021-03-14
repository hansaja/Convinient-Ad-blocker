var pass_it;
var doc_protocol = document.location.protocol;
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
function check() {
	if (!pass_it && doc_protocol !== 'https:') {
		var get_url = 'options/warning.html?url=' + document.URL 
		window.location.href = chrome.runtime.getURL(get_url);
	}else {
		console.log('pass')
	}
}