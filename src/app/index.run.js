(function() {
  'use strict';

  angular.module('rampup')
         .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $tasks) {
    
    $log.debug('runBlock end');
  }

})();
