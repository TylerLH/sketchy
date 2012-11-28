Sketch = function(opts) {
	this.el = document.querySelector(opts.container);
	this.cache = {};
	this.cache.canvas = document.createElement('canvas');
	this.cache.ctx = this.cache.canvas.getContext('2d');
	this.ctx	   = this.el.getContext('2d');
	this.mouseX = new Array;
	this.mouseY = new Array;
	this.colors = new Array;
	this.isDrawing = false;
	this.newPath = true;
	this.lastX;
	this.lastY;
	this.events = {
		'mousedown' : 'startDrawing',
		'mouseup'	: 'stopDrawing',
		'mouseout': 'stopDrawing',
		'mousemove' : 'addPoint'
	}
	/*
	 * attachEvents - Parses the events hash and binds callbacks
	 */
	this.attachEvents = function() {
		self = this;
		this.el.oncontextmenu = function() {
			return false;
		}
		Object.keys(this.events).forEach(function(e){
			self.el.addEventListener(e, self[self.events[e]].bind(self));
		});
	}
	/*
	 * startDrawing - toggles drawing state to true
	 */
	this.startDrawing = function(e) {
		this.isDrawing = true;
		this.addPoint(e);
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
		e.preventDefault();
		e.stopPropagation();
		var rect = this.el.getBoundingClientRect();
		if(this.isDrawing){
			x = e.clientX - rect.left;
			y = e.clientY - rect.top;
			this.mouseX.push(x);
			this.mouseY.push(y);
			ctx = this.ctx;
			ctx.strokeStyle = '#df4b26';
			ctx.lineJoin = 'round';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(x-1, y);
			ctx.lineTo(x, y);
			ctx.closePath();
			ctx.stroke();
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
		ctx.lineWidth = 15;
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
 		this.el.width = document.width * 0.8;
 		this.el.height = document.height;
		this.attachEvents();
	}
	this.init();
};