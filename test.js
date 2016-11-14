var Nightmare = require('nightmare');
var path = require('path');

var nightmare = Nightmare({
  show: true,
  webPreferences: {
    preload: path.resolve("xhr.js")
  }
});

nightmare
  .goto('http://127.0.0.1/nightmare-js-check-ajax-request/')
  .type('input[type="text"]', "This input is not a number :)")
  .click('input[type="submit"]')
  .wait(function() {
    if (window.currentRequestResponse) {
      return true;
    }
  })
  .evaluate(function() {
    return window.currentRequestResponse;
  })
  .then(function(response) {
    if (isNaN(response)) {
		console.error('It\'s not a number!');
	}
	else {
		console.log('It\'s a number');
	}
  })
  .catch(function(error) {
    console.log(error);
  })
