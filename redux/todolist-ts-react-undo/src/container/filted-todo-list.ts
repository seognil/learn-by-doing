import { connect } from "react-redux";
import { getToggleTodoAction } from "../actions";
import { TodoList } from "../components/todolist";
import { T_TodoApp } from "../constants/types";
import { getVisoTodos } from "../logic";

const mapStateToProps = ({
  present: { todos, visibility }
}: {
  present: T_TodoApp;
}) => ({
  todos: getVisoTodos(todos, visibility)
});

const mapDispatchToProps = { onTodoClick: getToggleTodoAction };

export const FiltedTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
