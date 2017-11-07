(function() {
	'use strict';

	angular.module('rampup')
		.controller('BinarySearchTreeController', BinarySearchTreeController);

	/** @ngInject */
	function BinarySearchTreeController(BinarySearchTree) {
		var vm = this;

		vm.title = "Binary Search Tree";
		vm.tree = new BinarySearchTree();

		var data = [ 20, 14, 2, 32, 15, 18, 6, 28, 21 ];
		for (var i = 0; i < data.length; i++) {
			vm.tree.add(data[i], "value " + i);
		}
	}

})();
