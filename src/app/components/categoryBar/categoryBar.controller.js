(function() {
  'use strict';

  angular.module('rampup')
         .controller('CategoryBarController', CategoryBarController);

  /** @ngInject */
  function CategoryBarController($location, $tasks) {
    var vm = this;

    vm.factory = $tasks;

    vm.selectCategory = selectCategory;

    function selectCategory(categoryIndex) {
      vm.factory.setCategoryActive(vm.factory.categories[categoryIndex]);
    }
  }

})();
