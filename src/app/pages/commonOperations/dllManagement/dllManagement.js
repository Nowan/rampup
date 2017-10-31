(function() {
	'use strict';

	angular.module('rampup')
		.controller('DllManagementController', DllManagementController);

	/** @ngInject */
	function DllManagementController(MemoryBuffer, DoublyLinkedList, $randomWord) {
		var vm = this;

		vm.title = "Doubly Linked List Management";
		vm.listRepresentationModel = [];
		vm.bufferRepresentationModel = [];
		vm.memoryBuffer = new MemoryBuffer();
		vm.list = new DoublyLinkedList(vm.memoryBuffer);
		vm.selectedNode = null;
		vm.insertionIndex = 0;
		vm.sampleLabel = "";

		vm.onAddElementClick = onAddElementClick;
		vm.onRemoveClick = onRemoveClick;
		vm.onClearClick = onClearClick;
		vm.onElementClick = onElementClick;
		vm.onInsertionIndexChange = onInsertionIndexChange;
		vm.onMouseEnterElement = onMouseEnterElement;
		vm.onMouseLeaveElement = onMouseLeaveElement;
		vm.onShuffleClick = onShuffleClick;
		vm.onSortClick = onSortClick;

		fillRepresentationModels();
		generateSampleLabel();

		function onAddElementClick() {
			instatiateNewNode(vm.sampleLabel, vm.insertionIndex);
			generateSampleLabel();
			if (vm.selectedNode) showHighlights(vm.selectedNode);
		}

		function onRemoveClick() {
			clearHighlights(vm.selectedNode);
			removeNode(vm.selectedNode);
			vm.selectedNode = null;
		}

		function onClearClick() {
			if (vm.selectedNode) {
				clearHighlights(vm.selectedNode);
				vm.selectedNode = null;
			}
			vm.list.clear();
			rebuildBufferModel();
			rebuildListModel();
		}

		function onElementClick(element) {
			if (vm.selectedNode) clearHighlights(vm.selectedNode);
			vm.selectedNode = element.node;
			showHighlights(vm.selectedNode);
			vm.insertionIndex = vm.listRepresentationModel.indexOf(element);
		}

		function onInsertionIndexChange() {
			vm.insertionIndex = Math.max(Math.min(vm.insertionIndex, vm.list.getLength()), 0);
		}

		function onMouseEnterElement(element) {
			showHighlights(element.node);
		}

		function onMouseLeaveElement(element) {
			clearHighlights(element.node);
			if (vm.selectedNode) {
				showHighlights(vm.selectedNode);
			}
		}

		function onShuffleClick() {
			shuffleArray(vm.listRepresentationModel);
		}

		function onSortClick() {
			rebuildListModel();
		}

		function showHighlights(node) {
			triggerHighlights(node, true);
		}

		function clearHighlights(node) {
			triggerHighlights(node, false);
		}

		function triggerHighlights(node, isVisible) {
			var highlight = (vm.list.isNodeFirst(node) || vm.list.isNodeLast(node)) ? 'static' : 'active';
			highlight = vm.selectedNode === node ? 'accent' : highlight;
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
				generateRandomWord().then(function(word) {
					instatiateNewNode(word)
				});
			}
		}

		function instatiateNewNode(word, index) {
			index = index || 0;

			vm.list.insert(word, index);
			rebuildBufferModel();
			rebuildListModel();
		}

		function removeNode(node) {
			vm.list.remove(node);
			rebuildListModel();
			rebuildBufferModel();
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

		function rebuildListModel() {
			vm.listRepresentationModel = [];
			vm.list.forEach(function(node) {
				vm.listRepresentationModel.push({ value: node.data, node: node });
			});
		}

		function rebuildBufferModel() {
			vm.bufferRepresentationModel = [];

			vm.memoryBuffer.forEach(function(node, address) {
				vm.bufferRepresentationModel.push({ value: address + ' (' + node.data.toString() + ')', node: node });
			});

			vm.bufferRepresentationModel.sort(function(a, b) {
				return parseInt(a.node._address, 16) > parseInt(b.node._address, 16);
			});
		}

		function generateSampleLabel() {
			var promise = generateRandomWord();
			promise.then(function(word) {
				vm.sampleLabel = word;
				return word;
			});
			return promise;
		}

		function generateRandomWord() {
			return $randomWord.next(3, 6);
		}

		function shuffleArray(array) {
			// Modern Fisher–Yates algorithm
			var j, x, i;
			for (i = array.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
                x = array[i];
                array[i] = array[j];
                array[j] = x;
			}
		}
	}

})();
