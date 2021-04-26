// Action Types
import {ADD_REMINDER} from "../actions/actionTypes";

// Root Reducer
const root = (state = [], action) => {
  // Check Add Action
  if (action.type === ADD_REMINDER) {
    // Set LastID to 0 (If State Empty)
    let lastID = 0;
    // If State Have Objects
    if (state.length !== 0) {
      // Get Last Id Of State
      lastID = state[state.length - 1].id;
    }
    // Push New Reminder To State
    state = [...state, {id: (lastID + 1), note: action.note, date: action.date}];
    // Return State
    return state;
  }
  // Return State
  return state;
};

// Export Reducer
export default root;
