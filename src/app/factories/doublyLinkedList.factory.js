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
			var node = new Node(object);
			var fwNode = this.getNodeAt(index);
			var bwNode = index > 0 ? this.getNodeAt(index - 1) : null;

			node._address = this._memoryBuffer.add(node);

			updateNodeLinks(node, bwNode, fwNode);
			updateNodeLinks(bwNode, null, node);
			updateNodeLinks(fwNode, node, null);

			if (index === 0) this._head = node;
			if (index === this._length - 1) this._tail = node;

			this._length++;
			return node;
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

		function updateNodeLinks(node, backwardNode, forwardNode) {
			if (node) {
				node.backwardLink = backwardNode ? backwardNode._address : node.backwardLink;
				node.forwardLink = forwardNode ? forwardNode._address : node.forwardLink;
			}
		}

		return DoublyLinkedList;
	}

})();
