(function() {
  'use strict';

  angular.module('rampup')
         .controller('TaskBarController', TaskBarController);

  /** @ngInject */
  function TaskBarController($tasks) {
    var vm = this;

    vm.factory = $tasks;

	  vm.selectTask = selectTask;
    vm.hasTasksToShow = hasTasksToShow;

	  function selectTask(taskIndex) {
      vm.factory.setTaskActive(vm.factory.activeCategory.tasks[taskIndex]);
	  }

    function hasTasksToShow() {
      return vm.factory.filteredTasks.length > 0;
    }
  }

})();
