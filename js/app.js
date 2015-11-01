//app.js
angular.module('WeatherApp', [])
.controller('WeatherController', function($scope, $http, $q){
  $scope.Weather = [];
  $scope.description = [];
  $scope.mapShow = false;
  $scope.roundOver = false;
  $scope.currentScore = 0;
  $scope.highScore = 0;
  $scope.coordOne = {};
  $scope.coordTwo = {};
  $scope.distance;
  $scope.rounds = 1;
  $scope.gameMsg = "Try Again";

  $scope.addWeather = function(keyEvent) {
    if (keyEvent.which === 13) {
      
      $scope.mapShow = true;

      var cityName1 = $scope.newWeatherEntry1;
      var cityName2 = $scope.newWeatherEntry2;

      var promise1 = $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName1 + '&APPID=693b2826cea96ecff31ad27e7dd55247')
        .then(function(response) {

          $scope.coordOne.lat = response.data.coord.lat; 
          $scope.coordOne.lng = response.data.coord.lon;
          console.log(response.data);
          var weatherDescription1 = response.data.weather[0].description;
          var name = response.data.name;
          $scope.Weather.push("The weather in " + cityName1 + ": " + weatherDescription1);
          $scope.description.push(weatherDescription1); 
        });

      var promise2 = $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName2 + '&APPID=693b2826cea96ecff31ad27e7dd55247')
        .then(function(response) {

          $scope.coordTwo.lat = response.data.coord.lat; 
          $scope.coordTwo.lng = response.data.coord.lon;

          var weatherDescription2 = response.data.weather[0].description;
          var name = response.data.name;
          $scope.Weather.push("The weather in " + cityName2 + ": " + weatherDescription2);
          $scope.description.push(weatherDescription2);
        });

      $q.all([promise1, promise2]).then(function(){
        $scope.checkWeather($scope.description, cityName1, cityName2);
      });    
    }
  };

  $scope.checkWeather = function(descriptionArray, city1, city2) {
    $scope.newWeatherEntry1 = '';
    $scope.newWeatherEntry2 = '';

    var $scopeLoc1 = new google.maps.LatLng($scope.coordOne.lat, $scope.coordOne.lng);
    var $scopeLoc2 = new google.maps.LatLng($scope.coordTwo.lat, $scope.coordTwo.lng);

    var distanceInKm = google.maps.geometry.spherical.computeDistanceBetween($scopeLoc1, $scopeLoc2)/1000;
    // console.log(distanceInKm.toFixed(2));
    $scope.distance = distanceInKm.toFixed(2);

    $scope.roundOver = true;
      // console.log(descriptionArray);
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
    $scope.Weather = [];
    $scope.description = [];
    $scope.result = '';
    $scope.mapShow = false;
    $scope.roundOver = false;
    $scope.gameMsg = "Try Again";
  };
});









