import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, updateEmployee } from "../redux/employeeSlice";
import { RootState } from "../redux/store";
import { useForm } from "react-hook-form";

const EmployeeDetail: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const employee = useSelector(
    (state: RootState) => state.employees.selectedEmployee
  );
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  // Reset the form when a new employee is selected
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

  // Handle form submission (Save)
  const onSubmit = (data: any) => {
    if (employee) {
      dispatch(updateEmployee({ ...employee, ...data }));
      setIsEdit(false); // Exit edit mode after saving
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    reset(); // Reset form fields to original values
    setIsEdit(false); // Exit edit mode
  };

  // If no employee is selected, show a message
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
          <input
            className="form-input"
            {...register("first_name")}
            disabled={!isEdit} // Disable input when not in edit mode
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            className="form-input"
            {...register("last_name")}
            disabled={!isEdit} // Disable input when not in edit mode
          />
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input
            className="form-input"
            {...register("street_address")}
            disabled={!isEdit} // Disable input when not in edit mode
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            className="form-input"
            {...register("city")}
            disabled={!isEdit} // Disable input when not in edit mode
          />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            className="form-textarea"
            {...register("bio")}
            disabled={!isEdit} // Disable input when not in edit mode
          />
        </div>

        <div className="form-actions">
          {isEdit ? (
            <>
              <button type="submit" className="btn-save">
                Save
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-save"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}

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
