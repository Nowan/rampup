(function() {
	'use strict';

	angular.module('rampup')
		.controller('CategoryBarController', CategoryBarController);

	/** @ngInject */
	function CategoryBarController($tasks) {
		var vm = this;

		vm.factory = $tasks;

		vm.selectCategory = vm.factory.selectCategory;
	}

})();
