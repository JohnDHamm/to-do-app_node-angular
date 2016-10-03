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
			.when('/editTask/:taskId', {
				controller: 'EditTaskCtrl',
				templateUrl: 'partials/editTask.html'
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

		$scope.editTask = (id) => {
			console.log("item id to edit: ", id);
			// $http
			// 	.get(`/api/editTask/${id}`)
			// 	.then((text) => console.log("original text: ", text))


		}

		function reloadPage() {
			$http
				.get('/api/items') //route
				.then(({data: {items}}) => $scope.items = items)
			$scope.task = "";
		}

		reloadPage();

	})
	.controller('EditTaskCtrl', function($scope, $http, $routeParams) {
		const editId = $routeParams.taskId;
		console.log("editId from routeParams: ", editId);

		$http
			.get(`/api/taskDescription/${editId}`)
			.then((data) => {
				const origText = data.data[0].task;
				console.log("origText: ", origText);
				$scope.editedTask = origText;
			})

		$scope.postEditedTask= () => {
			const editedTask = {
				task: $scope.editedTask
			}

			// $http
			// 	.patch()
		}
	})

