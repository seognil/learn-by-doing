import React from "react";

export const Todo = ({ todo: { text, done }, onClick }) => (
  <li onClick={onClick}>{done ? <del>{text}</del> : text}</li>
);
