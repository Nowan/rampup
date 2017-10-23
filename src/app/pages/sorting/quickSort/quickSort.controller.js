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
				if(steps.length > 0) {
					runAnimationStep(steps, currentStep);
					currentStep++;
					if (currentStep >= steps.length) vm.isSortingPending = false;
				}
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
				case vm.pivotModes[0]:
					return partitionFirstElementAsPivot.apply(this, arguments);
				case vm.pivotModes[1]:
					return partitionLastElementAsPivot.apply(this, arguments);
				default:
					return partitionLastElementAsPivot.apply(this, arguments);
			}
		}

		function partitionFirstElementAsPivot(array, lowIndex, highIndex, steps) {
			var pivot = array[lowIndex];
			var partitionIndex = lowIndex;

			for (var j = lowIndex + 1; j <= highIndex; j++) {
				if (array[j].value < pivot.value) {
					partitionIndex++
					swapElements(array, partitionIndex, j);
				}
			}

			swapElements(array, partitionIndex, lowIndex);

			return partitionIndex;
		}

		function partitionLastElementAsPivot(array, lowIndex, highIndex, steps) {
			var pivot = array[highIndex];
			var partitionIndex = lowIndex;
			var i;

			var highlightStep = $stepFactory.newHighlightStep();
			for (i = lowIndex; i < highIndex; i++) highlightStep.compare(i);
			highlightStep.accent(highIndex);
			steps.push(highlightStep);

			for (i = lowIndex; i < highIndex; i++) {
				steps.push($stepFactory.newHighlightStep().active(i));

				if (array[i].value < pivot.value) {
					swapElements(array, partitionIndex, i);
					steps.push($stepFactory.newSwapStep(partitionIndex, i));
					steps.push($stepFactory.newHighlightStep().compare(partitionIndex));
					partitionIndex++;
				}
				else
					steps.push($stepFactory.newHighlightStep().compare(i));
			}

			if (array[highIndex].value < array[partitionIndex].value) {
				swapElements(array, partitionIndex, highIndex);
				steps.push($stepFactory.newSwapStep(partitionIndex, highIndex));
				steps.push($stepFactory.newWaitStep());
				steps.push($stepFactory.newWaitStep());
			}

			highlightStep = $stepFactory.newHighlightStep();
			for (i = 0; i < array.length; i++) {
				highlightStep.regular(i);
			}
			steps.push(highlightStep);

			return partitionIndex;
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
