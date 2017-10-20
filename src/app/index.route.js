(function() {
  'use strict';

  angular
    .module('rampup')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', { template: 'Select task to view resolution' })
      .when('/category/:category', {})
      .when('/category/:category/task/:task', {})
      .otherwise({ redirectTo: '/' });
  }

})();
