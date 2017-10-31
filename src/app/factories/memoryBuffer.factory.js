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
			for (var address in this._buffer) {
				if (this._buffer[address] === object){
					delete this._buffer[address];
					return;
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
			var rand = Math.floor(Math.random() * 10000);
			return '0x' + ("0000" + rand.toString(16)).substr(-4);
		};

		MemoryBuffer.prototype.forEach = function(callback, context) {
			for (var address in this._buffer) {
				callback.call(context, this._buffer[address], address);
			}
		};

		return MemoryBuffer;
	}

})();
