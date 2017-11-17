(function() {
	'use strict';

	angular.module('rampup')
		.controller('HeapController', HeapController);

	/** @ngInject */
	function HeapController(Heap) {
		var vm = this;

		vm.title = "Heap";
		vm.tree = new Heap();
		vm.inputModel = generateArrayOfRandomNumbers();
		
		vm.onChipAdd = onChipAdd;
		vm.onChipRemove = onChipRemove;

		rebuildTreeRepresentation();

		function onChipAdd() {
			rebuildTreeRepresentation();
		}

		function onChipRemove() {
			rebuildTreeRepresentation();
		}

		function rebuildTreeRepresentation() {
			vm.tree = new Heap();
			for (var i = 0; i < vm.inputModel.length; i++) {
				vm.tree.add(vm.inputModel[i], "value " + i);
			}
		}

		function generateArrayOfRandomNumbers(minValue, maxValue, size) {
			minValue = minValue || 0;
			maxValue = maxValue || 100;
			size = size || generateRandomNumber(5, 10);

			var array = [];
			for (var i = 0; i < size; i++)
				array[i] = generateRandomNumber(minValue, maxValue);
			return array;
		}

		function generateRandomNumber(minValue, maxValue) {
			return parseInt(Math.floor(Math.random() * (maxValue - minValue)) + minValue);
		}

	}

})();
