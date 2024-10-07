import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, updateEmployee } from "../redux/employeeSlice";
import { RootState } from "../redux/store";
import { useForm } from "react-hook-form";

const EmployeeDetail: React.FC = () => {
  const employee = useSelector(
    (state: RootState) => state.employees.selectedEmployee
  );
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (employee) {
      reset({
        first_name: employee.first_name,
        last_name: employee.last_name,
        street_address: employee.street_address,
        city: employee.city,
        bio: employee.bio || "",
      });
    }
  }, [employee, reset]);

  const onSubmit = (data: any) => {
    if (employee) {
      dispatch(updateEmployee({ ...employee, ...data }));
    }
  };

  if (!employee) return <p>Select an employee</p>;

  return (
    <div className="employee-detail-container">
      <div className="employee-header">
        <img
          className="employee-avatar"
          src={employee.profile_pic}
          alt={employee.first_name}
        />
        <div className="employee-info">
          <h2>
            {employee.first_name} {employee.last_name}
          </h2>
          <p>{employee.email}</p>
          <p>{employee.city}</p>
        </div>
      </div>
      <form className="employee-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>First Name</label>
          <input className="form-input" {...register("first_name")} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input className="form-input" {...register("last_name")} />
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input className="form-input" {...register("street_address")} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input className="form-input" {...register("city")} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea className="form-textarea" {...register("bio")} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-save">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={() => reset()}>
            Cancel
          </button>
          <button
            className="btn-delete"
            onClick={() => dispatch(deleteEmployee(employee.id))}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetail;
