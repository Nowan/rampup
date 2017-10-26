(function() {
	'use strict';

	angular.module('rampup')
		.factory('MemoryBuffer', MemoryBufferFactory);

	function MemoryBufferFactory(Node) {

		function MemoryBuffer() {
			this._buffer = [];
		}

		MemoryBuffer.prototype.add = function(object) {
			var address = this.generateAddress();
			this._buffer[address] = object;
			return address;
		};

		MemoryBuffer.prototype.remove = function(object) {
			this.removeByAddress(this.getAddressOf(object));
		};

		MemoryBuffer.prototype.removeByAddress = function(address) {
			this._buffer[address] = object;
		};

		MemoryBuffer.prototype.getByAddress = function(address) {
			return this._buffer[address];
		};

		MemoryBuffer.prototype.getAddressOf = function(object) {
			for (var address in this._buffer)
				if (this._buffer[address] === object) return address;
		};

		MemoryBuffer.prototype.generateAddress = function() {
			return Math.random().toString(36).substring(2, 15);
		};

		return MemoryBuffer;
	}

})();
