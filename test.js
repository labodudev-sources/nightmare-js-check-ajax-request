var Nightmare = require('nightmare');
var path = require('path');

var nightmare = Nightmare({
  show: true,
  typeInterval: 1,
  webPreferences: {
    preload: path.resolve("xhr.js"),
    partition: 'nopersist'
  }
});

nightmare
  .goto('http://127.0.0.1/nightmare-js-check-ajax-request/')
  .type('input[type="text"]', "toto")
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
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })
