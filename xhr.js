window.__nightmare = {};
__nightmare.ipc = require('electron').ipcRenderer;

window.currentRequestResponse = undefined;

var open = window.XMLHttpRequest.prototype.open;

window.XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
	this.addEventListener("readystatechange", function() {
		if (this.readyState === 4) {
			window.currentRequestResponse = this.responseText;
		}
	}, false);

	open.apply(this, arguments);
};


/**
* Get XHR Element
* @return {XMLHttpRequest|AciveXObject}
*/
function getXMLHttpRequest() {
	var xhr = null;

	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest();
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}

	return xhr;
}
