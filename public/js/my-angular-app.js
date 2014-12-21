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

  $scope.show = function(id) {
    $scope.actividades.forEach(function(actividad, index, array) {
        if ( actividad['_id'] == id) {
        console.log('id=' + id + ', actividad: ' + actividad['_id'] +', index: ' + index + ', array: ' + array);
        $scope.acto = actividad;
        }

    });
    console.log('Show clickeado: ' + $scope.acto);
  };

});
