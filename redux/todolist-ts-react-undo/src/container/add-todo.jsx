import React from "react";
import { connect } from "react-redux";
import { getAddTodoAction } from "../actions";

let AddTodo = ({ dispatch }) => {
  let input;
  const submit = () => {
    input.value.trim() && dispatch(getAddTodoAction(input.value));
    input.value = "";
  };
  return (
    <div>
      <input
        ref={node => (input = node)}
        onKeyDown={e => {
          e.nativeEvent.key === "Enter" && submit();
        }}
      />
      <button onClick={submit}>Add tudo</button>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export { AddTodo };
