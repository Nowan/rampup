(function() {
	'use strict';

	angular.module('rampup').factory('$tasks', TasksFactory);

	function TasksFactory($http, $location, $routeParams) {
		var factory = {};

		factory.categories = [];
		factory.filteredTasks = [];
		factory.activeCategory = null;
		factory.activeTask = null;

		factory.selectCategory = selectCategory;
		factory.selectTask = selectTask;
		factory.selectItemsByKeys = selectItemsByKeys;

		$http.get('/data/tasks.json').success(function(responseData) {
			factory.categories = responseData.categories;
			tryParseCategoryAndTaskFromRoute();
		});

		function selectCategory(categoryIndex) {
			$location.path('/category/' + factory.categories[categoryIndex].key);
		};

		function selectTask(taskIndex) {
			$location.path('/category/' + factory.activeCategory.key + '/task/' + factory.filteredTasks[taskIndex].key);
		};

		function getCategoryByKey(categoryKey) {
			if (!categoryKey) return null;

			for (var i = 0; i < factory.categories.length; i++) {
				var category = factory.categories[i];
				if (category.key === categoryKey) return category;
			}
		}

		function getTaskByKey(taskKey) {
			if (!taskKey || !factory.activeCategory) return null;

			for (var i = 0; i < factory.filteredTasks.length; i++) {
				var task = factory.filteredTasks[i];
				if (task.key === taskKey) return task;
			}
		}

		function selectItemsByKeys(categoryKey, taskKey) {
			var category = getCategoryByKey(categoryKey);

			factory.activeCategory = category;
			factory.filteredTasks = category ? category.tasks : [];
			factory.activeTask = getTaskByKey(taskKey);
		}

		function tryParseCategoryAndTaskFromRoute() {
			selectItemsByKeys($routeParams.category, $routeParams.task);
		}

		return factory;
	}

})();
