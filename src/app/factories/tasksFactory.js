(function() {
	'use strict';

	angular.module('rampup').factory('$tasks', TasksFactory);

	function TasksFactory($http, $location, $routeParams) {
		var factory = {};

		factory.categories = [];
		factory.filteredTasks = [];
		factory.activeCategory = null;
		factory.activeTask = null;

		factory.setCategoryActive = setCategoryActive;
		factory.setTaskActive = setTaskActive;

		$http.get('/data/tasks.json').success(function(responseData) {
			factory.categories = responseData.categories;
			tryParseCategoryAndTaskFromRoute();
		});

		function setCategoryActive(category) {
			factory.activeCategory = category;
			factory.filteredTasks = factory.activeCategory.tasks;
			factory.activeTask = null;
			$location.path('/category/' + factory.activeCategory.key);
		};

		function setTaskActive(task) {
			factory.activeTask = task;
			$location.path('/category/' + factory.activeCategory.key + '/task/' + factory.activeTask.key);
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

			for (var i = 0; i < factory.activeCategory.tasks.length; i++) {
				var task = factory.activeCategory.tasks[i];
				if (task.key === taskKey) return task;
			}
		}

		function tryParseCategoryAndTaskFromRoute() {
			var category = getCategoryByKey($routeParams.category);

			if (category) {
				factory.activeCategory = category;
				factory.filteredTasks = category.tasks;
				factory.activeTask = getTaskByKey($routeParams.task) || null;
			}
		}

		return factory;
	}

})();
