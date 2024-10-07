import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockEmployees } from '../data/mockData';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  profile_pic: string;
  gender: string;
  street_address: string;
  city: string;
  manager_id: number;
  bio?: string;
}

interface EmployeesState {
  employees: Employee[];
  selectedEmployee?: Employee;
}

const initialState: EmployeesState = {
  employees: mockEmployees,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    selectEmployee(state, action: PayloadAction<number>) {
      const employee = state.employees.find((emp) => emp.id === action.payload);
      if (employee) {
        state.selectedEmployee = employee;
      }
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee(state, action: PayloadAction<number>) {
      state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      if (state.selectedEmployee?.id === action.payload) {
        state.selectedEmployee = undefined;
      }
    },
  },
});

export const { selectEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
