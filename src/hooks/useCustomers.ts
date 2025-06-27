import { useContext } from "react";
import { CustomersContext } from "../contexts/CustomersContext";

function useCustomers() {
  const context = useContext(CustomersContext);
  if (!context)
    throw new Error(
      "ERROR: CustomersContext was used outside of CustomersProvider!"
    );
  return context;
}

export default useCustomers;
