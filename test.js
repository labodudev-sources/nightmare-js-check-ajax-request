var Nightmare = require('nightmare'); // Chargement de NightmareJS
var path = require('path');

var nightmare = Nightmare({
  show: true,
  webPreferences: {
    preload: path.resolve("xhr.js") // Ajout du script personnalisé pour récupérer les réponses XHR
  }
});

nightmare
  .goto('http://127.0.0.1/nightmare-js-check-ajax-request/') // Charge la page
  .type('input[type="text"]', "This input is not a number :)")
  .click('input[type="submit"]') // Valide le formulaire
  .wait(function() {
    if (window.currentRequestResponse) { // Tourne en boucle en attendant que window.currentRequestResponse soit définie
      return true;
    }
  })
  .evaluate(function() {
    return window.currentRequestResponse; // Retourne la variable pour l'utiliser dans la fonction then
  })
  .then(function(response) {
    if (isNaN(response)) { // Vérifie si ce n'est pas un nombre
		console.error('It\'s not a number!');
	}
	else {
		console.log('It\'s a number');
	}
  })
  .catch(function(error) {
    console.log(error);
  })
