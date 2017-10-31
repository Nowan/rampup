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

			var node = new Node(object, null, null);
			var fwNode = this._length > 0 && index < this._length ? this.getNodeAt(index) : null;
			var bwNode = index > 0 ? this.getNodeAt(index - 1) : null;

			node._address = this._memoryBuffer.add(node);

			updateNodeLinks(node, bwNode, fwNode);
			updateNodeLinks(bwNode, null, node);
			updateNodeLinks(fwNode, node, null);

			if (index === 0) this._head = node;
			if (this._length === 0 || index === this._length) this._tail = node;

			this._length++;
			return node;
		};

		DoublyLinkedList.prototype.removeAt = function(index) {
			var node = this.getNodeAt(index);
			this.remove(node);
		};

		DoublyLinkedList.prototype.remove = function(node) {
			if (node.forwardLink) {
				var fwNode = this._memoryBuffer.getByAddress(node.forwardLink);
				fwNode.backwardLink = node.backwardLink || null;
				if (!node.backwardLink) this._head = fwNode;
			}

			if (node.backwardLink) {
				var bwNode = this._memoryBuffer.getByAddress(node.backwardLink);
				bwNode.forwardLink = node.forwardLink || null;
				if (!node.forwardLink) this._tail = bwNode;
			}

			this._memoryBuffer.remove(node);
			this._length--;
		};

		DoublyLinkedList.prototype.clear = function() {
			var node = this._tail;
			for (var i = 0; i < this._length; i++) {
				this._memoryBuffer.remove(node);
				node = this._memoryBuffer.getByAddress(node.backwardLink);
			}
			this._head = null;
			this._tail = null;
			this._length = 0;
		};

		DoublyLinkedList.prototype.getLength = function() {
			return this._length;
		};

		DoublyLinkedList.prototype.getNodeAt = function(index) {
			var reverseSearch = index > Math.ceil(this._length * 0.5);
			var iterator = 0;
			var finalIteration = reverseSearch ? this._length - index - 1 : index;
			var node = reverseSearch ? this._tail : this._head;

			while (iterator < finalIteration) {
				var nextLink = reverseSearch ? node.backwardLink : node.forwardLink;
				node = this._memoryBuffer.getByAddress(nextLink);
				iterator++;
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
		};

		DoublyLinkedList.prototype.getLog = function() {
			var log = "";
			this.forEach(function(node, index) {
				log += index + ": " + node.data.toString();
				log += this.isNodeFirst(node) ? ' (head)' : this.isNodeLast(node) ? ' (tail)' : '';
				log += "\n\n     address: " + node._address;
				log += "\n     FW pointer: " + node.forwardLink + (node.forwardLink ? ' (' + this._memoryBuffer.getByAddress(node.forwardLink).data + ')' : '');
				log += "\n     BW pointer: " + node.backwardLink  + (node.backwardLink ? ' (' + this._memoryBuffer.getByAddress(node.backwardLink).data + ')' : '');
				log += "\n\n"
			}, this);
			return log;
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
