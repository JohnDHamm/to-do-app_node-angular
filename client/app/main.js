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
				.then(() => $scope.items.push(newTask))
				.catch(console.error)
		}

		$http
			.get('/api/items') //route
			.then(({data: {items}}) => $scope.items = items)
	})

