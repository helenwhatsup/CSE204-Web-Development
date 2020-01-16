import React, { Component } from 'react';
import './NewTodo.css';
//jiang//

class NewTodo extends Component {
  render() {
    return (
      <div id="newTodo">
        <form id="newTodoForm" onSubmit={this.props.addTodo}>
          <input id="newtitle" type="text" placeholder="Please enter your todos" value={this.props.input} onChange={this.props.onChange}/>
          <button id="newSubmition">+</button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
