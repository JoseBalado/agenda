describe("MyCtrl Test", function () {
 
  // Arrange
  var mockScope, controller, backend;
   
  beforeEach(angular.mock.module("MyApp"));
   
  beforeEach(angular.mock.inject(function ($httpBackend) {
    backend = $httpBackend;
    backend.expect("GET", "data").respond(
    [{ "_id": "999777", "nombre": "Nueva cita", "fecha": "2015-01-01", "hora": "8:20", "Lugar": "Local", "genteAnotada": "John" }
    ]);
  }));
   
  beforeEach(angular.mock.inject(function ($controller, $rootScope, $http) {
    mockScope = $rootScope.$new();
    $controller("MyCtrl", {
      $scope: mockScope,
      $http: $http
    });
    backend.flush();
  }));

  it("Makes an Ajax request", function () {
    backend.verifyNoOutstandingExpectation();
  });

  it("Fetches data", function () {
    var data = fetchData();
    expect(data).to.exist;
  });

});
