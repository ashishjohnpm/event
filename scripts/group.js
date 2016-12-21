function SeatGroup(options){
	var rows = 0;
	var cols = 0;
	//this.options = options;
	this.group = null;	
    var self = this;
    this.isSelected = false;

    var defaults = {
    	rows: 0,
    	cols:0,
    	rotation:0,
    	opacity: 0.5, 
    	draggable: true
    };

    var settings = $.extend({}, defaults, options);

	this.drawGroup = function(){console.log(Math.floor(Math.random() * 3) + 1)
		this.group = new Konva.Group({
	        x: 60 * Math.floor(Math.random() * 12) + 1 ,
	        y: 100 * Math.floor(Math.random() * 4) + 1 ,
	        rotation: settings.rotation,
	        draggable: settings.draggable,
	        opacity: settings.opacity
	    });
	    this.group.offsetX(this.group.width() / 2);
		this.group.offsetY(this.group.height() / 2);

	    settings['seats'].forEach(function(seats, i) {
	    	self.rows = i + 1;
	    	seats.forEach(function(seat, j){
	    		self.cols = j + 1;
	    		//console.log(self.group)
	    		var circle = new Seat({
		      		x:i,
		      		y:j,
		      		color:seat.color
		      	});
		      	self.group.isSelected = false;
				self.group.name('circle-' + i + '-' + j);
				self.group.add(circle);
	    	});
	    });	    

	    return this.group;
	}

	this.onClick  = function(x){
		//console.log(x)
		this.group.on('click', function(evt) {
			x(self, evt);
		});
	}

	this.onDragEnd  = function(x){
		this.group.on('dragend', function(evt) {
			x(evt, this, self);
		});
	}

	this.getRows = function(){
		return this.rows;
	}

	this.getCols = function(){
		return this.cols;
	}
}