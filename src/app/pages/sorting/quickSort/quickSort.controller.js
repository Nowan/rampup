(function() {
	'use strict';

	angular.module('rampup')
		.controller('QuickSortController', QuickSortController);

	/** @ngInject */
	function QuickSortController($interval, $stepFactory, SortingStepAction) {
		var vm = this;

		vm.title = "Quick Sort";
		vm.arraySize = 10;
		vm.originalArray = generateUnsortedArray();
		vm.sortedArray = [];
		vm.pivotModes = [ "First element", "Last element", "Random element", "Median" ];
		vm.selectedMode = vm.pivotModes[0];
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
			quickSort(vm.sandbox, 0, vm.sandbox.length - 1, steps);

			return steps;
		}

		function quickSort(array, lowIndex, highIndex, steps) {
			// Lomuto partition scheme
			if (lowIndex < highIndex) {
				var partitionIndex = partition.apply(this, arguments);
				quickSort(array, lowIndex, partitionIndex - 1, steps);
				quickSort(array, partitionIndex + 1, highIndex, steps);
			}
		}

		function partition(array, lowIndex, highIndex, steps) {
			switch (vm.selectedMode) {
				case vm.pivotModes[1]:
					return partitionLastElementAsPivot.apply(this, arguments);
				default:
					return partitionLastElementAsPivot.apply(this, arguments);
			}
		}

		function partitionLastElementAsPivot(array, lowIndex, highIndex, steps) {
			var pivot = array[highIndex];
			var i = lowIndex - 1;
			var j;

			var highlightStep = $stepFactory.newHighlightStep();
			for (j = lowIndex; j < highIndex; j++) highlightStep.compare(j);
			highlightStep.accent(highIndex);
			steps.push(highlightStep);

			for (j = lowIndex; j < highIndex; j++) {
				steps.push($stepFactory.newHighlightStep().active(j));
				if (array[j].value < pivot.value) {
					i++;
					swapElements(array, i, j);
					steps.push($stepFactory.newSwapStep(i, j));
					steps.push($stepFactory.newHighlightStep().compare(i));
				}
				else
					steps.push($stepFactory.newHighlightStep().compare(j));
			}

			if (array[highIndex].value < array[i + 1].value) {
				swapElements(array, i + 1, highIndex);
				steps.push($stepFactory.newSwapStep(i + 1, highIndex));
				steps.push($stepFactory.newWaitStep());
				steps.push($stepFactory.newWaitStep());
			}

			highlightStep = $stepFactory.newHighlightStep();
			for (j = 0; j < array.length; j++) {
				highlightStep.regular(j);
			}
			steps.push(highlightStep);

			return i + 1;
		}

		function swapElements(array, indexA, indexB) {
			var tmp = array[indexA];
			array[indexA] = array[indexB];
			array[indexB] = tmp;
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
