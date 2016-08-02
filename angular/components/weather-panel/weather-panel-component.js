(function( window, angular, undefined ){  
  'use strict';
  angular.module('components')
  .controller('weatherPanelCtrl', ['$window', '$element', function WeatherPanelCtrl($window, $element) {  
    var self = this;
    
    var layers = [];
    this.$onChanges = function (changesObj) {
    };    

    this.$onInit = function () {
      updatePanel();
      setInterval(updatePanel, weatherRefresh);
    }

    function updatePanel(){
      var el = $element[0];
      var lat = self.lat;
      var lon = self.lon;

      getWeatherData(lat, lon, function success(data) {
        updatePanelData(el, data);
      }, function fail(err) {
        var bodyElement = el.getElementsByClassName('panel-body')[0];
        bodyElement.innerHTML = err;
      });   
    };

    function updatePanelData(el, data){
      var title = self.title;
      updateTitle(el, data, title);
      updateBody(el, data);
    };

  }])
  .component('weatherPanel',{
    controller: 'weatherPanelCtrl',
    templateUrl:'components/weather-panel/weather-panel.html',
    bindings:{
      lat: '<',
      lon: '<',
      title: '@'
    }
  });
}( window,angular));