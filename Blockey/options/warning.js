/*This function takes the parameter 'get_url' from main.js file. 
Extracts the url from it, by compairing it to a regular expression */

var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}
var url_id = urlParam('url'); //Extracted url is set to this variable

//exit button function ; close the warning.html page
document.getElementById('exit').addEventListener('click', function (re) {
	chrome.tabs.getCurrent(function(tab) {
    chrome.tabs.remove(tab.id, function() { });
});
})

/*Continue button fuction, lets the user enter the non https website. 
Next time thuer visits thus site it won't be blocked because it is saved in storage */
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