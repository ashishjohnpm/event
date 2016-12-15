var Iconn = function (options, parent){
	var settings = $.extend({
		x: 200,
	    y: 150,
        url: false,
	  	width: 60,
	    height: 60,
	    draggable: false
    }, options );

    var group = new Konva.Group({
			        draggable: settings.draggable
			    });

	this.icon = new Image();

	this.icon.onload = function() {
		var img = drawImage(this);
		var grp = boundRectangle(img);
		parent.layer.add(group);
		parent.stage.add(parent.layer);
	};

	this.icon.src = settings.url;

	this.onClick = function(callback){
		group.on('click', function(evt) {
			callback(evt);
		});
	};

	function drawImage(imageObj){
		var image = new Konva.Image({
		    x: settings.x,
		    y: settings.y,
		    image: imageObj,
		    width: settings.width,
		    height: settings.height
	  	});
        group.setAttrs({'x' : image.getAttr('x')}, {'y' : image.getAttr('y')});
        group.add(image);
        return image;
	}

	function boundRectangle(imageObj){
        var text = new Konva.Text({
		  //x: box.getWidth()/2,
		  x: imageObj.getAttr('x'),
		  y: imageObj.getAttr('y') + imageObj.height(),
		  text: settings.label,
		  fontSize: 20,
		  fontFamily: 'Calibri',
		  fill: 'green'
		});
        group.add(text);

	    var box = new Konva.Rect({
            x: imageObj.getAttr('x'),
		 	y: imageObj.getAttr('y'),
            stroke: 'red',
            strokeWidth: 1,
        });

        var dia = group.getClientRect();
		box.width(dia.width);
		box.height(dia.height);

		/*text.setOffset({
	      x: text.getWidth()  / 2 
	    });*/

        group.add(text);
        group.add(box);
        var dia = box.getClientRect();
		//box.setAttrs(dia);
		//console.log(group.getClientRect())

        addAnchor(group, dia.x, dia.y, 'topLeft');
	    addAnchor(group, dia.x + dia.width, dia.y, 'topRight');
	    addAnchor(group, dia.x + dia.width, dia.y + dia.height, 'bottomRight');
	    addAnchor(group, dia.x , dia.y + dia.height, 'bottomLeft');
	    
	    group.on('mouseover', function() {
            if(settings.draggable === true) document.body.style.cursor = 'move';
        });

        group.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
	}

	function addAnchor(group, x, y, name) {
        var anchor = new Konva.Circle({
            x: x,
            y: y,
            stroke: '#666',
            fill: 'red',
            strokeWidth: 1,
            radius: 5,
            name: name,
            draggable: true,
            dragOnTop: false
        });

        anchor.on('dragmove', function() {
            update(this);
            parent.layer.draw();
        });
        anchor.on('mousedown touchstart', function() {
            group.setDraggable(false);
            this.moveToTop();
        });
        anchor.on('dragend', function() {
            group.setDraggable(true);
            parent.layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'pointer';
            this.setStrokeWidth(4);
            layer.draw();
        });
        anchor.on('mouseout', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'default';
            this.setStrokeWidth(2);
            layer.draw();
        });

        group.add(anchor);
    }

    function update(activeAnchor) {
        //var group = activeAnchor.getParent();

        var topLeft = group.get('.topLeft')[0];
        var topRight = group.get('.topRight')[0];
        var bottomRight = group.get('.bottomRight')[0];
        var bottomLeft = group.get('.bottomLeft')[0];

        var rect = group.get('Rect')[0];
        var anchorX = activeAnchor.getX();
        var anchorY = activeAnchor.getY();
        // update anchor positions
        switch (activeAnchor.getName()) {
            case 'topLeft':
                topRight.setY(anchorY);
                bottomLeft.setX(anchorX);
                break;
            case 'topRight':
                topLeft.setY(anchorY);
                bottomRight.setX(anchorX);
                break;
            case 'bottomRight':
                bottomLeft.setY(anchorY);
                topRight.setX(anchorX);
                break;
            case 'bottomLeft':
                bottomRight.setY(anchorY);
                topLeft.setX(anchorX);
                break;
        }

        rect.position(topLeft.position());

        var width = topRight.getX() - topLeft.getX();
        var height = bottomLeft.getY() - topLeft.getY();
        if(width && height) {
            rect.width(width);
            rect.height(height);
            group.width(width);
            group.height(height);
        }
    }
}