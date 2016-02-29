// Object to save tasks. The key is the task name
var tasksList = {};

/**
 * Adds a new task to the tasks list 
 * @param {Object} newTask new task object
 * @param {Object} callback function to call when operation is finished
 */
var addTask = function(newTask, callback)
{
	console.log("adding task ");
	console.log(newTask);
	if(tasksList[newTask.task])
		callback(false);
	else
	{
		tasksList[newTask.task] = newTask;
		callback(true);
	}
};
/**
 * Updates a task in the tasks list 
 * @param {Object} taskToEdit task to be edited
 * @param {Object} callback function to call when operation is finished
 */
var updateTask = function(taskToEdit, callback)
{
	console.log("updating task ");
	console.log(taskToEdit);
	if(!tasksList[taskToEdit.task])
		callback(false);
	else
	{
		tasksList[taskToEdit.task].done = taskToEdit.done;
		callback(true);
	}
};

/**
 * Returns the tasks list 
 * @param {Object} callback function to call when operation is finished
 */
var getTasks = function(callback)
{
	callback(tasksList);
};

module.exports = {
	addTask : addTask,
	getTasks : getTasks,
	updateTask : updateTask,
};
