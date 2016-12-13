var Iconn = function (options, parent){
	var settings = $.extend({
		x: 200,
	    y: 150,
        url: false,
	  	width: 60,
	    height: 60,
	    draggable: false
    }, options );

	this.icon = new Image();

	this.icon.onload = function() {
		var img = drawImage(this);
		var grp = boundRectangle(img);

		parent.layer.add(grp);
		parent.stage.add(parent.layer);
	};

	this.icon.src = settings.url;

	function drawImage(imageObj){
		var image = new Konva.Image({
		    x: settings.x,
		    y: settings.y,
		    image: imageObj,
		    width: settings.width,
		    height: settings.height
	  	});
        return image;
	}

	function boundRectangle(imageObj){
		var group = new Konva.Group({
	        x: imageObj.position().x,
	        y: imageObj.position().y,
	        draggable: settings.draggable
	    });

        group.add(imageObj);

	    var box = new Konva.Rect({
            x: imageObj.position().x,
            y: imageObj.position().y,
            width: imageObj.width(),
            height: imageObj.height(),
            stroke: 'black',
            strokeWidth: 2,
        });

        group.add(box);
        var dia = box.getClientRect();console.log(dia)
		//box.setAttrs(dia);
		//console.log(group.getClientRect())

        addAnchor(group, dia.x, dia.y, 'topLeft');
	    addAnchor(group, dia.x + dia.width, dia.y, 'topRight');
	    addAnchor(group, dia.x, dia.y + dia.height, 'bottomRight');
	    addAnchor(group, dia.x + dia.width, dia.y + dia.height, 'bottomLeft');
	    
	    group.on('mouseover', function() {
            if(settings.draggable === true) document.body.style.cursor = 'move';
        });

        group.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });

        return group;
	}

	function addAnchor(group, x, y, name) {
        var anchor = new Konva.Circle({
            x: x,
            y: y,
            stroke: '#666',
            fill: '#ddd',
            strokeWidth: 2,
            radius: 8,
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
        var group = activeAnchor.getParent();

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
        }
    }
}