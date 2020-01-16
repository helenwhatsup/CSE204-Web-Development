import React, { Component } from 'react';


class SortTodo extends Component {
  constructor(props){
    super(props)
    this.state = {
      sortByCompleted: props.sortByCompleted,
    }
  }

  resortTodos = (event) => {
    let newSort = event.target.value

    this.setState({
      currentSort: newSort
    });
    if(newSort === "completed"){
      this.state.sortByCompleted()
    } 
  }

  render() {
    return (
      <div className="sortTodo">
      Sorting by &nbsp; 
        <select value={this.state.currentSort} onChange={this.resortTodos}>
          <option value="date">Alphabet</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    );
  }
}


export default SortTodo;
