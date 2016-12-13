
"use strict";

var groups = [{
		"rows": 2,
		"cols": 2,
		"rotation": 45,
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
		"draggable": true,
		"rotation": 60,
		"seats": [[{
			"color":"black",
			"label": "A",
			"icon": ""
		}],[{
			"color":"green",
			"label": "B",
			"icon": ""
		}]]
	}
	];
var icons = [
	{
		"id":"food",
		"url":"icons/food.png",
		"label" : "Food",
		"x" : 100,
		"y" : 100,
		"draggable" : true
	},
	{
		"id":"stage",
		"url":"icons/stage.png",
		"label" : "Stage",
		"x" : 250,
		"y" : 100,
		"draggable" : false
	},
];
var templateVars = null;

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

	    const selectionRect = new Konva.Rect({
	    	stroke:'green',
	    	strokeWidth: 2,
	    	dash:[10, 5],
	    	visible: false,
			listening: false
	    });

	    this.layer.add(selectionRect);

	    icons.forEach(function(icon) {
	    	var icon_item = new Iconn(icon, self);
			
	    });

	    groups.forEach(function(grp) {
			var grps = new SeatGroup(grp);
			var group = grps.drawGroup();

			grps.onClick(function(item, evt){
				//console.log(item, evt);
				if(item.isSelected) return;
				
				var $scope = getScope('myCtrl');
				$scope.selectionRect = selectionRect;
				$scope.rows = item.rows;
		    	$scope.cols = item.cols;
		    	$scope.activeGroup = item;
				$scope.$apply();

				App.allgroups.forEach(function(el){
					//console.log(el)
					el.isSelected = false;
		    		el.group.opacity(0.5);	
		    		el.group.scale({ x: 1, y: 1});
				});			    	
		    	
		    	/*self.layer.find('Group').each(function(el, index) {
		    		el.isSelected = false;
		    		el.opacity(0.5);	
		    		el.scale({ x: 1, y: 1});	
		    	});*/
		    	item.isSelected = !item.isSelected;
				selectionRect.visible(item.isSelected);
				item.group.opacity(1);
    			item.group.scale({ x: 1.2, y: 1.2});
    			var dia = item.group.getClientRect();
				selectionRect.setAttrs(dia);
				//$scope.selectionRect.offsetX( dia.width / 2 );
				//$scope.selectionRect.offsetY( dia.height / 2 );
				self.layer.draw();
			});

			grps.onDragEnd(function(evt, item, obj){
		    	if(obj.isSelected){
    				console.log(selectionRect.width(), 111)
    				
	    			var dia = obj.group.getClientRect();
					selectionRect.width(dia.width());
					selectionRect.height(dia.height());

					console.log(selectionRect.width(),dia.width / 2, 2222)
					selectionRect.offsetX( dia.width / 2 );
					selectionRect.offsetY( dia.height / 2 );
					obj.group.offsetX( dia.width / 2 );
					obj.group.offsetY( dia.height / 2 );
					self.layer.draw();
				}
			});

			group.on('mouseover', function(evt) {
		    	var shape = evt.target;
		        document.body.style.cursor = 'move';
		    });

		    group.on('mouseout', function(evt) {
		    	var shape = evt.target;
		        document.body.style.cursor = 'default';
		    });

		    /*group.on('dragend', function(item) {
		    	var currentItem = item.target;
		    	if(currentItem.isSelected){
			        selectionRect.setAttrs(currentItem.getClientRect());
					self.layer.draw();
				}
		    });

		    group.on('click', function(evt) {
		    	console.log(this)
		    	if(this.isSelected) return;

		    	var $scope = getScope('myCtrl');
		    	$scope.rows = 3;
		    	$scope.cols = 4;
				$scope.$apply();		    	
		    	
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
		    });*/

		    /*group.on('dragstart', function(item) {
		        selectionRect.setAttrs(item.target.getClientRect());
				self.layer.draw();
		    });*/		    

		    App.allgroups.push(grps);
			self.layer.add(group);
	    });   
		this.stage.add(this.layer);
  	}
};

var app = angular.module('myApp', ['rzModule']);
app.controller('myCtrl', function($scope) {
    App.init();
	//new Seat('',$scope);
    $scope.rows = 0;
    $scope.cols = 0;
    $scope.slider = {
    	rotation : 0,
	    options: {
	        floor: 0,
	        ceil: 360,
	        step: 10,
	        onChange: function(id, value) {
	        	var dia = $scope.activeGroup.group.getClientRect();
	        	//$scope.selectionRect.setAttrs(dia);
	        	//var w = $scope.selectionRect.width(dia.width);
	        	//var h = $scope.selectionRect.height(dia.height);
	        	console.log($scope.selectionRect.width())
	            //$scope.activeGroup.rotation = value;
	            $scope.activeGroup.group.rotation(value);

	            //$scope.selectionRect.offsetX( dia.width / 2 );
				//$scope.selectionRect.offsetY( dia.height / 2 );
	            $scope.selectionRect.rotation(value);
	            App.layer.draw();
	        },
	    }
    };
    $scope.activeGroup = null;
});

function getScope(ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
    return angular.element(sel).scope();
}

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
