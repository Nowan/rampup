(function() {
	'use strict';

	angular.module('rampup')
		.controller('TreeRepresentationController', TreeRepresentationController);

	/** @ngInject */
	function TreeRepresentationController($scope, Traversal) {
		var vm = this;

		vm.tiles = [];
		vm.colNumber = 2;
		vm.rowNumber = 1;

		$scope.$watch(function() { return vm.model; }, updateRepresentation);
		$scope.$watch(function() { return vm.model.length; }, updateRepresentation);

		function updateRepresentation() {
			vm.rowNumber = getTreeDepth();
			vm.colNumber = Math.pow(2, vm.rowNumber) - 1;

			var r, c, nodes = [];
			for (r = 0; r < vm.rowNumber; r++) nodes.push([]);

			Traversal.preorder(vm.model._root, function(node) {
				if (node === vm.model._root) {
					nodes[0][Math.floor(vm.colNumber * 0.5)] = node;
				}
				else {
					r = getNodeDepth(node) - 1;
					for (c = 0; c < vm.colNumber; c++) {
						var parentNode = nodes[r - 1][c];
						if (parentNode && parentNode === node.parent) {
							var offsetC = Math.ceil(vm.colNumber / Math.pow(2, r + 1));
							var sign = node === parentNode.leftChild ? -1 : 1;
							nodes[r][c + offsetC * sign] = node;
							break;
						}
					}
				}
			});

			vm.tiles = [];
			for (r = 0; r < vm.rowNumber; r++) {
				for (c = 0; c < vm.colNumber; c++) {
					var node = nodes[r][c];
					if (node) {
						vm.tiles.push({ key: node.key });
					}
					else {
						vm.tiles.push({ isGap: true });
					}
				}
			}
		}

		function getTreeDepth() {
			var treeDepth = 1;
			Traversal.postorder(vm.model._root, function(node) {
				var nodeDepth = getNodeDepth(node);
				if (nodeDepth > treeDepth)
					treeDepth = nodeDepth
			}, this);
			return treeDepth;
		}

		function getNodeDepth(node) {
			var nodeDepth = 1;
			while (node.parent) {
				node = node.parent;
				nodeDepth++;
			}
			return nodeDepth;
		}
	}

})();
