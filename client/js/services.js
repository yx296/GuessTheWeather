angular.module('weather.services', [])

.factory('openWeatherAPI', function($http) {
  
  var openWeatherAPI = {};

  openWeatherAPI.getWeatherForCity = function (city) {
    return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=693b2826cea96ecff31ad27e7dd55247')
      .then(function(response) {
        return response.data;
      });   
  }
  

  return openWeatherAPI;
})
