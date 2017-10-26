(function() {
	'use strict';

	angular.module('rampup')
		.factory('DoublyLinkedList', DoublyLinkedListFactory);

	function DoublyLinkedListFactory(MemoryBuffer, Node) {

		function DoublyLinkedList(memoryBuffer) {
			this._memoryBuffer = memoryBuffer || new MemoryBuffer();
			this._head = null;
			this._length = 0;
		}

		DoublyLinkedList.prototype.add = function(object) {
			return this.insert(object, 0);
		};

		DoublyLinkedList.prototype.insert = function(object, index) {
			if (index > this._length) throw "Invalid index " + index;

			var node = new Node(object);
			var fwNode = this._length > 0 ? this.getNodeAt(index) : null;
			var bwNode = index > 0 ? this.getNodeAt(index - 1) : null;

			node._address = this._memoryBuffer.add(node);

			updateNodeLinks(node, bwNode, fwNode);
			updateNodeLinks(bwNode, null, node);
			updateNodeLinks(fwNode, node, null);

			if (index === 0) this._head = node;
			if (index === this._length) this._tail = node;

			this._length++;
			return node;
		};

		DoublyLinkedList.prototype.getLength = function() {
			return this._length;
		};

		DoublyLinkedList.prototype.getNodeAt = function(index) {
			var reverseSearch = index > this._length * 0.5;
			var iterator = 0;
			var finalIteration = reverseSearch ? this._length - index : index;
			var node = reverseSearch ? this._tail : this._head;

			while (iterator < finalIteration) {
				var nextLink = reverseSearch ? node.backwardLink : node.forwardLink;
				node = this._memoryBuffer.getByAddress(nextLink);
			}

			return node || null;
		};

		DoublyLinkedList.prototype.isEmpty = function() {
			return this._length > 0;
		};

		DoublyLinkedList.prototype.isNodeFirst = function(node) {
			return node === this._head;
		};

		DoublyLinkedList.prototype.isNodeLast = function(node) {
			return node === this._tail;
		};

		DoublyLinkedList.prototype.forEach = function(callback, context) {
			var node = this._head;
			for (var i = 0; i < this._length; i++) {
				 callback.call(context, node, i);
				 node = this._memoryBuffer.getByAddress(node.forwardLink);
			}
		}

		function updateNodeLinks(node, backwardNode, forwardNode) {
			if (node) {
				node.backwardLink = backwardNode ? backwardNode._address : node.backwardLink;
				node.forwardLink = forwardNode ? forwardNode._address : node.forwardLink;
			}
		}

		return DoublyLinkedList;
	}

})();
