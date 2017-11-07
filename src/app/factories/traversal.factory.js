(function() {
	'use strict';

	angular.module('rampup')
		.factory('Traversal', TraversalFactory);

	function TraversalFactory() {

		function Traversal() {

		}

		Traversal.prototype.inorder = function(rootNode, callback, context) {
			if (!rootNode) return false;

			var stopFlag = false;

			if (!!rootNode.leftChild && !stopFlag)
				stopFlag = this.inorder(rootNode.leftChild, callback, context);
			if (!stopFlag)
				stopFlag = callback.call(context, rootNode, rootNode.leftChild, rootNode.rightChild);
			if (!!rootNode.rightChild && !stopFlag)
				stopFlag = this.inorder(rootNode.rightChild, callback, context);

			return stopFlag;
		};

		Traversal.prototype.preorder = function(rootNode, callback, context) {
			if (!rootNode) return false;

			var stopFlag = callback.call(context, rootNode, rootNode.leftChild, rootNode.rightChild);
			if (!!rootNode.leftChild && !stopFlag)
				stopFlag = this.preorder(rootNode.leftChild, callback, context);
			if (!!rootNode.rightChild && !stopFlag)
				stopFlag = this.preorder(rootNode.rightChild, callback, context);

			return stopFlag;
		};

		Traversal.prototype.postorder = function(rootNode, callback, context) {
			if (!rootNode) return false;

			var stopFlag = false;

			if (!!rootNode.leftChild && !stopFlag)
				stopFlag = this.postorder(rootNode.leftChild, callback, context);
			if (!!rootNode.rightChild && !stopFlag)
				stopFlag = this.postorder(rootNode.rightChild, callback, context);
			if (!stopFlag)
				stopFlag = callback.call(context, rootNode, rootNode.leftChild, rootNode.rightChild);

			return stopFlag;
		};

		return new Traversal();
	}

})();
