import React from "react";
import { connect } from "react-redux";
import { ActionCreators } from "redux-undo";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => {
  return (
    <p>
      <button onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </p>
  );
};

const mapStateToProps = state => ({
  // canUndo: true,
  // canRedo: true,
  canUndo: state.past.length > 0,
  canRedo: state.future.length > 0
});

const mapDispatchToProps = {
  onUndo: ActionCreators.undo,
  onRedo: ActionCreators.redo
};

UndoRedo = connect(mapStateToProps, mapDispatchToProps)(UndoRedo);

export { UndoRedo };
