(function() {
	'use strict';

	angular.module('rampup')
    .value('SortingStepAction', { Highlight: 0, Swap: 1, Wait: 2 })
    .factory('$stepFactory', SortingStepFactory);

	function SortingStepFactory(SortingStepAction) {
    return {

      newSwapStep: function(sourceElementIndex, targetElementIndex) {
        var step = new SortingStep(SortingStepAction.Swap);
        step.sourceIndex = sourceElementIndex;
        step.targetIndex = targetElementIndex;
        return step;
      },

      newHighlightStep: function() {
        var step = new SortingStep(SortingStepAction.Highlight);
        step.highlights = {};

        step.active = function(/*...*/) {
          for (var i = 0; i < arguments.length; i++)
            this.highlights[arguments[i]] = 'active';
          return this;
        };

        step.compare = function(/*...*/) {
          for (var i = 0; i < arguments.length; i++)
            this.highlights[arguments[i]] = 'compare';
          return this;
        };

        step.regular = function(/*...*/) {
          for (var i = 0; i < arguments.length; i++)
            this.highlights[arguments[i]] = 'regular';
          return this;
        };

        return step;
      },

      newWaitStep: function() {
        return new SortingStep(SortingStepAction.Wait);
      }

    }

    function SortingStep(action) {
      this.action = action;
    }
	}

})();
