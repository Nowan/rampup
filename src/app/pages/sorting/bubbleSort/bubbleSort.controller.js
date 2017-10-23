(function() {
	'use strict';

	angular.module('rampup')
		.controller('BubbleSortController', BubbleSortController);

	/** @ngInject */
	function BubbleSortController($interval, $stepFactory, SortingStepAction) {
		var vm = this;

		vm.title = "Bubble Sort";
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
			vm.sandbox = vm.originalArray.slice(0);

			var swapped;
			do {
				swapped = false;
				for (var i = 0; i < vm.sandbox.length - 1; i++) {
					steps.push($stepFactory.newHighlightStep().active(i).compare(i + 1));
					if (vm.sandbox[i].value > vm.sandbox[i + 1].value) {
						var temp = vm.sandbox[i];
						vm.sandbox[i] = vm.sandbox[i + 1];
						vm.sandbox[i + 1] = temp;
						swapped = true;
						steps.push($stepFactory.newSwapStep(i, i + 1));
					}
					else {
						steps.push($stepFactory.newWaitStep());
					}
					steps.push($stepFactory.newHighlightStep().regular(i, i + 1));
				}
			} while (swapped);

			return steps;
		}

		function runAnimationStep(animationSteps, stepIndex) {
			var step = animationSteps[stepIndex];

			switch (step.action) {
				case SortingStepAction.Highlight:
					for (var elementIndex in step.highlights) {
						vm.sortedArray[elementIndex].highlight = step.highlights[elementIndex];
					}
					break;
				case SortingStepAction.Swap:
					var tmp = vm.sortedArray[step.sourceIndex];
					vm.sortedArray[step.sourceIndex] = vm.sortedArray[step.targetIndex];
					vm.sortedArray[step.targetIndex] = tmp;
					break;
			}
		}
	}

})();
