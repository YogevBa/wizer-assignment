import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Employee from './Employee';

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.employees);

  const countSubordinates = (employeeId: number) => {
    return employees.filter(employee => employee.manager_id === employeeId).length;
  };

  return (
    <div className="employee-list">
      {employees.map((employee) => (
        countSubordinates(employee.id) > 0 &&
        <Employee
          key={employee.id}
          id={employee.id}
          first_name={employee.first_name}
          last_name={employee.last_name}
          email={employee.email}
          profile_pic={employee.profile_pic}
          manager_id={employee.manager_id}
          countSubordinates={countSubordinates}
          employees={employees}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
