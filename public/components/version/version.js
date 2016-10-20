'use strict';

angular.module('kohar.version', [
  'kohar.version.interpolate-filter',
  'kohar.version.version-directive'
])

.value('version', '0.1');
