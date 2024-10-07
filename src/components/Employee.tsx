import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectEmployee } from "../redux/employeeSlice";

interface EmployeeProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
  manager_id: number;
  countSubordinates: (employeeId: number) => number;
  employees: Array<{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_pic: string;
    manager_id: number;
  }>;
}

const Employee: React.FC<EmployeeProps> = ({
  id,
  first_name,
  last_name,
  email,
  profile_pic,
  countSubordinates,
  employees,
}) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const subordinates = employees.filter(
    (employee) => employee.manager_id === id
  );

  return (
    <div>
      <div
        className="employee-list-item"
        onClick={() => dispatch(selectEmployee(id))}
      >
        <img src={profile_pic} alt={first_name} />
        <div>
          <p>
            {first_name} {last_name}
          </p>
          <p>{email}</p>
        </div>
        <div className="subordinate-count">
          <p>{countSubordinates(id)} employees under</p>
        </div>
        {subordinates.length > 0 && (
          <button onClick={toggleExpand} className="expand-arrow">
            {isExpanded ? "⬆️" : "⬇️"}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="subordinate-list">
          {subordinates.map((subordinate) => (
            <div key={subordinate.id} className="subordinate-item">
              <p>
                {subordinate.first_name} {subordinate.last_name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employee;
