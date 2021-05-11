// Libraries
import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Components
import Footer from "../Footer/Footer";

// Action Creators
import addAction from "../../actions/addAction";
import removeAction from "../../actions/removeAction";
import clearAllAction from "../../actions/clearAllAction";

class App extends React.Component {
  // Local State To Store Input Values
  state = {
    note: "",
    date: ""
  };

  Reminders() {
    // Check If There Are Reminders Exist
    if (this.props.reminders.length) {
      return (
        <div className="app-reminders">
          <ul className="list-group">
            {
              this.props.reminders.map((reminder) => {
                return (
                  <li key={reminder.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="reminder d-flex flex-column">
                      <span className="note">{reminder.note}</span>
                      <span className="date">{moment(new Date(reminder.date)).fromNow()}</span>
                    </div>
                    <div className="control">
                      <span className="close bg-danger"
                            onClick={() => this.props.removeAction(reminder.id)}>&times;</span>
                    </div>
                  </li>
                );
              })
            }
          </ul>
          <button className="btn btn-danger btn-block"
                  onClick={() => this.props.clearAllAction()}>
            Clear All Reminders
          </button>
        </div>
      );
    } else {
      return (
        <div className="app-reminders">
          <p className="no-reminders">No Reminders Yet !!</p>
        </div>
      );
    }
  }

  validateInput(note, date) {
    if (note === "" || date === "") {
      // Show Error Message
      this.triggerAlert("All Inputs Are Required", "danger");
    } else {
      // Send Data To Save It In App State
      this.props.addAction(note, date);
      // Clear Local Component State (Input Values)
      this.setState({
        note: "",
        date: ""
      });
    }
  }

  triggerAlert(message, state) {
    // Set Alert Message
    document.querySelector(".alert-container").innerHTML = `<div class="alert alert-${state} alert-dismissible">
        <button class="close" onclick="document.querySelector('.alert-container').innerHTML = ''">&times;</button>
        ${message}
      </div>`;
  }

  // View
  render() {
    return (
      <div className="app">
        <div className="app-image">
          <img className="img-fluid" src={process.env.PUBLIC_URL + "/images/app.png"} alt="App" />
        </div>
        <div className="app-title">
          <h2>Tasks Reminder</h2>
        </div>
        <div className="alert-container">

        </div>
        <div className="app-input">
          <form onSubmit={(e) => e.preventDefault()}>
            <input className="form-control"
                   type="text"
                   placeholder="What do you want to do?"
                   value={this.state.note}
                   onChange={(e) => this.setState({note: e.target.value})} />
            <DatePicker
              className="form-control"
              selected={this.state.date}
              value={this.state.date}
              onChange={(date) => this.setState({date: date})}
              showTimeSelect
              timeFormat="HH:mm aa"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="When do you want to make it?"
            />
            <button className="btn btn-primary btn-block"
                    onClick={() => this.validateInput(this.state.note, this.state.date)}>
              Add Reminder
            </button>
          </form>
          {this.Reminders()}
        </div>
        <Footer />
      </div>
    );
  }
}

// Get State Function
const mapStateToProps = (state) => {
    return {
      reminders: state
    };
  }
;

// Trigger Action To State Function
const mapDispatchToProps = (dispatch) => {
    return {
      addAction: (note, date) => dispatch(addAction(note, date)),
      removeAction: (id) => dispatch(removeAction(id)),
      clearAllAction: () => dispatch(clearAllAction())
    };
  }
;

// Export App
export default connect(mapStateToProps, mapDispatchToProps)(App);
