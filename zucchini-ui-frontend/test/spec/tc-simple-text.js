'use strict';

describe('Simple text display', function () {

  var $compile, $rootScope;

  beforeEach(module('zucchini-ui-frontend'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should display only text if it has no link', function () {

    $rootScope.text = 'Texte sans lien.';

    var element = $compile('<tc-simple-text content="text"></tc-simple-text>')($rootScope);
    $rootScope.$digest();

    expect(element.text()).toContain($rootScope.text);
  });

  it('should display text with lines', function () {

    var line1 = 'Line 1';
    var line2 = 'Line 2';
    $rootScope.text = line1 + '\n' + line2;

    var element = $compile('<tc-simple-text content="text"></tc-simple-text>')($rootScope);
    $rootScope.$digest();

    expect(element.text()).toContain(line1);
    expect(element.find('br')).toBeDefined();
    expect(element.text()).toContain(line2);
  });

  /*
  // There's a but with PhantomJS. No problem with other browsers...
  it('should display link with HTML anchors', function () {

    var url = 'https://example.org?toto=tutu&titi=toto#!link';
    $rootScope.text = 'Hello. Please see ' + url + '. It\'s great';

    var element = $compile('<tc-simple-text content="text"></tc-simple-text>')($rootScope);
    $rootScope.$digest();

    expect(element.text()).toContain('Hello. Please see ');
    expect(element.find('a').attr('href')).toEqual(url);
    expect(element.text()).toContain('. It\'s great');
  });
  */

});
