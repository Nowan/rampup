(function() {
	'use strict';

	angular.module('rampup')
		.controller('DllManagementController', DllManagementController);

	/** @ngInject */
	function DllManagementController(MemoryBuffer, DoublyLinkedList) {
		var vm = this;

		vm.title = "Doubly Linked List Management";
		vm.representationArray = [ { value: 10 }, { value: 40 }, { value: 50 } ];
		vm.memoryArray = [ { value: "asdf" }, { value: "teqgf" }, { value: "oasdgi" } ];
		vm.memoryBuffer = new MemoryBuffer();
		vm.list = new DoublyLinkedList(vm.memoryBuffer);
		vm.counter = 0;

		vm.onAddElementClick = onAddElementClick;
		vm.onArrayElementClick = onArrayElementClick;

		function onAddElementClick() {
			addObjectToList(vm.counter);
			vm.counter++;
		}

		function onArrayElementClick(element) {

		}

		function addObjectToList(object) {
			var node = vm.list.add(object);

			//vm.memoryArray.push({value: address});
		}
	}

})();