require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {

  'use strict';

  var API = {};
  API.customSelect = function() {
    $(".l-styled").each(function() {
      var wrapDiv = $('<div/>', {
              class: 'l-select'
          }),
          holderDiv = $('<span/>', {
              class: 'l-select__holder',
          }),
          selectedvalue = $(this).find('option:selected').text();
      $(this).wrap(wrapDiv).before(holderDiv);
      $(holderDiv).text(selectedvalue);      

      $('body').on('click', holderDiv, function() {
          $(this).next('select.l-styled').trigger('click');
      });

      $('body').on('change', 'select.l-styled', function() {
          var $this = $(this),
              selectedvalue = $this.find('option:selected').text(),
              span = $this.prev('span.l-select__holder');
          $(span).text(selectedvalue);
      });
    });
  };

  return API;
};

},{}],"main":[function(require,module,exports){
var common = require('./common')();
$(function() {
  common.customSelect();

  $('body').on('click', '.obj-submit', function() {
    var src = $('.object-icons li.active').find('img').attr('src');
    var icon = new Icon({
      url: src
    });
    App.layer.add(icon);
    console.log(icon)
  });

  $('.object-icons').on('click', 'li', function() {
    $('.object-icons li').removeClass('active');
    $(this).addClass('active');
  });

  $('.seatmap__nav ul li').on('click', 'a', function() {
      $(".groups-info").hide();
      $($(this).attr('href')).show();
      return false;
  });

});


},{"./common":1}]},{},["main"])