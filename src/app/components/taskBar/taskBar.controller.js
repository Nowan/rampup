(function() {
  'use strict';

  angular
    .module('rampup')
    .controller('TaskBarController', TaskBarController);

  /** @ngInject */
  function TaskBarController($routeParams) {
    var vm = this;

    vm.categoryKey = $routeParams.category;
	vm.selectedIndex = 0;
    vm.tasks = [
      { key: vm.categoryKey, title: vm.categoryKey },
      { key: vm.categoryKey, title: vm.categoryKey }
    ];

	vm.selectTask = selectTask;

	function selectTask(taskIndex) {
	  if (vm.selectedIndex === taskIndex) return;
	  vm.selectedIndex = taskIndex;
	}
  }

})();
