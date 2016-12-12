var Icon = function (options){

	var settings = $.extend({
		x: 200,
	    y: 50,
        url: false,
	  	width: 60,
	    height: 60
    }, options );

	this.icon = new Image();

	this.icon.onload = function() {
	  var image = new Konva.Image({
	    x: settings.x,
	    y: settings.y,
	    image: this.icon,
	    width: settings.width,
	    height: settings.height
	  });
	};
	this.icon.src = settings.url;

	return this.icon;
}