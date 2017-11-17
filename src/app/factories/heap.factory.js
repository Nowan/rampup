(function() {
	'use strict';

	angular.module('rampup')
		.factory('Heap', HeapFactory);

	function HeapFactory() {

		function Heap() {
			this._root = null;
			this._size = 0;
		}

		Heap.prototype.add = function(key, value) {
			var node = new Node(key, value);

			if (this._root) {
				this.insert(this._root, node);
			}
			else {
				this._root = node;
			}

			this._size++;
		};

		Heap.prototype.insert = function(rootNode, insertionNode) {
			if (!rootNode) return insertionNode;

			if (parseInt(insertionNode.key) > parseInt(rootNode.key)) {
				if (rootNode.parent) {
					insertionNode.parent = rootNode.parent;
					if (rootNode === rootNode.parent.leftChild) rootNode.parent.leftChild = insertionNode;
					if (rootNode === rootNode.parent.rightChild) rootNode.parent.rightChild = insertionNode;
					delete rootNode.parent;
				}
				else {
					this._root = insertionNode;
				}

				if (rootNode.leftChild) {
					insertionNode.leftChild = rootNode.leftChild;
					insertionNode.leftChild.parent = insertionNode;
					delete rootNode.leftChild;
				}

				if (rootNode.rightChild) {
					insertionNode.rightChild = rootNode.rightChild;
					insertionNode.rightChild.parent = insertionNode;
					delete rootNode.rightChild;
				}

				return this.insert(insertionNode, rootNode);
			}
			else {
				var rootNodeIndex = getNodeIndex(rootNode);
				var insertionIndex = this._size;
				var insertionPath = getInsertionPathToIndex(insertionIndex);

				if (insertionPathContainsIndex(rootNodeIndex, insertionPath)) {
					var leftChildIndex = 2 * rootNodeIndex + 1;
					var rightChildIndex = leftChildIndex + 1;

					if (insertionPathContainsIndex(leftChildIndex, insertionPath)) {
						rootNode.leftChild = this.insert(rootNode.leftChild, insertionNode);
						rootNode.leftChild.parent = rootNode;
					}

					if (insertionPathContainsIndex(rightChildIndex, insertionPath)) {
						rootNode.rightChild = this.insert(rootNode.rightChild, insertionNode);
						rootNode.rightChild.parent = rootNode;
					}
				}

			}

			return rootNode;
		};

		Heap.prototype.getTreeDepth = function() {
			return Math.floor(Math.log2(this._size + 1));
		};

		Heap.prototype.isTreeFull = function(rootNode) {
			if (!rootNode) return true;
			if (!rootNode.leftChild && !rootNode.rightChild) return true;

			if (rootNode.leftChild && rootNode.rightChild)
				return this.isTreeFull(rootNode.leftChild) && this.isTreeFull(rootNode.rightChild);

			return false;
		};

		function getNodeDepth(node) {
			var nodeDepth = 1;
			while (node.parent) {
				node = node.parent;
				nodeDepth++;
			}
			return nodeDepth;
		}

		function getNodeIndex(node, nodeDepth) {
			var nodeIndex = 0;
			nodeDepth = nodeDepth || getNodeDepth(node);
			while (node.parent) {
				var parentDepth = nodeDepth - 1;
				nodeIndex += Math.pow(2, parentDepth - 1);
				nodeIndex += node.parent.rightChild === node ? 1 : 0;
				nodeDepth--;
				node = node.parent;
			}
			return nodeIndex;
		}

		function getInsertionPathToIndex(nodeIndex) {
			var insertionPath = [nodeIndex];
			var parentIndex = getParentIndex(nodeIndex);
			while (parentIndex >= 0) {
				insertionPath.push(parentIndex);
				parentIndex = getParentIndex(parentIndex);
			}
			return insertionPath;
		}

		function getNodeWithIndex(nodeIndex) {
			var rootIndex = 0;
			var node = this._root;

		}

		function insertionPathContainsNode(node, insertionPath) {
			var nodeIndex = getNodeIndex(node);
			return insertionPathContainsIndex(nodeIndex);
		}

		function insertionPathContainsIndex(nodeIndex, insertionPath) {
			return insertionPath.indexOf(nodeIndex) >= 0;
		}

		function getParentIndex(nodeIndex) {
			return (nodeIndex % 2 === 0 ? nodeIndex - 2 : nodeIndex - 1) * 0.5;
		}

		return Heap;
	}

	function Node(key, value) {
		this.key = key;
		this.value = value;

		this.leftChild = null;
		this.rightChild = null;
		this.parent = null;
	}

})();
