// Action Types
import {ADD_REMINDER} from "./actionTypes";

// Add Action Creator Function
export const addAction = (note, date) => {
  return {
    type: ADD_REMINDER,
    note: note,
    date: date
  };
};
