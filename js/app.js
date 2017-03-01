var qMark = document.getElementById("qMark");
var pID = document.getElementById("pID");
var xMark = document.getElementById("xMark");

qMark.addEventListener("click", function() {
	pID.style.transition = "opacity 1.5s";
	pID.style.opacity = 1;
});

xMark.addEventListener("click", function() {
	pID.style.opacity = 0;
});

function get_todos() {
	var todos = new Array;
	var todos_str = localStorage.getItem("todo");
	if (todos_str != null) {
		todos = JSON.parse(todos_str);
	}
	return todos;
}

function add() {
	var task = document.getElementById("task").value;

	if (task === "") {
		alert("Must add an actual ToDo item!");
		return;
	}

	var todos = get_todos();

	if (todos.length >= 10) {
		alert("Maximum amount of items reached (7)");
	} else {
		todos.push(task);
		localStorage.setItem("todo", JSON.stringify(todos));
	}

	show();

	return false;
}

function show() {
	var todos = get_todos();

	var html = "<ul>";
	for (var i=0; i<todos.length; i++) {
		html += "<li>" + todos[i] + "<button class='remove' id='" + i + "'>&#x2212;</button></li>";
	};
	html += "</ul>";

	document.getElementById("todos").innerHTML = html;

	var buttons = document.getElementsByClassName("remove");
	for (var i=0; i<buttons.length; i++) {
		buttons[i].addEventListener("click", remove);
	};
}

function remove() {
	var id = this.getAttribute("id");
	var todos = get_todos();
	todos.splice(id, 1);
	localStorage.setItem("todo", JSON.stringify(todos));

	show();

	return false;
}

document.getElementById("add").addEventListener("click", add);
show();