(function() {
	'use strict';

	angular.module('rampup')
		.controller('BinarySearchTreeController', BinarySearchTreeController);

	/** @ngInject */
	function BinarySearchTreeController(BinarySearchTree) {
		var vm = this;

		vm.title = "Binary Search Tree";
		//vm.data = [ 20, 14, 2, 32, 15, 18, 6, 28, 21];
		vm.data = [ 20, 14, 2, 32, 15, 18, 6, 28, 21 ];
		vm.tree = new BinarySearchTree();

		for (var i = 0; i < vm.data.length; i++) {
			vm.tree.add(vm.data[i], "value " + i);
		}

		console.log(vm.tree._root);
	}

})();
