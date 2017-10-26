(function() {
	'use strict';

	angular.module('rampup')
		.controller('DllManagementController', DllManagementController);

	/** @ngInject */
	function DllManagementController(MemoryBuffer, DoublyLinkedList) {
		var vm = this;

		vm.title = "Doubly Linked List Management";
		vm.listRepresentationModel = [];
		vm.bufferRepresentationModel = [];
		vm.memoryBuffer = new MemoryBuffer();
		vm.list = new DoublyLinkedList(vm.memoryBuffer);
		vm.counter = 1;

		vm.onAddElementClick = onAddElementClick;
		vm.onMouseEnterElement = onMouseEnterElement;
		vm.onMouseLeaveElement = onMouseLeaveElement;

		fillRepresentationModels();

		function onAddElementClick() {
			var node = vm.list.add(vm.counter);
			vm.bufferRepresentationModel.push({ value: node._address, node: node });
			updateRepresentationModel();
			vm.counter++;
		}

		function onMouseEnterElement(element) {
			showHighlights(element.node);
		}

		function onMouseLeaveElement(element) {
			clearHighlights(element.node);
		}

		function showHighlights(node) {
			triggerHighlights(node, true);
		}

		function clearHighlights(node) {
			triggerHighlights(node, false);
		}

		function triggerHighlights(node, isVisible) {
			var highlight = vm.list.isNodeFirst(node) || vm.list.isNodeLast(node) ? 'static' : 'active';
			highlight = isVisible ? highlight : 'regular';
			changeRepresentationHighlights(node, highlight);

			highlight = isVisible ? 'compare' : 'regular';

			if (node.forwardLink) {
				var fwNode = vm.memoryBuffer.getByAddress(node.forwardLink);
				changeRepresentationHighlights(fwNode, highlight);
			}

			if (node.backwardLink) {
				var bwNode = vm.memoryBuffer.getByAddress(node.backwardLink);
				changeRepresentationHighlights(bwNode, highlight);
			}
		}

		function changeRepresentationHighlights(node, highlight) {
			getListRepresentationElement(node).highlight = highlight;
			getBufferRepresentationElement(node).highlight = highlight;
		}

		function fillRepresentationModels() {
			for (var i = 0; i < 5; i++) {
				var node = vm.list.add(vm.counter);
				vm.bufferRepresentationModel.push({ value: node._address, node: node });
				vm.counter++;
			}
			updateRepresentationModel();
		}

		function updateRepresentationModel() {
			vm.listRepresentationModel = [];
			vm.list.forEach(function(node, index) {
				vm.listRepresentationModel.push({ value: node.data, node: node });
			}, this);
		}

		function getBufferRepresentationElement(node) {
			for (var i = 0; i < vm.bufferRepresentationModel.length; i++) {
				if (vm.bufferRepresentationModel[i].node === node)
					return vm.bufferRepresentationModel[i];
			}
		}

		function getListRepresentationElement(node) {
			for (var i = 0; i < vm.listRepresentationModel.length; i++) {
				if (vm.listRepresentationModel[i].node === node)
					return vm.listRepresentationModel[i];
			}
		}
	}

})();
