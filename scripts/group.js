function SeatGroup(options){
	this.rows = 0;
	this.cols = 0;
	this.options = options;
	this.seat_group = null;	
    var self = this;
    this.isSelected = false;

	this.drawGroup = function(){
		this.seat_group = new Konva.Group({
	        x: 120,
	        y: 40,
	        draggable: true,
	        opacity: 0.5
	    });

	    this.options['seats'].forEach(function(seats, i) {
	    	seats.forEach(function(seat, j){
	    		//console.log(self.seat_group)
	    		var circle = new Seat({
		      		x:i,
		      		y:j,
		      		color:seat.color
		      	});
		      	self.seat_group.isSelected = false;
				self.seat_group.name('circle-'+i+'-'+j);
				self.seat_group.add(circle);
	    	});
	    });	    

	    return this.seat_group;
	}
}