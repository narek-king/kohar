'use strict';

describe('kohar.version module', function() {
  beforeEach(module('kohar.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
