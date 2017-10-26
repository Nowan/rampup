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
		vm.pivotModes = [ "First element", "Last element", "Middle element", "Random element" ];
		vm.selectedMode = vm.pivotModes[2];
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
			}, 500, steps.length);
		}

		function composeSortingSteps() {
			var steps = [];
			vm.sandbox = vm.originalArray.slice(0);
			quickSort(vm.sandbox, 0, vm.sandbox.length - 1, steps);

			return steps;
		}

		function quickSort(array, lowIndex, highIndex, steps) {
			var partitionIndex = partition.apply(this, arguments);

			if (partitionIndex - 1 > lowIndex) {
				quickSort(array, lowIndex, partitionIndex - 1, steps);
			}

			if (partitionIndex < highIndex) {
				var includePartition = !(vm.selectedMode === vm.pivotModes[0] || vm.selectedMode === vm.pivotModes[1]);
				partitionIndex += includePartition ? 0 : 1;
				quickSort(array, partitionIndex, highIndex, steps);
			}
		}

		function partition(array, lowIndex, highIndex, steps) {
			switch (vm.selectedMode) {
				case vm.pivotModes[0]:
					return partitionFirstElementAsPivot.apply(this, arguments);
				case vm.pivotModes[1]:
					return partitionLastElementAsPivot.apply(this, arguments);
				case vm.pivotModes[2]:
					return partitionMiddleElementAsPivot.apply(this, arguments);
				default:
					return partitionLastElementAsPivot.apply(this, arguments);
			}
		}

		function partitionFirstElementAsPivot(array, lowIndex, highIndex, steps) {
			// Lomuto partition scheme
			var pivot = array[lowIndex];
			var partitionIndex = lowIndex;
			var i;

			var tmpStep = $stepFactory.newIdleStep().static(lowIndex);
			for (i = lowIndex + 1; i <= highIndex; i++) tmpStep.compare(i);
			steps.push(tmpStep);

			for (i = lowIndex + 1; i <= highIndex; i++) {
				steps.push($stepFactory.newIdleStep().active(i));

				if (array[i].value <= pivot.value) {
					partitionIndex++;
					swapElements(array, partitionIndex, i);

					tmpStep = $stepFactory.newSwapStep(partitionIndex, i);
					steps.push(partitionIndex === i ? tmpStep : tmpStep.compare(i));

					tmpStep = $stepFactory.newIdleStep().accent(partitionIndex);
					steps.push(partitionIndex === lowIndex + 1 ? tmpStep.static(partitionIndex - 1) : tmpStep.compare(partitionIndex - 1));
				}
				else {
					tmpStep = $stepFactory.newIdleStep().compare(i);
					steps.push(i === partitionIndex ? tmpStep.accent(i) : tmpStep);
				}
			}

			swapElements(array, partitionIndex, lowIndex);
			steps.push($stepFactory.newSwapStep(partitionIndex, lowIndex).compare(lowIndex));

			tmpStep = $stepFactory.newIdleStep();
			for (i = lowIndex; i <= highIndex; i++) tmpStep.regular(i);
			steps.push(tmpStep);

			return partitionIndex;
		}

		function partitionLastElementAsPivot(array, lowIndex, highIndex, steps) {
			// Lomuto partition scheme
			var pivot = array[highIndex];
			var partitionIndex = lowIndex - 1;
			var i;

			var tmpStep = $stepFactory.newIdleStep();
			for (i = lowIndex; i < highIndex; i++) tmpStep.compare(i);
			steps.push(tmpStep.static(highIndex));

			for (i = lowIndex; i < highIndex; i++) {
				steps.push($stepFactory.newIdleStep().active(i));

				if (array[i].value < pivot.value) {
					partitionIndex++;
					swapElements(array, partitionIndex, i);

					tmpStep = $stepFactory.newSwapStep(partitionIndex, i);
					steps.push(partitionIndex === i ? tmpStep : tmpStep.compare(i));

					tmpStep = $stepFactory.newIdleStep().compare(i).accent(partitionIndex)
					steps.push(partitionIndex > lowIndex ? tmpStep.compare(partitionIndex - 1) : tmpStep);
				}
				else {
					tmpStep = $stepFactory.newIdleStep().compare(i);
					steps.push(i === partitionIndex ? tmpStep.accent(i) : tmpStep);
				}
			}

			partitionIndex++;

			if (array[highIndex].value < array[partitionIndex].value) {
				swapElements(array, partitionIndex, highIndex);
				steps.push($stepFactory.newSwapStep(partitionIndex, highIndex));
			}

			tmpStep = $stepFactory.newIdleStep();
			for (i = 0; i < array.length; i++) tmpStep.regular(i);
			steps.push(tmpStep);

			return partitionIndex;
		}

		function partitionMiddleElementAsPivot(array, lowIndex, highIndex, steps) {
			// Hoare partition scheme
			var middleIndex = Math.floor((lowIndex + highIndex) * 0.5);
			var pivot = array[middleIndex];
			var li = lowIndex;
			var ri = highIndex;
			var i;

			var tmpStep = $stepFactory.newIdleStep();
			for (i = lowIndex; i <= highIndex; i++) tmpStep.compare(i);
			steps.push(tmpStep.static(middleIndex));

			while (li <= ri) {
				steps.push($stepFactory.newIdleStep().active(li, ri));

				while (array[li].value < pivot.value) {
					li++;
					steps.push($stepFactory.newIdleStep().active(li).compare(li - 1));
				}

				steps.push($stepFactory.newIdleStep().accent(li));

				while (array[ri].value > pivot.value) {
					ri--;
					steps.push($stepFactory.newIdleStep().active(ri).compare(ri + 1));
				}

				steps.push($stepFactory.newIdleStep().accent(ri));

				if (li <= ri) {
					swapElements(array, li, ri);
					steps.push($stepFactory.newSwapStep(li, ri));
					steps.push($stepFactory.newIdleStep().compare(li, ri));
					li++;
					ri--;
				}
				else {
					steps.push($stepFactory.newIdleStep().compare(li, ri));
				}
			}

			tmpStep = $stepFactory.newIdleStep();
			for (i = 0; i < array.length; i++) tmpStep.regular(i);
			steps.push(tmpStep);

			return li;
		}

		function swapElements(array, indexA, indexB) {
			var tmp = array[indexA];
			array[indexA] = array[indexB];
			array[indexB] = tmp;
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
	}

})();
