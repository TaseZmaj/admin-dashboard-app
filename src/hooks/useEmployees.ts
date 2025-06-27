import { useContext } from "react";
import { EmployeesContext } from "../contexts/EmployeesContext";

function useEmployees() {
  const context = useContext(EmployeesContext);
  if (!context)
    throw new Error(
      "ERROR: EmployeesContext was used outside of EmployeesProviders!"
    );
  return context;
}

export default useEmployees;
