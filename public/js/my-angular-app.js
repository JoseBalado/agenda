var app = angular.module("MyApp", []);

app.controller("MyCtrl", function($scope, $http) {

  var fetchData = function() { $http.get("data")
    .success(function(data) {
      $scope.actividades = data;
    })
    .error(function(data, status, headers, config) {
      $scope.actividades = [
        {"nombre": "Error, no hay comunicación con el servidor"}
      ]
    });
  };

  fetchData();

  $scope.show = function(id) {
    $scope.actividades.forEach(function(actividad, index, array) {
        if ( actividad['_id'] == id) {
          $scope.acto = actividad;
        }
    });
  };

  /* Apuntarse modificando el array en Angular
  $scope.apuntarse = function(id) {
    $http.get("/user").success(function(usuario) {
      console.log(usuario + " te has apuntado a la actividad: " + id);
      $scope.actividades.forEach(function(actividad, index, array) {
        if (actividad['_id'] == id) {
         console.log($scope.actividades[index].genteAnotada.push(usuario.username));
        }
      });
    }).error(function(data, status, headers, config) {
       console.log('Error, no hay comunicación con el servidor'); 
    });
  };

  */

  $scope.apuntarse = function(id) {
    $http.put("/user/addtoactivity/" + id)
      .success(function() {
        console.log('Te has apuntado a la actividad');
        fetchData(); // Load again the activities.
        $scope.acto = []; // Provisional solution for showing correctly
                          //  the info about people added to activity.
        //$scope.show(id);
        //$scope.acto.genteAnotada = "Te has anotado a la actividad";
      })
      .error(function(data, status, headers, config) {
         console.log('Error $http.put, status=' + status); 
    });
  };

  $scope.borrarse = function(id) {
    $http.put("/user/removefromactivity/" + id)
      .success(function() {
        console.log('Te has borrado de la actividad');
        fetchData();
        $scope.acto = [];
      })
      .error(function(data, status, headers, config) {
        console.log('Error $http.put, status=' + status);
      });
  };
  
});
