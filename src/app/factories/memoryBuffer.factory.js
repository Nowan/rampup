(function() {
	'use strict';

	angular.module('rampup')
		.factory('MemoryBuffer', MemoryBufferFactory);

	function MemoryBufferFactory() {

		function MemoryBuffer() {
			this._buffer = [];
		}

		MemoryBuffer.prototype.add = function(object) {
			var address = this.generateAddress();
			this._buffer[address] = object;
			return address;
		};

		MemoryBuffer.prototype.addToSequence = function(sequence, object, index) {
			var byteSize = this.getObjectByteSize(object.data);
			var address = '0x' + (parseInt(sequence._address, 16) + index * byteSize).toString(16);

			if (object._address && this._buffer[object._address]) delete this._buffer[object._address];
			if (this._buffer[address]) this.shift(address, byteSize);

			this._buffer[address] = object;
			return address;
		};

		MemoryBuffer.prototype.shift = function(startAddress, byteSize, step) {
			var address = parseInt(startAddress, 16);
			byteSize = parseInt(byteSize);
			step = step || 1;

			var nextAddress = '0x' + (address + byteSize * Math.sign(step)).toString(16);
			var swapElement = this._buffer['0x' + address.toString(16)];

			while (this._buffer[nextAddress]) {
				var tmpElement = swapElement;
				swapElement = this._buffer[nextAddress];
				this._buffer[nextAddress] = tmpElement;
				address += byteSize;
				nextAddress = '0x' + (address + byteSize * Math.sign(step)).toString(16);
			}

			if (step > 0) {
				delete this._buffer[startAddress];
			}
			else {
				// delete element under last address
			}
		};

		MemoryBuffer.prototype.getObjectByteSize = function(object) {
			switch (typeof object) {
				case 'boolean':
					return 4;
				case 'string':
					return 22;
				case 'number':
					return 8;
				default:
					return 0;
			}
		};

		MemoryBuffer.prototype.remove = function(object) {
			for (var address in this._buffer) {
				if (this._buffer[address] === object){
					delete this._buffer[address];
					return;
				}
			}
		};

		MemoryBuffer.prototype.removeFromSequence = function(sequence, index) {
			var byteSize = this.getObjectByteSize(this._buffer[sequence._address].data);
			var address = '0x' + (parseInt(sequence._address, 16) + index * byteSize).toString(16);
			delete this._buffer[address];
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
			var rand = Math.floor(Math.random() * 10000) + 3000;
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
