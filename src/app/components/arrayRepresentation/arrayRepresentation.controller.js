(function() {
	'use strict';

	angular.module('rampup')
		.controller('ArrayRepresentationController', ArrayRepresentationController);

	/** @ngInject */
	function ArrayRepresentationController($scope) {
		var vm = this;

		vm.maxValue = getMaxValue();
		vm.rescaleElements = vm.rescaleElements === "true";

		vm.getElementHeight = getElementHeight;
		vm.getElementWidth = getElementWidth;

		if (vm.rescaleElements) {
			$scope.$watch(function() { return vm.model; }, updateMaxValue);
			$scope.$watch(function() { return vm.model.length; }, updateMaxValue);
		}

		function getElementHeight(element) {
			return vm.orientation === 'vertical' ? getElementWeigth(element) : getElementLength(element);
		}

		function getElementWidth(element) {
			return vm.orientation === 'vertical' ? getElementLength(element) : getElementWeigth(element);
		}

		function getElementLength(element) {
			return vm.rescaleElements ? (element.value / vm.maxValue * 100) + '%' : (vm.elementLength || '100%');
		}

		function getElementWeigth(element) {
			return vm.elementWeight ? vm.elementWeight : '100%';
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
