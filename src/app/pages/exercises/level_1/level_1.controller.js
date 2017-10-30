(function() {
	'use strict';

	angular.module('rampup')
		.controller('FirstExerciseController', FirstExerciseController);

	/** @ngInject */
	function FirstExerciseController() {
		var vm = this;

		vm.title = "Exercise 1";
		vm.inputArray = generateArrayOfRandomNumbers(-10, 10, 10);
		vm.inputModel = [];
		vm.sumSample = generateRandomNumber(0, 15);
		vm.output = [];

		vm.onChipAdd = onChipAdd;
		vm.onChipRemove = onChipRemove;
		vm.onRandomizeClick = onRandomizeClick;
		vm.onRunClick = onRunClick;
		vm.transformChip = transformChip;

		refreshInputModel();

		function onChipAdd(chip) {
			vm.inputArray.push(chip.value);
		}

		function onChipRemove(index) {
			vm.inputArray.splice(index, 1);
		}

		function onRandomizeClick() {
			vm.inputArray = generateArrayOfRandomNumbers(-10, 10, 10);
			vm.sumSample = generateRandomNumber(0, 15);
			refreshInputModel();
		}

		function onRunClick() {
			vm.output = getUniqueSummandPairs(vm.inputArray, vm.sumSample);
		}

		function transformChip(value){
			value = parseInt(value);
			var chip = { value: value };
			vm.inputModel.push(chip);
			vm.inputArray.push(value);
			return chip;
		}

		function getUniqueSummandPairs(values, sumSample) {
			var pairs = [];
			var srtValues = values.slice(0).sort(function(a, b) {
				return a > b;
			});

			var li = 0;
			var ri = srtValues.length - 1;

			while (li < ri) {
				if (srtValues[li] === srtValues[li + 1] && li + 1 < ri) {
					li++;
				}
				else {
					var sum = srtValues[ri] + srtValues[li];
					if (sum === sumSample) {
						pairs.push(new SummandPair(srtValues[ri], srtValues[li]));
						li++;
					}
					else {
						if (sum < sumSample) li++;
						if (sum > sumSample) ri--;
					}
				}
			}



			return pairs;
		}

		function SummandPair(summandA, summandB) {
			this.a = summandA;
			this.b = summandB;
		}

		function generateArrayOfRandomNumbers(minValue, maxValue, size) {
			size = size || 10;
			var array = [];
			for (var i = 0; i < size; i++)
				array[i] = generateRandomNumber(minValue, maxValue);
			return array;
		}

		function generateRandomNumber(minValue, maxValue) {
			return parseInt(Math.floor(Math.random() * (maxValue - minValue)) + minValue);
		}

		function refreshInputModel() {
			vm.inputModel = [];
			vm.inputArray.forEach(function(value) {
				vm.inputModel.push({ value: value });
			});
		}
	}

})();