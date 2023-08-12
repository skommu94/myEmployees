import React, { Component } from "react";
import EmployeeCardCollection from "./components/EmployeeCardCollection";
import db from './db.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: db.employees,
      selectedEmployeeId: "",
      editorId: "",
      editorName: "",
      editorTitle: "",
      editorAvatarURL: "",
      isDeleted: false,
      error: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
   fetch('')
      .then((response) => response.json())
      .then((data) => this.setState({ employees: data })) 
  };

  handleDelete = () => {
    const { selectedEmployeeId, employees } = this.state;
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== parseInt(selectedEmployeeId)
    );
    this.setState({ employees: updatedEmployees, isDeleted: true });
  };

  handleGetAll = () => {
    this.fetchData();
  };

  handleFindById = () => {
    const { employees, editorId } = this.state;
    const selectedEmployee = employees.find(
      (employee) => employee.id === parseInt(editorId)
    );

    if (selectedEmployee) {
      this.setState({
        editorId: selectedEmployee.id,
        editorName: selectedEmployee.name,
        editorTitle: selectedEmployee.title,
        editorAvatarURL: selectedEmployee.avatarURL,
        error: "",
      });
    } else {
      this.setState({
        editorName: "",
        editorTitle: "",
        editorAvatarURL: "",
        error: "Employee not found.",
      });
    }
  };

  handleSave = () => {
    const { editorId, editorName, editorTitle, editorAvatarURL, employees } =
      this.state;

    const existingEmployee = employees.find(
      (employee) => employee.id === parseInt(editorId)
    );
    const updatedEmployees = [...employees];

    if (existingEmployee) {
      // Update existing employee
      existingEmployee.name = editorName;
      existingEmployee.title = editorTitle;
      existingEmployee.avatarURL = editorAvatarURL;
    } else {
      // Insert new employee
      const newEmployee = {
        id: parseInt(editorId),
        name: editorName,
        title: editorTitle,
        avatarURL: editorAvatarURL,
      };
      updatedEmployees.push(newEmployee);
    }

    this.setState({ employees: updatedEmployees, error: "" });
  };

  render() {
    const {
      employees,
      selectedEmployeeId,
      editorId,
      editorName,
      editorTitle,
      editorAvatarURL,
      isDeleted,
      error,
    } = this.state;

    return (
      <div className="app">
        <div className="header">
          <input
            type="text"
            value={selectedEmployeeId}
            onChange={(event) =>
              this.setState({ selectedEmployeeId: event.target.value })
            }
            placeholder="Employee ID"
          />
          <button onClick={this.handleDelete}>Delete</button>
        </div>
        <button onClick={this.handleGetAll}>Get All</button>
        {/* make use of the re-usable EmployeeCardCollection component */}
        <EmployeeCardCollection employees={employees} />
        <div className="find-section">
          <div>
            <label htmlFor="editorId">ID:</label>
            <input
              type="text"
              id="editorId"
              value={editorId}
              onChange={(event) =>
                this.setState({ editorId: event.target.value })
              }
              placeholder="Employee ID"
            />
            <button onClick={this.handleFindById}>Find</button>
          </div>
          <div>
            <label htmlFor="editorName">Name:</label>
            <input
              type="text"
              id="editorName"
              value={editorName}
              onChange={(event) =>
                this.setState({ editorName: event.target.value })
              }
              placeholder="Name"
            />
          </div>

          <div>
            <label htmlFor="editorTitle">Title:</label>
            <input
              type="text"
              id="editorTitle"
              value={editorTitle}
              onChange={(event) =>
                this.setState({ editorTitle: event.target.value })
              }
              placeholder="Title"
            />
          </div>
          <div>
            <label htmlFor="editorAvatarURL">Avatar URL:</label>
            <input
              type="text"
              id="editorAvatarURL"
              value={editorAvatarURL}
              onChange={(event) =>
                this.setState({ editorAvatarURL: event.target.value })
              }
              placeholder="Avatar URL"
            />
          </div>

          
          <button onClick={this.handleSave} className="save-btn">Save</button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>
    );
  }
}

export default App;
