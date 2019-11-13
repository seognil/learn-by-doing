import * as React from 'react';
import ReactDOM from 'react-dom';

// import { createStore } from 'redux';
import { createStore } from '../redux-rebuild-core';
import { Provider, connect } from 'react-redux';

import { todoApp as todoAppReducer } from './reducers';
import { getAddAction, getVisoAction, getToggleAction } from './actions';
import { VISIBILITY, TodoItemGroup } from './types';

// * ================================================================================ render

const getFiltedTodos = (filter: VISIBILITY, todos: TodoItemGroup) => {
  switch (filter) {
    case VISIBILITY.SHOW_ALL:
      return todos;
    case VISIBILITY.SHOW_DONE:
      return todos.filter((e) => e.done === true);
    case VISIBILITY.SHOW_UNDONE:
      return todos.filter((e) => e.done === false);
    default:
      return todos;
  }
};

// * ----------------------------------------------------------------

const AddTodo = connect()(({ dispatch }) => {
  let $input;
  return (
    <>
      <input type="text" ref={(node) => ($input = node)} />
      <button
        onClick={() => {
          dispatch(getAddAction($input.value));
          $input.value = '';
        }}
      >
        add todo
      </button>
    </>
  );
});

// * ------------------------------------------------

const TodoItem = ({ onClick, done, text }) => (
  <li onClick={onClick}>{done ? <del>{text}</del> : text}</li>
);

// * ------------------------------------------------

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((item) => (
      <TodoItem key={item.id} {...item} onClick={() => onTodoClick(item.id)}></TodoItem>
    ))}
  </ul>
);

// * ------------------------------------------------

const FiltedTodoList = connect(
  (state) => ({
    todos: getFiltedTodos(state.visibilityFilter, state.todos),
  }),
  (dispatch) => ({
    onTodoClick: (id) => dispatch(getToggleAction(id)),
  }),
)(TodoList);

// * ------------------------------------------------

const Link = ({ actived, onClick, children }) =>
  actived ? (
    <span>{children}</span>
  ) : (
    <a href="#" onClick={onClick}>
      {children}
    </a>
  );

// * ------------------------------------------------

const FilterLink = connect(
  (state, { filter }) => ({
    actived: state.visibilityFilter === filter,
  }),
  (dispatch, { filter }) => ({
    onClick: () => dispatch(getVisoAction(filter)),
  }),
)(Link);

// * ------------------------------------------------

const Footer = () => (
  <p>
    Show:
    <FilterLink filter={VISIBILITY.SHOW_ALL}>all</FilterLink>{' '}
    <FilterLink filter={VISIBILITY.SHOW_UNDONE}>remaining</FilterLink>{' '}
    <FilterLink filter={VISIBILITY.SHOW_DONE}>done</FilterLink>
  </p>
);

// * ------------------------------------------------

const TodoApp = () => (
  <div>
    <AddTodo />
    <FiltedTodoList></FiltedTodoList>
    <Footer></Footer>
  </div>
);

// * ================================================================================

const $container = document.querySelector('#container');
const todoStore = createStore(todoAppReducer);

const render = () =>
  ReactDOM.render(
    <Provider store={todoStore}>
      <TodoApp />
    </Provider>,
    $container,
  );

render();

todoStore.dispatch(getAddAction(Math.random().toString(26)));
todoStore.dispatch(getAddAction(Math.random().toString(26)));
todoStore.dispatch(getAddAction(Math.random().toString(26)));
todoStore.dispatch(getAddAction(Math.random().toString(26)));

todoStore.dispatch(getToggleAction(todoStore.getState().todos[1].id));
todoStore.dispatch(getToggleAction(todoStore.getState().todos[3].id));

// * ================================================================================
