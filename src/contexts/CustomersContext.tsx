import { createContext, useCallback, useReducer } from "react";
import { CustomersErrorType } from "../utils/Types/utilTypes.ts";
import supabase from "../utils/supabase.ts";

// Types
import { Customer } from "../utils/Types/modelTypes.ts";

interface State {
  customersLoading: boolean;
  customerLoading: boolean;
  customers: Customer[] | [];
  customer: Customer | null;
  customersError: CustomersErrorType | null;
}

type Action =
  | { type: "customers/loading" }
  | { type: "customer/loading" }
  | { type: "customers/loaded"; payload: Customer[] }
  | { type: "customer/loaded"; payload: Customer }
  | { type: "customers/failedToLoad" }
  | { type: "customer/failedToLoad" };

interface CustomersContextType extends State {
  getCustomersList: () => Promise<void>;
  getCustomer: (id: number) => Promise<void>;
}

// Context
const initialState: State = {
  customersLoading: false,
  customerLoading: false,
  customers: [],
  customer: null,
  customersError: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "customers/loading":
      return { ...state, customersLoading: true, customersError: null };
    case "customer/loading":
      return { ...state, customerLoading: true, customersError: null };
    case "customers/loaded":
      return {
        ...state,
        customersLoading: false,
        customersError: null,
        customers: action.payload,
      };
    case "customer/loaded":
      return {
        ...state,
        customerLoading: false,
        customersError: null,
        customer: action.payload,
      };
    case "customers/failedToLoad":
      return {
        ...state,
        customersLoading: false,
        customersError: "Customers failed to load." as CustomersErrorType,
      };
    case "customer/failedToLoad":
      return {
        ...state,
        customerLoading: false,
        customersError: "Customer failed to load." as CustomersErrorType,
      };
    default:
      throw new Error(`ERROR: Unknown action type of ${action}!`);
  }
}

const CustomersContext = createContext<CustomersContextType | null>(null);

export default function customersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    { customers, customer, customersLoading, customerLoading, customersError },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getCustomersList = useCallback(async () => {
    dispatch({ type: "customers/loading" });
    console.log("Fetching Customers!");

    const { data: customers, error } = await supabase.rpc("customers_query");

    if (customers) {
      dispatch({ type: "customers/loaded", payload: customers });
      console.log("Successfully fetched Customers!");
    } else {
      dispatch({ type: "customers/failedToLoad" });
      throw new Error(`ERROR: ${error?.message}`);
    }
  }, [customers]);

  const getCustomer = useCallback(
    async (targetId: number) => {
      if (customer?.id && customer?.id == targetId) {
        console.log(
          `Customer #${customer.id} is already fetched, skipping fetch!`
        );
        return;
      }
      dispatch({ type: "customer/loading" });
      console.log("Fetching customer!");

      const { data: Customer, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", targetId)
        .single();
      if (Customer) {
        dispatch({ type: "customer/loaded", payload: Customer });
        console.log("Successfully fetched Customer!");
      } else {
        dispatch({ type: "customer/failedToLoad" });
        throw new Error(`ERROR: ${error?.message}`);
      }
    },
    [customer]
  );

  return (
    <CustomersContext.Provider
      value={{
        customers,
        customer,
        customersError,
        customerLoading,
        customersLoading,
        getCustomer,
        getCustomersList,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
}

export { CustomersContext };
