'use strict';

angular
	.module('toDoApp', ['ngRoute'])
	.config($routeProvider =>
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: 'partials/main.html'
			})
			.when('/toDo', {
				controller: 'ToDoCtrl',
				templateUrl: 'partials/toDo.html'
			})
		)
	.controller('MainCtrl', function($scope, $http) {
		$http
			.get('/api/title')
			.then(({data: {title}}) =>
				$scope.title = title
			)
	})
	.controller('ToDoCtrl', function($scope, $http) {
		$scope.postNewTask = () => {
			const newTask = {
				task: $scope.task
			}

			$http
				.post('/api/items', newTask)
				// .then(() => $scope.items.push(newTask))
				.then(reloadPage())
				.catch(console.error)
		}

		$scope.RemoveItem = (id) => {
			// console.log("item to remove: ", id);
			$http
				.delete(`/api/items/${id}`)
				.then(reloadPage())
		}

		function reloadPage() {
			$http
				.get('/api/items') //route
				.then(({data: {items}}) => $scope.items = items)
			$scope.task = "";
		}

		reloadPage();

	})

