// Libraries
import React from "react";
import {connect} from "react-redux";

// Actions
import {addAction} from "../../actions/addAction";


class App extends React.Component {
  // Local State To Store Input Values
  state = {
    note: "",
    date: ""
  };

  checkReminders() {
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
                      <span className="date">{reminder.date}</span>
                    </div>
                    <div className="control">
                      <span className="close bg-danger">&times;</span>
                    </div>
                  </li>
                );
              })
            }
          </ul>
          <button className="btn btn-danger btn-block">Clear All Reminders</button>
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
      this.triggerAlert("All Inputs Are Required", "danger");
    } else {
      // Send Data To Save It In App State
      this.props.addAction(note, date);
      // Clear Local Component State
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
          <img className="img-fluid" src="./images/app.png" alt="App" />
        </div>
        <div className="app-title">
          <h2>Reminder Notes</h2>
        </div>
        <div className="alert-container">

        </div>
        <div className="app-input">
          <form onSubmit={(e) => e.preventDefault()}>
            <input className="form-control"
                   type="text"
                   placeholder="What do you think?"
                   value={this.state.note}
                   onChange={(e) => this.setState({note: e.target.value})} />
            <input className="form-control"
                   type="datetime-local"
                   value={this.state.date}
                   onChange={(e) => this.setState({date: e.target.value})} />
            <button className="btn btn-primary btn-block"
                    onClick={() => this.validateInput(this.state.note, this.state.date)}>
              Add Reminder
            </button>
          </form>
          {this.checkReminders()}
        </div>
      </div>
    )
      ;
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
      addAction: (note, date) => dispatch(addAction(note, date))
    };
  }
;

// Export App
export default connect(mapStateToProps, mapDispatchToProps)(App);
