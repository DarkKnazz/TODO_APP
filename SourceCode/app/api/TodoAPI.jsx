import $ from 'jquery';

module.exports = {
  setTodos: function (todos) {
    if ($.isArray(todos)) {
      localStorage.setItem("todos", JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function () {
    var stringTodos = localStorage.getItem("todos");
    var todos = [];
    if (stringTodos !== null) {
      try {
        todos = JSON.parse(stringTodos);
      } catch (e) {

      }
    }

    return $.inArray(todos) ? todos : [];
  }
}