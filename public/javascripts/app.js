App = function(opts) {
	this.init = function() {
		alert('init');
	}
	this.init();
};

(function(){
	'use strict';

	var socket = io.connect('http://localhost');
	socket.on('connected', function(data){
		console.log(data.timestamp);
	});

	// Init the drawing area
	window.sketch = new Sketch({container: '#stage'});
})();