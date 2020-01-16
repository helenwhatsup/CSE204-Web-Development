import React, { Component } from 'react';
import './Todo.css';
//mine
//
var apiKey = "e7c3d0-7da9dc-5259f6-010a23-43707c"
class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {
      completed: this.props.completed
    }
    this.CheckTodo = this.CheckTodo.bind(this);
    this.toDeleteTodo = this.toDeleteTodo.bind(this);
  }

  
  CheckTodo(event){
    var data = {
      completed: true
    }
    var thisSelf = this;
    var requestCompleted = new XMLHttpRequest();
    requestCompleted.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        thisSelf.setState({
          completed: true
        })
      } 
      else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    }
    requestCompleted.open("PUT", "https://cse204.work/todos/" + thisSelf.props.id, true);
    requestCompleted.setRequestHeader("Content-type", "application/json");
    requestCompleted.setRequestHeader("x-api-key", apiKey);
    requestCompleted.send(JSON.stringify(data));
    return Todo;
  }

  toDeleteTodo(event){
    this.props.deleteTodo(this.props.id);
  }

  render() {
      let CurrentTodo = "todo";
      if (this.state.completed) {
        CurrentTodo = "todo completed"
      }
      return (
        <article id={this.props.id} className={CurrentTodo}>
          <button className="check" onClick={this.CheckTodo}></button>
          <p>{this.props.text}</p>
          <button className="delete" onClick={this.toDeleteTodo}></button>
        </article>
    );
  }
}

export default Todo;
