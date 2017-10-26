(function() {
	'use strict';

	angular
		.module('rampup')
		.directive('arrayRepresentation', ArrayRepresentation);

	/** @ngInject */
	function ArrayRepresentation() {
		return {
			restrict: 'E',
			templateUrl: 'app/components/arrayRepresentation/arrayRepresentation.html',
			controller: 'ArrayRepresentationController',
			controllerAs: 'repCtrl',
			bindToController: true,
			scope:{
				model: '=',
				orientation: '@',
				rescaleElements: '@',
				labelPosition: '@',
				elementWeight: '@',
				elementLength: '@',
				onClick: '=',
				onMouseEnter: '=',
				onMouseLeave: '='
			},
			css: 'app/components/arrayRepresentation/arrayRepresentation.scss'
		};
	}

})();
