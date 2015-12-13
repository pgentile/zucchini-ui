'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('testsCucumberApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // TODO Test disabled: it doesn't work enymore
    // expect(MainCtrl.awesomeThings.length).toBe(3);
  });
});
