(function() {
	'use strict';

	angular.module('rampup').factory('$tasks', TasksFactory);

	function TasksFactory($http) {
		var factory = {};

		var staticData = null;
		var loadCallbacks = [];

		factory.getCategories = getCategories;
		factory.getTasksInCategory = getTasksInCategory;
		factory.isDataLoaded = isDataLoaded;

		Object.defineProperty(factory, "onDataLoaded", {
			get: function() {
				return function() {
					loadCallbacks.forEach(function(callback) {
						callback();
					}, this);
				}
			},

			set: function(callback) {
				if (isDataLoaded()) return;
				loadCallbacks.push(callback);
			}
		});

		function getCategories() {
			return isDataLoaded() ? staticData.categories : [];
		}

		function getTasksInCategory(categoryKey) {
			if (isDataLoaded()) {
				for (var i = 0; i < staticData.categories.length; i++) {
					var category = staticData.categories[i];
					if (category.key === categoryKey) {
						return category.tasks;
					}
				}
			}

			return [];
		}

		function isDataLoaded() {
			return staticData !== null && staticData !== undefined;
		}

		$http.get('/data/tasks.json').success(function(responseData) {
			staticData = responseData;
			factory.onDataLoaded();
		});

		return factory;
	}

})();
