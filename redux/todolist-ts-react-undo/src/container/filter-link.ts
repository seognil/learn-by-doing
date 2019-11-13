import { connect } from "react-redux";
import { getSetVisoAction } from "../actions";
import { Link } from "../components/link";
import { T_TodoApp } from "../constants/types";

const mapStateToProps = (
  {
    present: { visibility }
  }: {
    present: T_TodoApp;
  },
  ownProps: any
) => ({
  actived: ownProps.filter === visibility
});

const mapDispatchToProps = (dispatch: Function, ownProps: any) => ({
  onClick() {
    dispatch(getSetVisoAction(ownProps.filter));
  }
});

export const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);
