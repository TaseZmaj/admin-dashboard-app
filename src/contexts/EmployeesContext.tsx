import { createContext, useCallback, useReducer } from "react";
import { EmployeesErrorType } from "../utils/Types/utilTypes.ts";
import supabase from "../utils/supabase.ts";

// Types
import { Employee } from "../utils/Types/modelTypes.ts";

interface State {
  employeesLoading: boolean;
  employeeLoading: boolean;
  employees: Employee[] | [];
  employee: Employee | null;
  employeesError: EmployeesErrorType | null;
}

type Action =
  | { type: "employees/loading" }
  | { type: "employee/loading" }
  | { type: "employees/loaded"; payload: Employee[] }
  | { type: "employee/loaded"; payload: Employee }
  | { type: "employees/failedToLoad" }
  | { type: "employee/failedToLoad" };

interface EmployeesContextType extends State {
  getEmployeesList: () => Promise<void>;
  getEmployee: (id: number) => Promise<void>;
}

// Context
const initialState: State = {
  employeesLoading: false,
  employeeLoading: false,
  employees: [],
  employee: null,
  employeesError: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "employees/loading":
      return { ...state, employeesLoading: true, employeesError: null };
    case "employee/loading":
      return { ...state, employeeLoading: true, employeesError: null };
    case "employees/loaded":
      return {
        ...state,
        employeesLoading: false,
        employeesError: null,
        employees: action.payload,
      };
    case "employee/loaded":
      return {
        ...state,
        employeeLoading: false,
        employeesError: null,
        employee: action.payload,
      };
    case "employees/failedToLoad":
      return {
        ...state,
        employeesLoading: false,
        employeesError: "Employees failed to load." as EmployeesErrorType,
      };
    case "employee/failedToLoad":
      return {
        ...state,
        employeeLoading: false,
        employeesError: "Employee failed to load." as EmployeesErrorType,
      };
    default:
      throw new Error(`ERROR: Unknown action type of ${action}!`);
  }
}

const EmployeesContext = createContext<EmployeesContextType | null>(null);

export default function EmployeesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    { employees, employee, employeesLoading, employeeLoading, employeesError },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getEmployeesList = useCallback(async () => {
    dispatch({ type: "employees/loading" });
    console.log("Fetching employees!");

    const { data: employees, error } = await supabase.rpc(
      "employees_inventory_query"
    );

    if (employees) {
      dispatch({ type: "employees/loaded", payload: employees });
      console.log("Successfully fetched employees!");
    } else {
      dispatch({ type: "employees/failedToLoad" });
      throw new Error(`ERROR: ${error?.message}`);
    }
  }, [employees]);

  const getEmployee = useCallback(
    async (targetId: number) => {
      if (employee?.id && employee?.id == targetId) {
        console.log(
          `Employee #${employee.id} is already fetched, skipping fetch!`
        );
        return;
      }
      dispatch({ type: "employee/loading" });
      console.log("Fetching employee!");

      const { data: Employee, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", targetId)
        .single();
      if (Employee) {
        dispatch({ type: "employee/loaded", payload: Employee });
        console.log("Successfully fetched employee!");
      } else {
        dispatch({ type: "employee/failedToLoad" });
        throw new Error(`ERROR: ${error?.message}`);
      }
    },
    [employee]
  );

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        employee,
        employeesError,
        employeeLoading,
        employeesLoading,
        getEmployee,
        getEmployeesList,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}

export { EmployeesContext };
