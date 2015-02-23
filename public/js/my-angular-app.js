var app = angular.module("MyApp", ['ui.bootstrap']);

// Compartir datos entre los controladores del panel actividad y del panel navegación
app.factory('sharedId', function($rootScope) {
  var _id = null;

  return {
    get: function() {
     return _id;
    },
    set: function(id) {
      _id = id;
      $rootScope.$broadcast("idUpdated");
    }
  };
});


// Controlador del panel Actividades
app.controller("MyCtrl", function($scope, $http, sharedId) {

  // Leer actividades desde Mongo
  var fetchData = function() { $http.get("data")
    .success(function(data) {
      $scope.actividades = data;
    })
    .error(function(data, status, headers, config) {
      $scope.actividades = [
        {"nombre": "conectando con el servidor..."}
      ]
    });
  };

  // Refresco necesario para actualizar las actividades y mostrarlas
  fetchData();

  // Mostrar en el panel detalles la actividad seleccionada en actividades.
  $scope.show = function(id) {
    // Activar y configurar la selección de "Eliminar actividad"
    // en el panel
    sharedId.set(id);

    // Monstar la actividad
    $scope.actividades.forEach(function(actividad, index, array) {
        if ( actividad['_id'] == id) {
          $scope.acto = actividad;
        }
    });
  };


  // Usuario logueado se apunta a la actividad
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

  // Usuario logueado se borra de la actividad
  $scope.borrarse = function(id) {
    $http.delete("/user/removefromactivity/" + id)
      .success(function() {
        console.log('Te has borrado de la actividad');
        fetchData();
        $scope.acto = [];
      })
      .error(function(data, status, headers, config) {
        console.log('Error $http.put, status = ' + status);
      });
  };
  
});


// Controlador para el panel de navegación: "Inicio Nueva actividad Eliminar...
app.controller("NavCtrl", function($scope, $http, sharedId) {

  // Eliminar la actividad seleccionada en el panel 'Actividades'
  $scope.eliminar = function() {
    var id = sharedId.get();
    console.log("Eliminado " + id);
    $http.delete("/activity/delete/" + id)
      .success(function() {
        console.log('Se ha eliminado la actividad');
      })
      .error(function(data, status, headers, config) {
        console.log('Error $http.delete, status = ' + status);
      });
  };


    $scope.$on('idUpdated', function() {
      $scope.id = sharedId.get();
    });

});


// Filters

// trimHourString removes one double quote at the end
// and another at the start so the filter date can
// get the hour and minutes.
// The format recived it this: ""2015-01-10T02:25:28.000Z""
// and it is not suitable for the date filter.
app.filter("trimHourString", function() {
  return function(input) {
    input = input || ""; // Without this line input will never
                        // receive any value
    console.log(input);
    return input.slice(1,-1);
  };
});
