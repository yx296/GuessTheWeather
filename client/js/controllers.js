angular.module('weather.controller', [])
.controller('WeatherController', function($scope, $q, openWeatherAPI){
  
  $scope.weather = [];
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

      var weatherPromise1 = getWeatherPromise(cityName1, coordOne);
      var weatherPromise2 = getWeatherPromise(cityName2, coordTwo);

      //waits for both promises to be done before comparing the weather of both cities
      $q.all([weatherPromise1, weatherPromise2]).then(function(){
        checkWeather(weatherDescriptions, cityName1, cityName2);
      });    
    }
  };

  function getWeatherPromise(city, coordObj) {
    return openWeatherAPI.getWeatherForCity(city).then(function(data) {
      coordObj.lat = data.coord.lat; 
      coordObj.lng = data.coord.lon;
      var weatherDescription1 = data.weather[0].description;
      storeWeatherDescription(weatherDescription1, city);
    })
  }


  function storeWeatherDescription(weatherDescription, city) {
    $scope.weather.push("The weather in " + city + ": " + weatherDescription);
    weatherDescriptions.push(weatherDescription); 
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
      $scope.result = "You lose, lol";
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
    $scope.rounds === 4 ? $scope.rounds = 1 : $scope.rounds++;
    $scope.weather = [];
    $scope.result = '';
    $scope.distance = '';
    $scope.mapShow = true;
    $scope.roundOver = false;
    $scope.gameMsg = "Try Again";
    weatherDescriptions = [];
  };
});









