var my_angular_app = angular.module('my_angular_app',[]);

my_angular_app.controller("home_controller", function($scope){
	var socket = io();
	$scope.title = "Lista de Tareas";
	$scope.taskList = [];
	$scope.newTask = "";
	
	socket.on("tasks_list", function(params){
		$scope.taskList = params;
		$scope.newTask = "";
		$scope.$apply();
	});
	socket.on("task_added", function(params){
		alert(params.message);
		socket.emit("get_tasks_list");
	});
	socket.on("task_updated", function(params){
		alert(params.message);
		socket.emit("get_tasks_list");
	});
	
	$scope.addTask = function()
	{
		socket.emit("add_task", {
			task : $scope.newTask,
			done : false
		});
	};
	socket.emit("get_tasks_list");
	
	$scope.taskStatusChanged = function(task)
	{
		socket.emit("update_task", task);
	};
});
