(function() {
	'use strict';

	angular.module('rampup')
		.controller('SinglyLinkedListController', SinglyLinkedListController);

	/** @ngInject */
	function SinglyLinkedListController() {
		var vm = this;

		vm.title = "Singly Linked List"
	}

})();