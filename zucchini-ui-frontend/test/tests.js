'use strict';

require('angular');
require('angular-mocks');
var testsContext = require.context('../app/scripts', true, /.js$/);
testsContext.keys().forEach(testsContext);

testsContext = require.context('./spec', true, /.js$/);
testsContext.keys().forEach(testsContext);
