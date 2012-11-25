Sketch = function(opts) {
	this.el = document.querySelector(opts.container);
	this.ctx	   = this.el.getContext('2d');
	this.mouseX = new Array;
	this.mouseY = new Array;
	this.colors = new Array;
	this.isDrawing = false;
	this.newPath = true;
	this.events = {
		'mousedown' : 'startDrawing',
		'mouseup'	: 'stopDrawing',
		'mousemove' : 'addPoint'
	}
	/*
	 * attachEvents - Parses the events hash and binds callbacks
	 */
	this.attachEvents = function() {
		self = this;
		Object.keys(this.events).forEach(function(e){
			self.el.addEventListener(e, self[self.events[e]].bind(self));
		});
	}
	/*
	 * startDrawing - toggles drawing state to true
	 */
	this.startDrawing = function(e) {
		this.isDrawing = true;
	}
	/*
	 * stopDrawing - toggles drawing state to false
	 */
	this.stopDrawing = function(e) {
		this.isDrawing = false;
		this.newPath = true;
	}
	/*
	 * addPoint - adds a new point to the canvas and joins the line if currently drawing
	 */
	this.addPoint = function(e) {
		var rect = this.el.getBoundingClientRect();
		if(this.isDrawing){
			this.mouseX.push(e.clientX - rect.left);
			this.mouseY.push(e.clientY - rect.top);
			this.redraw();
		}
	}
	/*
	 * redraw - redraws the sketch canvas
	 */
	this.redraw = function() {
		self = this;
		this.el.width = this.el.width;
		ctx = this.ctx;
		ctx.strokeStyle = '#df4b26';
		ctx.lineJoin = 'round';
		ctx.lineWidth = 5;
		ctx.beginPath();
		this.mouseX.forEach(function(val,key){
			if(self.newPath){
				ctx.moveTo(self.mouseX[key]-1, self.mouseY[key]);
			} else {
				ctx.moveTo(self.mouseX[key-1], self.mouseY[key-1]);
			}
			ctx.lineTo(val, self.mouseY[key]);
			ctx.closePath();
			ctx.stroke();
		});
	}
 	this.init = function() {
 		this.el.width = screen.width * 0.8;
 		this.el.height = screen.height * 0.6;
		this.attachEvents();
	}
	this.init();
};