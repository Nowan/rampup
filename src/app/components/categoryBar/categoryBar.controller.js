(function() {
  'use strict';

  angular
    .module('rampup')
    .controller('CategoryBarController', CategoryBarController);

  /** @ngInject */
  function CategoryBarController() {
    var vm = this;

    vm.selectedIndex = 0;
    vm.categories = [
      "Data Structures",
      "Sorting",
      "Traversing",
      "Common Operations",
      "Design Patterns",
      "Excercises"
    ];

    vm.selectCategory = selectCategory;

    function selectCategory(categoryIndex) {
      if (vm.selectedIndex === categoryIndex) return;
      vm.selectedIndex = categoryIndex;
    }
  }

})();
