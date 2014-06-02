'use strict';

(function () {
	// Terminal typing emulation code, Copyright (C) 2014, Uri Shaked. ISC License.
	if(localStorage.userId !== undefined){
			location.replace("/hack.html");
	}
	var terminal = document.querySelector('.mini-terminal');

	function toArray(elements) {
		var result = [];
		for (var i = 0; i < elements.length; i++) {
			result.push(elements[i]);
		}
		return result;
	}

	var displayQueue = [];

	// Turn each letter into a span
	toArray(terminal.childNodes).forEach(function (child) {
		if (child.nodeType === 3) {
			var text = child.textContent.trim().replace(/\s+/, ' ');
			text.split('').forEach(function (letter) {
				var element = document.createElement('span');
				element.textContent = letter;
				terminal.insertBefore(element, child);
				element.style.display = 'none';
				displayQueue.push(element);
			});
			child.remove();
		} else {
			if (child && child.className !== 'cursor') {
				displayQueue.push(child);
				child.style.display = 'none';
			}
		}
	});

	var interval = setInterval(function () {
		var element = displayQueue.shift();
		if (element) {
			element.style.display = '';
		} else {
			clearInterval(interval);
		}
	}, 50);

	terminal.className = terminal.className.replace('invisible', '');
}());
