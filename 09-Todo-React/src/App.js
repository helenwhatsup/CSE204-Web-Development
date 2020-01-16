import React, { Component } from 'react';
import Todo from './T\odo'
import NewTodo from './NewTodo'
import './App.css';
import SortTodo from './SortTodo'

//mine
var apiKey = "e7c3d0-7da9dc-5259f6-010a23-43707c"
//deploy

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      input: ''
    }
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sortAlphabetically = this.sortAlphabetically.bind(this); 
   
  }

  onChange(event){
    this.setState({
      input: event.target.value
    });
  }

  addTodo(event) {
      event.preventDefault();
        var thisSelf = this;
        var data = {
          text: thisSelf.state.input
        };
        var requestCreated = new XMLHttpRequest();
        requestCreated.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200) {
              thisSelf.setState({
                todos: [...thisSelf.state.todos, JSON.parse(this.responseText)]
              });
              thisSelf.setState({input: ''});
              console.log(JSON.parse(this.responseText)); // debug
            } 
            else if (this.readyState === 4) {
              console.log(this.responseText);
            }
        };
        requestCreated.open("POST", "https://cse204.work/todos", true);
        requestCreated.setRequestHeader("Content-type", "application/json");
        requestCreated.setRequestHeader("x-api-key", apiKey);
        requestCreated.send(JSON.stringify(data));
  }

  deleteTodo(id){
        var thisSelf = this;
        var requestDeleted = new XMLHttpRequest();
        requestDeleted.onreadystatechange = function(){
          if (this.readyState === 4 && this.status === 200) {
            const remainedTodos = thisSelf.state.todos.filter((todo) => {
              if (todo.id !== id){
                return todo;
              }
            });
            thisSelf.setState({ todos: remainedTodos });
          } 
          else if (this.readyState === 4) {
            console.log(this.responseText);
          }
        }
        requestDeleted.open("DELETE", "https://cse204.work/todos/" + id, true);
        requestDeleted.setRequestHeader("Content-type", "application/json");
        requestDeleted.setRequestHeader("x-api-key", apiKey);
        requestDeleted.send();
  }
  
  sortAlphabetically(){
    const todos = this.state.todos; 
    todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    })
    this.setState({todos: todos});
  }

  
  render() {
    return (
      <section id= "todos">
      <button onClick={this.sortAlphabetically} className="sortBtn">Sort by Alphabets</button> 
      <h3 id = "intro"><mark>Todo App</mark>  for  WashU Kids</h3>
      <NewTodo addTodo={this.addTodo} input={this.state.input} onChange={this.onChange}/>
      {this.state.todos.map((todo) =>
        <Todo key={todo.id} id={todo.id} completed={todo.completed}
        text={todo.text} deleteTodo={this.deleteTodo}/>
      )}
      </section>
    );
  }

  componentDidMount(){                                                                              
    let todo=[];
    var thisSelf = this;
    var requestListed = new XMLHttpRequest();
    requestListed.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var todos = JSON.parse(this.responseText);
        console.log(todos); // debug
        thisSelf.setState({todos: todos});
      } 
    else if (this.readyState === 4){
        console.log(this.responseText);
      }
    }
    requestListed.open("GET", "https://cse204.work/todos", true);
    requestListed.setRequestHeader("content-type","application/json");
    requestListed.setRequestHeader("x-api-key",apiKey);
    requestListed.send();
  }
  
}
export default App;