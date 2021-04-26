// Action Types
import {ADD_REMINDER} from "./actionTypes";

// Add Action Creator Function
const addAction = (note, date) => {
  // Return Action
  return {
    type: ADD_REMINDER,
    note: note,
    date: date
  };
};

export default addAction
