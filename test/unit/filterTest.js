describe("Filter Test", function () {

  var filerInstance;

  beforeEach(angular.mock.module("MyApp"));
   
  beforeEach(angular.mock.inject(function ($filter) {
    filterInstance = $filter("trimHourString");
  }));

  it("Removes a character at the beginning and at the end of the string.", function() {
    var result = filterInstance("\"test\"");
    expect(result).to.equal("test");
  });

}); 
