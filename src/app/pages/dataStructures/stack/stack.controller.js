(function() {
	'use strict';

	angular.module('rampup')
		.controller('StackController', StackController);

	/** @ngInject */
	function StackController(SinglyLinkedList, $randomWord) {
		var vm = this;

		vm.title = "Stack";
		vm.representationModel = [];
		vm.list = new SinglyLinkedList();

		vm.onPushClick = onPushClick;
		vm.onPopClick = onPopClick;

		fillRepresentationModel();

		function onPushClick() {
			generateRandomWord().then(function(word) {
				vm.list.add(word);
				rebuildRepresentationModel();
			});
		}

		function onPopClick() {
			vm.list.removeAt(0);
			rebuildRepresentationModel();
		}

		function fillRepresentationModel() {
			for (var i = 0; i < 5; i++) {
				generateRandomWord().then(function(word) {
					vm.list.add(word);
					rebuildRepresentationModel();
				});
			}
		}

		function rebuildRepresentationModel() {
			vm.representationModel = [];
			vm.list.forEach(function(node, index) {
				vm.representationModel.push({ value: (vm.list._length - index - 1) + ': ' + node.data });
			});
		}

		function generateRandomWord() {
			return $randomWord.next(3, 6);
		}
	}

})();
