(function() {
	'use strict';

	angular.module('rampup')
		.controller('TaskBarController', TaskBarController);

	/** @ngInject */
	function TaskBarController($tasks) {
		var vm = this;

		vm.factory = $tasks;

		vm.selectTask = vm.factory.selectTask;
		vm.hasTasksToShow = hasTasksToShow;

		function hasTasksToShow() {
			return vm.factory.filteredTasks.length > 0;
		}
	}

})();
