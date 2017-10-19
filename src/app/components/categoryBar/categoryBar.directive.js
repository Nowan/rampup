(function() {
  'use strict';

  angular
    .module('rampup')
    .directive('categoryBar', CategoryBar);

  /** @ngInject */
  function CategoryBar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/categoryBar/categoryBar.html',
      controller: 'CategoryBarController',
      controllerAs: 'catBarCtrl',
      bindToController: true
    };
  }

})();
