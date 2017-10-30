(function() {
	'use strict';

	angular.module('rampup')
		.factory('MemoryBuffer', MemoryBufferFactory);

	function MemoryBufferFactory(Node) {

		function MemoryBuffer() {
			this._buffer = [];
			this._counter = 0;
		}

		MemoryBuffer.prototype.add = function(object) {
			var address = this.generateAddress();
			this._buffer[address] = object;
			return address;
		};

		MemoryBuffer.prototype.remove = function(object) {
			for (var address in this._buffer) {
				if (this._buffer[address] === object){
					this._buffer[address] = null;
				}
			}
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
			var address = '0x' + ("0000" + this._counter.toString(16)).substr(-4);
    	    this._counter++;
			return address;
		};

		return MemoryBuffer;
	}

})();
