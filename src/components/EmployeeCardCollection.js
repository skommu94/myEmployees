import React, { Component } from 'react';
import EmployeeCard from './EmployeeCard';

class EmployeeCardCollection extends Component {
  render() {
    const { employees } = this.props;

    return (
      <div className="employee-card-collection">
        <h1>Employee List</h1>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    );
  }
}

export default EmployeeCardCollection;
