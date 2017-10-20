(function() {
	'use strict';

	angular.module('rampup')
		.controller('DoublyLinkedListController', DoublyLinkedListController);

	/** @ngInject */
	function DoublyLinkedListController() {
		var vm = this;

		vm.title = "Doubly Linked List"
	}

})();