(function( window, angular, undefined ){  
  'use strict';
  angular.module('components')
  .controller('currentTimeCtrl', ['$window', '$element', function CurrentTimeCtrl($window, $element) {  
    var self = this;
    
    var layers = [];
    this.$onChanges = function (changesObj) {
    };    

    this.$onInit = function () {
      $element.text(formatDate(new Date()));
      setInterval(updateTime, timeRefresh);
    }
    function updateTime() {
      $element.text(formatDate(new Date()));
    }
  }])
  .component('currentTime',{
    controller: 'currentTimeCtrl'
  });
}( window,angular));