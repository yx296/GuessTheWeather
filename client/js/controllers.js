angular.module('weather.controller', [])
.controller('WeatherController', function($scope, $q, openWeatherAPI){
  
  $scope.Weather = [];
  $scope.mapShow = true;
  $scope.roundOver = false;
  $scope.currentScore = 0;
  $scope.highScore = 0;
  
  var weatherDescriptions = [];
  var coordOne = {};
  var coordTwo = {};
  
  $scope.distance;
  $scope.rounds = 1;
  $scope.gameMsg = "Try Again";

  $scope.addWeather = function(keyEvent) {
    if (keyEvent.which === 13) {
      
      $scope.mapShow = false;

      var cityName1 = $scope.newWeatherEntry1;
      var cityName2 = $scope.newWeatherEntry2;

      var weatherPromise1 = openWeatherAPI.getWeatherForCity(cityName1).then(function(data) {
        coordOne.lat = data.coord.lat; 
        coordOne.lng = data.coord.lon;
        var weatherDescription1 = data.weather[0].description;
        $scope.Weather.push("The weather in " + cityName1 + ": " + weatherDescription1);
        weatherDescriptions.push(weatherDescription1); 
      })

      var weatherPromise2 = openWeatherAPI.getWeatherForCity(cityName2).then(function(data) {
        coordTwo.lat = data.coord.lat; 
        coordTwo.lng = data.coord.lon;

        var weatherDescription2 = data.weather[0].description;
        $scope.Weather.push("The weather in " + cityName2 + ": " + weatherDescription2);
        weatherDescriptions.push(weatherDescription2);
      })

      //waits for both promises to be done before comparing the weather of both cities
      $q.all([weatherPromise1, weatherPromise2]).then(function(){
        checkWeather(weatherDescriptions, cityName1, cityName2);
      });    
    }
  };

  function checkWeather(descriptionArray, city1, city2) {
    $scope.newWeatherEntry1 = '';
    $scope.newWeatherEntry2 = '';

    var $scopeLoc1 = new google.maps.LatLng(coordOne.lat, coordOne.lng);
    var $scopeLoc2 = new google.maps.LatLng(coordTwo.lat, coordTwo.lng);

    var distanceInKm = google.maps.geometry.spherical.computeDistanceBetween($scopeLoc1, $scopeLoc2)/1000;

    $scope.distance = distanceInKm.toFixed(2);

    $scope.roundOver = true;
    if (city1 === city2) {
      $scope.result = "You lose, cheater";
      $scope.currentScore -=5000;
    } else if (descriptionArray[0].toLowerCase() === descriptionArray[1].toLowerCase()) {
      $scope.result = "You win this round";
      $scope.currentScore += 1 * $scope.distance;
    } else {
      $scope.result = "You lose this round";
    }
  
    if ($scope.rounds === 4) {
      $scope.gameMsg = "Game Over. New Game?";
      if ($scope.currentScore > $scope.highScore) {
        $scope.highScore = $scope.currentScore.toFixed(2);
      }
      $scope.currentScore = 0;
    }

  };

  $scope.resetWeather = function() {
    if ($scope.rounds === 4) {
      $scope.rounds = 1;
    } else {
      $scope.rounds++;
    }
    weatherDescriptions = [];
    $scope.Weather = [];
    $scope.result = '';
    $scope.distance = '';
    $scope.mapShow = true;
    $scope.roundOver = false;
    $scope.gameMsg = "Try Again";
  };
});









