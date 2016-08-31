'use strict';


describe('Status display', function () {

  var $compile, $rootScope;

  beforeEach(angular.mock.module('zucchini-ui-frontend'));

  beforeEach(angular.mock.inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should display success status', function () {

    $rootScope.status = 'PASSED';

    var element = $compile('<tc-status status="status"></tc-status>')($rootScope);
    $rootScope.$digest();

    expect(element.text()).toContain('Succès');
    expect(element.find('span').attr('class')).toContain('label-success');
  });

  it('should display failed status', function () {

    $rootScope.status = 'FAILED';

    var element = $compile('<tc-status status="status"></tc-status>')($rootScope);
    $rootScope.$digest();

    expect(element.text()).toContain('Échec');
    expect(element.find('span').attr('class')).toContain('label-danger');
  });

  it('should display unknown status as warning', function () {

    $rootScope.status = 'ZZZ';

    var element = $compile('<tc-status status="status"></tc-status>')($rootScope);
    $rootScope.$digest();

    expect(element.text()).toContain($rootScope.status);
    expect(element.find('span').attr('class')).toContain('label-warn');
  });

});
