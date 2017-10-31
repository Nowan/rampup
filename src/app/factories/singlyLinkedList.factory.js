(function() {
	'use strict';

	angular.module('rampup')
		.factory('SinglyLinkedList', SinglyLinkedListFactory);

	function SinglyLinkedListFactory(MemoryBuffer, Node) {

		function SinglyLinkedList(memoryBuffer) {
			this._memoryBuffer = memoryBuffer || new MemoryBuffer();
			this._head = null;
			this._length = 0;
		}

		SinglyLinkedList.prototype.add = function(object) {
			return this.insert(object, 0);
		};

		SinglyLinkedList.prototype.insert = function(object, index) {
			if (index > this._length) throw "Invalid index " + index;

			var node = new Node(object, null, null);
			node._address = this._memoryBuffer.add(node);

			if (this._length > 0 && index < this._length) {
				var fwNode = this.getNodeAt(index);
				node.forwardLink = fwNode._address;
			}

			if (index > 0) {
				var bwNode = this.getNodeAt(index - 1);
				bwNode.forwardLink = node._address;
			}

			if (index === 0) this._head = node;

			this._length++;
			return node;
		};

		SinglyLinkedList.prototype.removeAt = function(index) {
			var node = this.getNodeAt(index);
			this.remove(node);
		};

		SinglyLinkedList.prototype.remove = function(node) {
			if (this.isNodeFirst(node)) {
				this._head = this._memoryBuffer.getByAddress(node.forwardLink);
			}
			else {
				var nodeIndex = this.getIndexOf(node);
				var bwNode = this.getNodeAt(nodeIndex - 1);
				bwNode.forwardLink = node.forwardLink;
			}

			this._memoryBuffer.remove(node);
			this._length--;
		};

		SinglyLinkedList.prototype.clear = function() {
			var node = this._head;
			for (var i = 0; i < this._length; i++) {
				this._memoryBuffer.remove(node);
				node = this._memoryBuffer.getByAddress(node.forwardLink);
			}
			this._head = null;
			this._length = 0;
		};

		SinglyLinkedList.prototype.getLength = function() {
			return this._length;
		};

		SinglyLinkedList.prototype.getNodeAt = function(index) {
			var iterator = 0;
			var node = this._head;

			while (iterator < index) {
				node = this._memoryBuffer.getByAddress(node.forwardLink);
				iterator++;
			}

			return node || null;
		};

		SinglyLinkedList.prototype.getIndexOf = function(node) {
			var iterator = 0;
			var iNode = this._head;
			var wasNodeFound = false;

			while (!wasNodeFound) {
				if (iNode === node) {
					wasNodeFound = true;
				}
				else {
					if (!iNode.forwardLink) break;
					iNode = this._memoryBuffer.getByAddress(iNode.forwardLink);
					iterator++;
				}
			}

			return wasNodeFound ? iterator : -1;
		};

		SinglyLinkedList.prototype.isEmpty = function() {
			return this._length > 0;
		};

		SinglyLinkedList.prototype.isNodeFirst = function(node) {
			return node === this._head;
		};

		SinglyLinkedList.prototype.forEach = function(callback, context) {
			var node = this._head;
			for (var i = 0; i < this._length; i++) {
				callback.call(context, node, i);
				node = this._memoryBuffer.getByAddress(node.forwardLink);
			}
		};

		return SinglyLinkedList;
	}

})();
