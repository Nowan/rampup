(function() {
	'use strict';

	angular
		.module('rampup')
		.directive('taskBar', TaskBar);

	/** @ngInject */
	function TaskBar() {
		return {
			restrict: 'E',
			templateUrl: 'app/components/taskBar/taskBar.html',
			controller: 'TaskBarController',
			controllerAs: 'taskBarCtrl',
			bindToController: true
		};
	}

})();
