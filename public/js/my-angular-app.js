var app = angular.module("MyApp", []);

app.controller("MyCtrl", function($scope, $http) {
  $http.get("data/productData.json").success(function(data) {
    $scope.actividades = data;
  }).error(function(data, status, headers, config) {
    $scope.actividades = [{
      "nombre": "Error, no hay comunicación con el servidor"
      }]
  });

  $scope.show = function(id) {
    $scope.actividades.forEach(function(actividad, index, array) {
        if ( actividad['_id'] == id) {
          $scope.acto = actividad;
        }
    });
  };

  $scope.apuntarse = function(id) {
    $http.get("/user").success(function(usuario) {
      console.log(usuario + " te has apuntado a la actividad: " + id);
      $scope.actividades.forEach(function(actividad, index, array) {
        if ( actividad['_id'] == id) {
         console.log( $scope.actividades[index].genteAnotada.push(usuario.username));
        }
      });
    }).error(function(data, status, headers, config) {
       console.log('Error, no hay comunicación con el servidor'); 
    });
  };

  $scope.borrarse = function(id) {
    console.log("Te has borrado de la actividad");
  };
  
});
