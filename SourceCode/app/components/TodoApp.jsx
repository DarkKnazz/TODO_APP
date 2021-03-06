var React = require("react");
var uuid = require("node-uuid");
var moment = require("moment");

var TodoList = require("./TodoList");
var AddTodo = require("./AddTodo");
var TodoSearch = require("./TodoSearch");
var TodoAPI = require("../api/TodoAPI");

import styles from "../styles/foundation.css";

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      showCompleted: false,
      searchText: "",
      todos: TodoAPI.getTodos()
    }
  },
  handleAddTodo: function (text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    });
  },
  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos);
  },
  handleToggle: function (id) {
    var updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;
      }

      return todo;
    })

    this.setState({ todos: updatedTodos })
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    })
  },
  render: function () {
    var { todos, showCompleted, searchText } = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    return (
      <div>
        <h1 className={styles.pageTitle}>Todo App</h1>
        <div className={styles.pageContainer}>
          <TodoSearch onSearch={this.handleSearch} />
          <TodoList todos={filteredTodos} onToggle={this.handleToggle} />
          <AddTodo onAddTodo={this.handleAddTodo} />
        </div>
      </div >
    )
  }
});

module.exports = TodoApp;
