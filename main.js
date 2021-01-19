'use strict';

import init from './animation.js';

var loader = new XMLHttpRequest();

loader.addEventListener('progress', updateProgress);
loader.addEventListener('load', transferComplete);
loader.addEventListener('error', transferFailed);
loader.addEventListener('abort', transferCanceled);

loader.open('GET', document.location, true);

loader.send(null);

function updateProgress (event) {
  if (event.lengthComputable) {
    var percentComplete = event.loaded / event.total * 100;
	//console.log(percentComplete);
	document.getElementById('loader').innerHTML = percentComplete + '%';
  } else {
  }
}

function transferComplete(e) {
	gsap.set('.headline span', {opacity: 0});
	gsap.to('#loader', 1, {
		opacity: 0,
		duration: 1,
		onComplete: gsap.to('.page', 1, {
			opacity: 1,
			duration: 1,
			delay: 1,
			onComplete: init
		})
	});
	//console.log("The transfer is complete.");
}

function transferFailed(e) {
  //console.log("An error occurred.");
}

function transferCanceled(e) {
  //console.log("The transfer has been canceled.");
}

/*
document.addEventListener('DOMContentLoaded', function() {
    // your code here 
}, false);
*/

/*
(function () {
	// init part
})();
*/
