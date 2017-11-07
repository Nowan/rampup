(function() {
	'use strict';

	angular.module('rampup')
		.factory('BinarySearchTree', BinarySearchTreeFactory);

	function BinarySearchTreeFactory(Traversal) {

		function BinarySearchTree() {
			this._root = null;
		}

		BinarySearchTree.prototype.add = function(key, value) {
			var node = new Node(key, value);

			if (this._root) {
				this.insert(this._root, node);
			}
			else {
				this._root = node;
			}
		};

		BinarySearchTree.prototype.insert = function(rootNode, insertionNode) {
			if (!rootNode) return insertionNode;

			if (insertionNode.key < rootNode.key)
				rootNode.leftChild = this.insert(rootNode.leftChild, insertionNode);
			else if (insertionNode.key >= rootNode.key)
				rootNode.rightChild = this.insert(rootNode.rightChild, insertionNode);

			return rootNode;
		};

		function Node(key, value) {
			this.key = key;
			this.value = value;

			this.leftChild = null;
			this.rightChild = null;
			this.parent = null;
		}

		return BinarySearchTree;
	}

})();
