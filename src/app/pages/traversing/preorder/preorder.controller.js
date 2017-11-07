(function() {
	'use strict';

	angular.module('rampup')
		.controller('PreorderController', PreorderController);

	/** @ngInject */
	function PreorderController(BinarySearchTree, Traversal) {
		var vm = this;

		vm.title = "Preorder Traversing";
		vm.tree = new BinarySearchTree();
		vm.inputModel = [ 20, 14, 2, 32, 15, 18, 6, 28, 21 ];
		vm.output = "";

		vm.onChipAdd = onChipAdd;
		vm.onChipRemove = onChipRemove;

		rebuildTreeRepresentation();
		vm.output = generateTreeLog();

		function onChipAdd() {
			rebuildTreeRepresentation();
			vm.output = generateTreeLog();
		}

		function onChipRemove() {
			rebuildTreeRepresentation();
			vm.output = generateTreeLog();
		}

		function rebuildTreeRepresentation() {
			vm.tree.clear();
			vm.tree = new BinarySearchTree();
			for (var i = 0; i < vm.inputModel.length; i++) {
				vm.tree.add(vm.inputModel[i], "value " + i);
			}
		}

		function generateTreeLog() {
			var log = "";
			Traversal.preorder(vm.tree._root, function(node) {
				log += node.key + "  ";
			}, this);
			return log;
		}

	}

})();
