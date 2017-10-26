(function() {
	'use strict';

	angular.module('rampup')
		.factory('Node', NodeFactory);

	function NodeFactory() {
		function Node(object, backwardLink, forwardLink) {
			this.data = object;
			this.backwardLink = backwardLink;
			this.forwardLink = forwardLink;
		}

		return Node;
	}

})();
