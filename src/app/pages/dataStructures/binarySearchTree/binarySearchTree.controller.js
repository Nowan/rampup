(function() {
	'use strict';

	angular.module('rampup')
		.controller('BinarySearchTreeController', BinarySearchTreeController);

	/** @ngInject */
	function BinarySearchTreeController(BinarySearchTree) {
		var vm = this;

		vm.title = "Binary Search Tree";
		vm.tree = new BinarySearchTree();
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
			vm.tree.clear();
			vm.tree = new BinarySearchTree();
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
