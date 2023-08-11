import React, { Component } from 'react';

class EmployeeCard extends Component {
  render() {
    const { employee } = this.props;

    return (
      <div className="employee-card">
        <img src={employee.avatarURL} alt={`${employee.name}'s avatar`} className="avatar" />
        <h2>{employee.name}</h2>
        <p>Position: {employee.title}</p>
      </div>
    );
  }
}

export default EmployeeCard;
