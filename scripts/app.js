
"use strict";

var groups = [{
		"rows": 2,
		"cols": 2,
		"seats": [[{
			"color":"red",
			"label": "A",
			"icon": ""
		}, {
			"color":"yellow",
			"label": "B",
			"icon": ""
		}],[{
			"color":"yellow",
			"label": "B",
			"icon": ""
		}, {
			"color":"yellow",
			"label": "B",
			"icon": ""
		}]]
	},
	{
		"rows": 1,
		"cols": 2,
		"seats": [[{
			"color":"black",
			"label": "A",
			"icon": ""
		}],[{
			"color":"green",
			"label": "B",
			"icon": ""
		}]]
	}];

var App = {
	stage:null,
	layer:null,
	allgroups:[],

	//var self = this;

  	init: function init() { 
  		var self = this;
	    console.log('App initialized.');
	    var width = $('.canvas-wrap').width();
	    var height = 450;
	    
	    this.stage = new Konva.Stage({
	      container: 'seatmap-canvas',
	      width: width,
	      height: height
	    });

	    this.layer = new Konva.Layer();

	    var selectionRect = new Konva.Rect({
	    	stroke:'green',
	    	strokeWidth: 2,
	    	dash:[10, 5],
	    	visible: false,
			listening: false
	    });

	    this.layer.add(selectionRect);

	    groups.forEach(function(grp) {
			var grps = new SeatGroup(grp);
			var group = grps.drawGroup();

			group.on('mouseover', function(evt) {
		    	var shape = evt.target;
		        document.body.style.cursor = 'move';
		    });

		    group.on('mouseout', function(evt) {
		    	var shape = evt.target;
		        document.body.style.cursor = 'default';
		    });

		    group.on('click', function(evt) {
		    	if(this.isSelected) return;
		    	self.layer.find('Group').each(function(el, index) {
		    		el.isSelected = false;
		    		el.opacity(0.5);	
		    		el.scale({ x: 1, y: 1});	
		    	});
		    	this.isSelected = !this.isSelected;
				selectionRect.visible(this.isSelected);
				this.opacity(1);
    			this.scale({ x: 1.2, y: 1.2});
				selectionRect.setAttrs(this.getClientRect());
				self.layer.draw();
		    });

		    /*group.on('dragstart', function(item) {
		        selectionRect.setAttrs(item.target.getClientRect());
				self.layer.draw();
		    });*/

		    group.on('dragend', function(item) {
		    	var currentItem = item.target;
		    	if(currentItem.isSelected){
			        selectionRect.setAttrs(currentItem.getClientRect());
					self.layer.draw();
				}
		    });

		    App.allgroups.push(group);
			self.layer.add(group);
	    });   
		this.stage.add(this.layer);
  	}
};

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    App.init();

	//new Seat('',$scope);
    $scope.rows = 2;
    $scope.cols = 2;
});


$(function(){
  $('.section').on('click', function() {
    var rows = $('.rows').val();
    var cols = $('.cols').val();
    var obj = {
      "rows" : rows,
      "cols" : cols,
      "seats" : {}
    };
    groups.push(obj);
    //console.log(groups);
  });
});
