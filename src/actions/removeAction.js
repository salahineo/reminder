// Get Remove Action Type
import {REMOVE_REMINDER} from "./actionTypes";

const removeAction = (id) => {
  return {
    type: REMOVE_REMINDER,
    id: id
  };
};

export default removeAction;
