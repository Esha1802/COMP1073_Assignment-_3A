let addButton = document.getElementsByTagName("button")[0];
let taskInput = document.getElementById("newTaskInput");//Task Input.
let incompleteTaskHolder = document.getElementById("incomplete_tasks");//List of Incomplete Items
let completedTasksHolder = document.getElementById("completed_tasks");//List of Completed Items


let createNewTask = function (taskString) {

	let listItem = document.createElement("li");
	let checkBox = document.createElement("input");
	let label = document.createElement("label");
	let editInput = document.createElement("input");
	let editButton = document.createElement("button");

	let deleteButton = document.createElement("button");

	label.innerText = taskString;

	checkBox.type = "checkbox";
	editInput.type = "text";
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	//Appending to List.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

let addNewTask = function () {
	let listItem = createNewTask(taskInput.value);

	//Append listItem to incomplete
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

//Edit task.
let editTask = function () {
	let listItem = this.parentNode;

	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");

	if (containsClass) {
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}

	listItem.classList.toggle("editMode");
}

//Delete task.
let deleteTask = function () {
	let listItem = this.parentNode;
	let ul = listItem.parentNode;

	//Remove the parent list item
	ul.removeChild(listItem);

}

//Mark task completed
let taskCompleted = function () {
	//Append the task list item to the Completed Task List
	let listItem = this.parentNode;
	listItem.removeChild(listItem.getElementsByClassName('edit')[0]);
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}


let taskIncomplete = function () {
	let listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

//Set the click handler to the addTask function.
addButton.addEventListener("click", addNewTask);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let deleteButton = taskListItem.querySelector("button.delete");
	let  editButton=taskListItem.querySelector("button.edit");

	deleteButton.onclick = deleteTask;
	editButton.onclick=editTask;
	checkBox.onchange = checkBoxEventHandler;
}

//for each list item
for (const element of incompleteTaskHolder.children) {

	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(element, taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (const element of completedTasksHolder.children) {
	//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(element, taskIncomplete);
}
