// Get Action Type
import {CLEAR_REMINDERS} from "./actionTypes";

const clearAllAction = () => {
  return {
    type: CLEAR_REMINDERS
  };
};

export default clearAllAction;
