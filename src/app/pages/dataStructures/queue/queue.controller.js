(function() {
	'use strict';

	angular.module('rampup')
		.controller('QueueController', QueueController);

	/** @ngInject */
	function QueueController(DoublyLinkedList, $randomWord) {
		var vm = this;

		vm.title = "Queue";
		vm.representationModel = [];
		vm.list = new DoublyLinkedList();

		vm.onEnqueueClick = onEnqueueClick;
		vm.onDequeueClick = onDequeueClick;

		fillRepresentationModel();

		function onEnqueueClick() {
			generateRandomWord().then(function(word) {
				vm.list.insert(word, vm.list.getLength());
				rebuildRepresentationModel();
			});
		}

		function onDequeueClick() {
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
				vm.representationModel.push({ value: '[' + index + ']\n\n' + node.data });
			});
			vm.representationModel.reverse();
		}

		function generateRandomWord() {
			return $randomWord.next(3, 6);
		}
	}

})();
