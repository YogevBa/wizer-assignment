import { useParams } from "react-router-dom";
import EmployeeDetail from "./EmployeeDetail";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const EmployeeDetailsByUsername: React.FC = () => {
  const { username } = useParams();
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const employee = employees.find((emp) => emp.username === username);

  if (!employee) return <p>No employee found</p>;

  return <EmployeeDetail />;
};

export default EmployeeDetailsByUsername;
