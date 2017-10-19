(function() {
  'use strict';

  angular
    .module('rampup')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', { template: 'Select task to view resolution' })
      .otherwise({ redirectTo: '/' });
  }

})();