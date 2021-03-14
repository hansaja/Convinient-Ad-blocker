var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}
var url_id = urlParam('url'); 

document.getElementById('exit').addEventListener('click', function (re) {
	chrome.tabs.getCurrent(function(tab) {
    chrome.tabs.remove(tab.id, function() { });
});
})

	var urlee = new URL('', url_id);
	var hostnamee = urlee.hostname
	// console.log(hostnamee);
document.getElementById('continue').addEventListener('click', function (re) {
	var appr = +new Date();
	var urlee = new URL('', url_id);
	var hostnamee = urlee.hostname
	// console.log(hostnamee);
	chrome.storage.sync.set({[appr]: hostnamee},function (req) {
		console.log('done')
		window.location.href = url_id
	})
})