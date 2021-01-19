'use strict';

import { start } from './animation.js';

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
	document.querySelector('#loader').innerHTML = percentComplete + '%';
  } else {
  }
}

function transferComplete(e) {
	gsap.set('.headline span', {opacity: 0});
	gsap.to('#loader', 1, {
		opacity: 0,
		duration: 1,
		onComplete: start
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
