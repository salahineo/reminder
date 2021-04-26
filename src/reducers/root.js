// Action Types
import {ADD_REMINDER, CLEAR_REMINDERS, REMOVE_REMINDER} from "../actions/actionTypes";

// sfcookies Library
import {bake_cookie, read_cookie} from "sfcookies";

// Root Reducer
const root = (state, action) => {
  // Read Reminders From Cookies (If There Is No Value It Will Store As An Empty Array)
  state = read_cookie("tasks_reminder");
  // Check Add Action
  if (action.type === ADD_REMINDER) {
    // Set LastID to 0 (If State Empty)
    let lastID = 0;
    // If State Have Objects
    if (state.length !== 0) {
      // Get Last Id Of State
      lastID = state[state.length - 1].id;
    }
    // Append New Reminder To State
    state = [...state, {id: (lastID + 1), note: action.note, date: action.date}];
    // Save State To Cookies
    bake_cookie("tasks_reminder", state);
    // Return State
    return state;
  } else if (action.type === REMOVE_REMINDER) {
    // Filter Removed Reminder From Array
    state = state.filter(reminder => reminder.id !== action.id);
    // Save State To Cookies
    bake_cookie("tasks_reminder", state);
    // Return State
    return state;
  } else if (action.type === CLEAR_REMINDERS) {
    // Empty State
    state = [];
    // Save State To Cookies
    bake_cookie("tasks_reminder", state);
    // Return State
    return state;
  }
  // Return State
  return state;
};

// Export Reducer
export default root;
