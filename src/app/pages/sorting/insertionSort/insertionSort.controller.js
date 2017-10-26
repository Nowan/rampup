(function() {
	'use strict';

	angular.module('rampup')
		.controller('InsertionSortController', InsertionSortController);

	/** @ngInject */
	function InsertionSortController($interval, $stepFactory, SortingStepAction) {
		var vm = this;

		vm.title = "Insertion Sort";
		vm.arraySize = 10;
		vm.originalArray = generateUnsortedArray();
		vm.sortedArray = [];
		vm.sandbox = [];
		vm.maxArraySize = 25;
		vm.minArraySize = 5;
		vm.isSortingPending = false;
		vm.sortingTween = null;

		vm.onArraySizeChange = onArraySizeChange;
		vm.onRandomizeClick = onRandomizeClick;
		vm.onSortClick = onSortClick;
		vm.onSkipClick = onSkipClick;

		function onArraySizeChange() {
			vm.arraySize = Math.max(Math.min(vm.arraySize, vm.maxArraySize), vm.minArraySize);

			if (vm.arraySize > vm.originalArray.length) {
				for (var i = 0; i < vm.arraySize - vm.originalArray.length; i++)
					vm.originalArray.push(generateRandomElement());
			}
			else {
				vm.originalArray.splice(0, vm.originalArray.length - vm.arraySize);
			}
		}

		function onSortClick() {
			vm.sortedArray = JSON.parse(JSON.stringify(vm.originalArray));
			runSortingAnimation();
			vm.isSortingPending = true;
		}

		function onSkipClick() {
			$interval.cancel(vm.sortingTween);
			vm.sortingTween = null;
			vm.isSortingPending = false;
			vm.sortedArray = vm.sandbox;
		}

		function onRandomizeClick() {
			vm.originalArray = generateUnsortedArray();
		}

		function generateUnsortedArray() {
			var array = [];

			for(var i = 0; i < vm.arraySize; i++)
				array.push(generateRandomElement());

			return array;
		}

		function generateRandomElement() {
			return {
				value: generateRandomNumber(),
				highlight: false
			};
		}

		function generateRandomNumber() {
			return Math.floor(Math.random() * 1000);
		}

		function runSortingAnimation() {
			var steps = composeSortingSteps();
			var currentStep = 0;

			vm.sortingTween = $interval(function(){
				runAnimationStep(steps, currentStep);
				currentStep++;
				if (currentStep >= steps.length) vm.isSortingPending = false;
			}, 250, steps.length);
		}

		function composeSortingSteps() {
			var steps = [];
			var array = vm.originalArray.slice(0);
			var tmpStep, j;

			steps.push($stepFactory.newIdleStep().active(0));

			for (var i = 0; i < array.length; i++) {
				tmpStep = $stepFactory.newIdleStep();
				for (j = 0; j <= i; j++) tmpStep.compare(j);
				steps.push(tmpStep.active(i));

				j = i;

				while (j > 0 && array[j - 1].value > array[j].value) {
					swapElements(array, j - 1, j);
					steps.push($stepFactory.newSwapStep(j - 1, j));
					j--;
				}
			}

			tmpStep = $stepFactory.newIdleStep();
			for (j = 0; j < array.length; j++) tmpStep.regular(j);
			steps.push(tmpStep);

			vm.sandbox = array;

			return steps;
		}

		function runAnimationStep(animationSteps, stepIndex) {
			var step = animationSteps[stepIndex];

			switch (step.action) {
				case SortingStepAction.Idle:

					break;
				case SortingStepAction.Swap:
					var tmp = vm.sortedArray[step.sourceIndex];
					vm.sortedArray[step.sourceIndex] = vm.sortedArray[step.targetIndex];
					vm.sortedArray[step.targetIndex] = tmp;
					break;
			}

			for (var elementIndex in step.highlights) {
				vm.sortedArray[elementIndex].highlight = step.highlights[elementIndex];
			}
		}

		function swapElements(array, indexA, indexB) {
			var tmp = array[indexA];
			array[indexA] = array[indexB];
			array[indexB] = tmp;
		}
	}

})();
