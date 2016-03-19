'use strict';

describe('Shared', function () {

  var $compile, $rootScope;

  beforeEach(module('testsCucumberApp'));
  beforeEach(module('testsCucumberApp.templates'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should display success status', function () {

    $rootScope.status = 'PASSED';

    var element = $compile('<tc-status status="status"></tc-status>')($rootScope);
    $rootScope.$digest();

    expect(element.text()).toContain('Succès');
  });

});
