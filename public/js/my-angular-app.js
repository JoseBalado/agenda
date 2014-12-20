var app = angular.module("MyApp", []);

app.controller("MyCtrl", function($scope, $http) {
  $http.get("data/productData.json").success(function(data) {
    $scope.actividades = data;
  }).
  error(function(data, status, headers, config) {
    $scope.actividades = [
      {
      "nombre": "Error, no hay comunicación con el servidor"
      }
    ]
  });

});
