import { Reducer } from "redux";
import { SET_VISIBILITY, T_SET_VISO_ACTION, VISO } from "../constants/types";

const setViso: Reducer<VISO, T_SET_VISO_ACTION> = (
  viso = VISO.SHOW_ALL,
  { type, payload }
) => {
  if (type === SET_VISIBILITY) return payload;
  else return viso;
};

export default setViso;
