(function() {
	'use strict';

	angular
		.module('rampup')
		.directive('treeRepresentation', TreeRepresentation);

	/** @ngInject */
	function TreeRepresentation() {
		return {
			restrict: 'E',
			templateUrl: 'app/components/treeRepresentation/treeRepresentation.html',
			controller: 'TreeRepresentationController',
			controllerAs: 'repCtrl',
			bindToController: true,
			scope:{
				model: '='
			},
			css: 'app/components/treeRepresentation/treeRepresentation.scss'
		};
	}

})();
