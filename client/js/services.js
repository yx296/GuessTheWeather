angular.module('weather.services', [])

.factory('openWeather', function($http) {
  
  var Users = {
    findAll: function () {
      return $http.get('/users').then(function(response) {
        return response.data;
      });
    },
    create: function (newUser) {
      return $http.post('/users', newUser);
    },
    findById: function (id) {
      return $http.get('/users/' + id).then(function(response) {
        return response.data;
      })
    }
  };

  return Users;
})
