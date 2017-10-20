(function() {
	'use strict';

	angular.module('rampup')
		.controller('ArrayRepresentationController', ArrayRepresentationController);

	/** @ngInject */
	function ArrayRepresentationController($scope) {
		var vm = this;

		vm.maxValue = getMaxValue();

		vm.getElementLength = getElementLength;

		$scope.$watch(function() { return vm.model; }, updateMaxValue);
		$scope.$watch(function() { return vm.model.length; }, updateMaxValue);

		function getElementLength(element) {
			return (element.value / vm.maxValue * 100) + '%';
		}

		function updateMaxValue() {
			vm.maxValue = getMaxValue();
		}

		function getMaxValue() {
			if (vm.model && vm.model.length === 0) {
				return 0;
			}
			else {
				return vm.model.reduce(function(currentValue, nextElement) {
					return Math.max(currentValue, nextElement.value);
				}, vm.model[0].value);
			}
		}
	}

})();
