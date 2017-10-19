(function() {
  'use strict';

  angular
    .module('rampup')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', { template: 'Select task to view resolution' })
      .when('/category/:category', { template: '' })
      .when('/category/:category/task/:task', { template: '' })
      .otherwise({ redirectTo: '/' });
  }

})();
