(function() {
	'use strict';

	angular.module('rampup')
		.config(config);

	/** @ngInject */
	function config($logProvider) {
		$logProvider.debugEnabled(true);
	}

})();
