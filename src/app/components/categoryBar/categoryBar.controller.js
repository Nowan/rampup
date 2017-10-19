(function() {
  'use strict';

  angular
    .module('rampup')
    .controller('CategoryBarController', CategoryBarController);

  /** @ngInject */
  function CategoryBarController($location, $tasks) {
    var vm = this;

    vm.selectedIndex = 0;
    vm.categories = [];

    vm.selectCategory = selectCategory;

	$tasks.onDataLoaded = function() {
	  vm.categories = $tasks.getCategories();
	};

    function selectCategory(categoryIndex) {
      if (vm.selectedIndex === categoryIndex) return;
      vm.selectedIndex = categoryIndex;
      $location.path('/category/' + vm.categories[categoryIndex].key);
    }
  }

})();
