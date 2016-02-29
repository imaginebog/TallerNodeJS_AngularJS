// Create express application
var express = require('express');
var app = express();

// Serving static files (http://expressjs.com/starter/static-files.html)
app.use(express.static(__dirname + '/public'));
// Routing for express (http://expressjs.com/guide/routing.html)
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});

// Start app and listen on port 3000 for connections
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


//Add custom dependencies
var db_connector = require("./my_modules/database_connector.js");

// Creates io for sockets
var io = require('socket.io')(server);	//Binds socket to http server
io.on('connection', function(socket) {
	//console.log("Connected. Id: " + socket.id);
	
	socket.on("get_tasks_list", function(){
		db_connector.getTasks(function(tasks){
			socket.emit("tasks_list", tasks);	
		});
		
	});
	
	socket.on("add_task", function(task){
		db_connector.addTask(task, function(success){
			var message = "";
			if(success)
				message = "La tarea fue agregada";
			else
				message = "La tarea ya existe";
			socket.emit("task_added", {
				success : success,
				message : message
			});
		});
	});
	
	socket.on("update_task", function(task){
		db_connector.updateTask(task, function(success){
			var message = "";
			if(success)
				message = "La tarea se actualizo";
			else
				message = "La tarea no se actualizo";
			socket.emit("task_updated", {
				success : success,
				message : message
			});
		});
	});
});