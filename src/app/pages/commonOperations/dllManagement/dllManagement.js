(function() {
	'use strict';

	angular.module('rampup')
		.controller('DllManagementController', DllManagementController);

	/** @ngInject */
	function DllManagementController() {
		var vm = this;

		vm.title = "Doubly Linked List Management";
		vm.representationArray = [ { value: 10 }, { value: 40 }, { value: 50 } ];
		vm.memoryArray = [ { value: "asdf" }, { value: "teqgf" }, { value: "oasdgi" } ]

		vm.onAddElementClick = onAddElementClick;
		vm.onArrayElementClick = onArrayElementClick;

		function onAddElementClick() {

		}

		function onArrayElementClick(element) {

		}
	}

})();