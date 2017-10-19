(function() {
  'use strict';

  angular
    .module('rampup')
    .controller('CategoryBarController', CategoryBarController);

  /** @ngInject */
  function CategoryBarController($location) {
    var vm = this;

    vm.selectedIndex = 0;
    vm.categories = [
      { key: "data-structures", title: "Data Structures" },
      { key: "sorting", title: "Sorting" },
      { key: "traversing", title: "Traversing" },
      { key: "common-operations", title: "Common Operations" },
      { key: "design-patterns", title: "Design Patterns" },
      { key: "excercises", title: "Excercises" }
    ];

    vm.selectCategory = selectCategory;

    function selectCategory(categoryIndex) {
      if (vm.selectedIndex === categoryIndex) return;
      vm.selectedIndex = categoryIndex;
      $location.path('/category/' + vm.categories[categoryIndex].key);
    }
  }

})();
