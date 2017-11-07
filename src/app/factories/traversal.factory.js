(function() {
	'use strict';

	angular.module('rampup')
		.factory('Traversal', TraversalFactory);

	function TraversalFactory() {

		function Traversal() {

		}

		Traversal.prototype.inorder = function(rootNode, callback, context) {

		};

		Traversal.prototype.preorder = function(rootNode, callback, context) {
			var stopFlag = callback.call(context, rootNode, rootNode.leftChild, rootNode.rightChild);

			if (!!rootNode.leftChild && !stopFlag)
				stopFlag = this.preorder(rootNode.leftChild, callback, context);
			if (!!rootNode.rightChild && !stopFlag)
				stopFlag = this.preorder(rootNode.rightChild, callback, context);

			return stopFlag;
		};

		Traversal.prototype.postorder = function(rootNode, callback, context) {
			if (!!rootNode.leftChild) this.preorder(rootNode.leftChild, callback, context);
			if (!!rootNode.rightChild) this.preorder(rootNode.rightChild, callback, context);

			callback.call(context, rootNode, rootNode.leftChild, rootNode.rightChild);
		};

		return new Traversal();
	}

})();
