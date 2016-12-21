var Seat = function (options){
	//console.log($scope)
	var settings = $.extend({
		radius: 15,
        color: "red",
        icon: false,
	  	stroke: 'black',
	  	strokeWidth: 2
    }, options );

    this.circle = new Konva.Circle({
	  x:  settings.radius * 2 * settings.x,
	  y:  settings.radius * 2 * settings.y,
	  radius: settings.radius,
	  fill: settings.color,
	  stroke: settings.stroke,
	  strokeWidth: settings.strokeWidth
	});
		//console.log(this.circle)
	return this.circle;
}

/*var Seat = {
	init: function(i, j, seat){
		var circle = new Konva.Circle({
		  x: j * 80,
		  y: i * 80,
		  radius: 40,
		  fill: seat.color,
		  stroke: 'black',
		  strokeWidth: 5
		});

		var txt = new Konva.Text({
		  text: 'A',
		  fontSize: 50,
		  lineHeight: 1.2,
		  padding: 10,
		  fill: 'green'
		 });
		circle.add(txt);
		return circle;
	}	
};*/