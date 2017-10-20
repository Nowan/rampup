(function() {
	'use strict';

	angular.module('rampup')
		   .run(runBlock);

	/** @ngInject */
	function runBlock($log, $rootScope, $tasks) {

		$rootScope.$on("$routeChangeStart", function(event, next, current) {
			$tasks.selectItemsByKeys(next.params.category, next.params.task);

			if ($tasks.activeTask) {
				next.$$route.templateUrl = $tasks.activeTask.templateUrl;
			}
		});

		$log.debug('runBlock end');
	}

})();
