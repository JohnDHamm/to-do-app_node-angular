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

