import { useContext } from "react";
import { OrdersContext } from "../contexts/OrdersContext";

function useOrders() {
  const context = useContext(OrdersContext);
  if (!context)
    throw new Error("ERROR: OrdersContext was used outside of OrdersProvider!");
  return context;
}

export default useOrders;
