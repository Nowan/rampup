(function() {
	'use strict';

	angular.module('rampup')
		.factory('ArrayStructure', ArrayStructureFactory);

	function ArrayStructureFactory(MemoryBuffer) {

		function ArrayStructure(memoryBuffer) {
			var _memoryBuffer = memoryBuffer || new MemoryBuffer();
			var _array = {
				elements: [],
				_address: _memoryBuffer.generateAddress()
			};

			return new Proxy(_array, {
				get: function(target, key) {
					var prop = target.elements[key];
					if (typeof prop === 'function') prop.bind(this.elements);
					return prop;
				},

				set: function(target, index, value) {
					if (value) {
						var element = value instanceof ArrayElement ? value : new ArrayElement(value);
						element._address = _memoryBuffer.addToSequence(target, element, index);
						element._index = parseInt(index);
						target.elements[index] = element;
					}
					else {
						if (index >= target.elements.length - 1) _memoryBuffer.removeFromSequence(target, index);
						target.elements.splice(index, 1);
					}
					return true;
				}
			});
		}

		function ArrayElement(object) {
			this.data = object;
			this._index = 0;
			this._address = 0x0000;
		}

		return ArrayStructure;
	}

})();
