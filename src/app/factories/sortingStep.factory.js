(function() {
	'use strict';

	angular.module('rampup')
		.value('SortingStepAction', { Swap: 0, Idle: 1 })
		.factory('$stepFactory', SortingStepFactory);

	function SortingStepFactory(SortingStepAction) {
		return {

			newSwapStep: function(sourceElementIndex, targetElementIndex) {
				var step = new SortingStep(SortingStepAction.Swap);
				step.sourceIndex = sourceElementIndex;
				step.targetIndex = targetElementIndex;
				return step;
			},

			newIdleStep: function() {
				return new SortingStep(SortingStepAction.Idle);
			}

		}

		function SortingStep(action) {
			this.action = action;
			this.highlights = {};

			this.defineHighlightAssigningFunction = defineHighlightAssigningFunction.bind(this);

			this.defineHighlightAssigningFunction('accent');
			this.defineHighlightAssigningFunction('active');
			this.defineHighlightAssigningFunction('regular');
			this.defineHighlightAssigningFunction('compare');
			this.defineHighlightAssigningFunction('static');

			function defineHighlightAssigningFunction(highlightKey) {
				Object.defineProperty(this, highlightKey, {
					value: function(/*...*/) {
						for (var i = 0; i < arguments.length; i++)
							this.highlights[arguments[i]] = highlightKey;
						return this;
					}
				})
			}
		}
	}

})();
