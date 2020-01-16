var apikey = "1c4ae31e679195edfe349812ae4eba2bc44e4bde4dcfc92d7f741df36528e389"

// Load existing ToDos
var list = new XMLHttpRequest();
list.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todo = JSON.parse(this.responseText);
        for(var index = 0; index < todo.length; index++){
          DoTodo(todo[index]);
        }
    } 
    else if (this.readyState == 4){
        console.log(this.responseText);
    }
};
list.open("GET", "https://api.kraigh.net/todos", true);
list.setRequestHeader("x-api-key",apikey);
list.send();

// handle new todo form submit and display ToDos on page
document.getElementById("CreatenewForm").addEventListener("submit",function(event) {
  event.preventDefault();
    var inputData = {
      text: newTitle.value
    }
    var create = new XMLHttpRequest();
    create.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          DoTodo(JSON.parse(this.responseText));
        } 
        else if (this.readyState == 4) {
          console.log(this.responseText);
        }
    };
    create.open("POST", "https://api.kraigh.net/todos/", true);
    create.setRequestHeader("Content-type", "application/json");
    create.setRequestHeader("x-api-key", apikey);
    create.send(JSON.stringify(inputData));
});



// display new Todo on page
function DoTodo(todoData){

  var createnew = document.createElement("article");
  createnew.setAttribute("id", todoData.id);
  createnew.classList.add("todo");
  if (todoData.completed){
    createnew.classList.add("completed");
  }

  var completeButton = document.createElement("button");
  completeButton.classList.add("check");
  createnew.appendChild(completeButton);
  var textOfTodo = document.createElement("p");
  textOfTodo.innerHTML = todoData.text;
  createnew.appendChild(textOfTodo);

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerText = "-";
  createnew.appendChild(deleteButton);

  document.getElementById("TodoList").appendChild(createnew);
  completeButton.addEventListener("click",completeTodo);
  deleteButton.addEventListener("click",deleteTodo);
  document.getElementById("newTitle").value = '';
}


// Handle Todo completion
var complete = new XMLHttpRequest();

function completeTodo(event){
      console.log(event);
      var idOfTodo = event.target.parentNode.id;
      var inputStatusData = {
        completed: true
      };
      complete.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          event.target.parentNode.classList.add("completed");
        } 
        else if (this.readyState == 4) {
          console.log(this.responseText)
        }
      };

complete.open("PUT", "https://api.kraigh.net/todos/" + idOfTodo, true);
complete.setRequestHeader("Content-type", "application/json");
complete.setRequestHeader("x-api-key", apikey);
complete.send(JSON.stringify(inputStatusData));
}


// Handle Todo completion
function deleteTodo(event){
      var idOfTodo = event.target.parentNode.id;
      var deletereq = new XMLHttpRequest();
      deletereq.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          event.target.parentNode.remove();
        } 
        else if (this.readyState == 4) {
          console.log(this.responseText);
        }
      }
      deletereq.open("DELETE", "https://api.kraigh.net/todos/" + idOfTodo, true);
      deletereq.setRequestHeader("Content-type", "application/json");
      deletereq.setRequestHeader("x-api-key", apikey);
      deletereq.send();
}
