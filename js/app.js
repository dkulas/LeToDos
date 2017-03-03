var qMark = document.getElementById("qMark");
var pID = document.getElementById("pID");
var xMark = document.getElementById("xMark");

qMark.addEventListener("click", function() {
	pID.style.display = "block";
	pID.style.zIndex = 10;
});

xMark.addEventListener("click", function() {
	pID.style.display = "none";
	pID.style.zIndex = "none";
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
		alert("Maximum amount of items reached (10)");
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
		html += "<li>" + todos[i] + "<button class='remove' id='" + i + "'>&#10006;</button></li>";
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

document.getElementById('task').onkeydown = function(e){
   if(e.keyCode == 13){
     add();
   }
};
document.getElementById("add").addEventListener("click", add);
show();