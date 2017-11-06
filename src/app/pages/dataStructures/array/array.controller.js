(function() {
	'use strict';

	angular.module('rampup')
		.controller('ArrayController', ArrayController);

	/** @ngInject */
	function ArrayController(MemoryBuffer, ArrayStructure, $randomWord) {
		var vm = this;

		vm.title = "Array";
		vm.arrayRepresentationModel = [];
		vm.bufferRepresentationModel = [];
		vm.memoryBuffer = new MemoryBuffer();
		vm.array = new ArrayStructure(vm.memoryBuffer);
		vm.selectedElement = null;
		vm.insertionIndex = 0;
		vm.sampleLabel = "";

		vm.onAddElementClick = onAddElementClick;
		vm.onRemoveClick = onRemoveClick;
		vm.onClearClick = onClearClick;
		vm.onElementClick = onElementClick;
		vm.onInsertionIndexChange = onInsertionIndexChange;
		vm.onMouseEnterElement = onMouseEnterElement;
		vm.onMouseLeaveElement = onMouseLeaveElement;

		fillRepresentationModels();
		generateSampleLabel();

		function onAddElementClick() {
			for (var i = vm.array.length; i > vm.insertionIndex; i--) {
				vm.array[i] = vm.array[i - 1];
			}
			vm.array[vm.insertionIndex] = vm.sampleLabel;

			rebuildBufferModel();
			rebuildArrayModel();

			generateSampleLabel();

			if (vm.selectedElement) showHighlights(vm.selectedElement);
		}

		function onRemoveClick() {
			clearHighlights(vm.selectedElement);

			for (var i = vm.selectedElement._index; i < vm.array.length - 1; i++) {
				vm.array[i] = vm.array[i + 1];
			}
			vm.array[vm.array.length - 1] = null;

			rebuildArrayModel();
			rebuildBufferModel();
			vm.selectedElement = null;
		}

		function onClearClick() {
			if (vm.selectedElement) showHighlights(vm.selectedElement);

			for (var i = vm.array.length - 1; i >= 0; i--) {
				vm.array[i] = null;
			}

			rebuildArrayModel();
			rebuildBufferModel();
			vm.selectedElement = null;
		}

		function onElementClick(element) {
			if (vm.selectedElement) clearHighlights(vm.selectedElement);
			vm.selectedElement = element.element;
			showHighlights(vm.selectedElement);
			vm.insertionIndex = vm.arrayRepresentationModel.indexOf(element);
		}

		function onInsertionIndexChange() {
			vm.insertionIndex = Math.max(Math.min(vm.insertionIndex, vm.array.length), 0);
		}

		function onMouseEnterElement(element) {
			showHighlights(element.element);
		}

		function onMouseLeaveElement(element) {
			clearHighlights(element.element);
			if (vm.selectedElement) {
				showHighlights(vm.selectedElement);
			}
		}

		function showHighlights(element) {
			triggerHighlights(element, true);
		}

		function clearHighlights(element) {
			triggerHighlights(element, false);
		}

		function triggerHighlights(element, isVisible) {
			var highlight = element._index === 0 ? 'static' : 'active';
			highlight = vm.selectedElement === element ? 'accent' : highlight;
			highlight = isVisible ? highlight : 'regular';
			changeRepresentationHighlights(element, highlight);
		}

		function changeRepresentationHighlights(element, highlight) {
			getArrayRepresentationElement(element).highlight = highlight;
			getBufferRepresentationElement(element).highlight = highlight;
		}

		function getArrayRepresentationElement(element) {
			for (var i = 0; i < vm.arrayRepresentationModel.length; i++) {
				if (vm.arrayRepresentationModel[i].element === element)
					return vm.arrayRepresentationModel[i];
			}
		}

		function getBufferRepresentationElement(element) {
			for (var i = 0; i < vm.bufferRepresentationModel.length; i++) {
				if (vm.bufferRepresentationModel[i].element === element)
					return vm.bufferRepresentationModel[i];
			}
		}

		function fillRepresentationModels() {
			for (var i = 0; i < 5; i++) {
				generateRandomWord().then((function(word) {
					vm.array[this] = word;
					rebuildArrayModel();
					rebuildBufferModel();
				}).bind(i));
			}
		}

		function rebuildArrayModel() {
			vm.arrayRepresentationModel = [];
			for (var i = 0; i < vm.array.length; i++) {
				var element = vm.array[i];

				if (element)
					vm.arrayRepresentationModel.push({ value: '[' + element._index + ']\n\n' + element.data, element: element });
			}
		}

		function rebuildBufferModel() {
			vm.bufferRepresentationModel = [];

			vm.memoryBuffer.forEach(function(element, address) {
				vm.bufferRepresentationModel.push({ value: address + ' (' + element.data.toString() + ')', element: element });
			});

			vm.bufferRepresentationModel.sort(function(a, b) {
				return parseInt(a.element._address, 16) > parseInt(b.element._address, 16);
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
	}

})();
