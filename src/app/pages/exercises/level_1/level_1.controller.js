(function() {
	'use strict';

	angular.module('rampup')
		.controller('FirstExerciseController', FirstExerciseController);

	/** @ngInject */
	function FirstExerciseController() {
		var vm = this;

		vm.title = "Exercise 1";

		vm.inputSample = [ -3, 9, 0, 3, 3, 3, 13, -11, 21, -7, 1, -6, 2, -15, 7 ];
		vm.sumSample = 6;
		vm.output = [];

		getUniqueSummandPairs(vm.inputSample, vm.sumSample);

		function getUniqueSummandPairs(values, sumSample) {
			var pairs = [];
			var srtValues = values.slice(0).sort(function(a, b) {
				return a > b;
			});

			var li = 0;
			var ri = srtValues.length - 1;

			while (li < ri) {
				if (srtValues[li] === srtValues[ri] && li + 1 < ri) {
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

			vm.output = pairs;
		}

		function SummandPair(summandA, summandB) {
			this.a = summandA;
			this.b = summandB;
		}
	}

})();