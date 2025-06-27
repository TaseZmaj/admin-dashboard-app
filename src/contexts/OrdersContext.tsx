import { createContext, useCallback, useReducer } from "react";
import { OrdersErrorType } from "../utils/Types/utilTypes.ts";
import supabase from "../utils/supabase.ts";

// Types
import { Order } from "../utils/Types/modelTypes.ts";

interface State {
  ordersLoading: boolean;
  orderLoading: boolean;
  orders: Order[] | [];
  order: Order | null;
  ordersError: OrdersErrorType | null;
}

type Action =
  | { type: "orders/loading" }
  | { type: "order/loading" }
  | { type: "orders/loaded"; payload: Order[] }
  | { type: "order/loaded"; payload: Order }
  | { type: "orders/failedToLoad" }
  | { type: "order/failedToLoad" };

interface OrdersContextType extends State {
  getOrdersList: () => Promise<void>;
  getOrder: (id: number) => Promise<void>;
}

// Context
const initialState: State = {
  ordersLoading: false,
  orderLoading: false,
  orders: [],
  order: null,
  ordersError: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "orders/loading":
      return { ...state, ordersLoading: true, ordersError: null };
    case "order/loading":
      return { ...state, orderLoading: true, ordersError: null };
    case "orders/loaded":
      return {
        ...state,
        ordersLoading: false,
        ordersError: null,
        orders: action.payload,
      };
    case "order/loaded":
      return {
        ...state,
        orderLoading: false,
        ordersError: null,
        order: action.payload,
      };
    case "orders/failedToLoad":
      return {
        ...state,
        ordersLoading: false,
        ordersError: "Orders failed to load." as OrdersErrorType,
      };
    case "order/failedToLoad":
      return {
        ...state,
        orderLoading: false,
        ordersError: "Order failed to load." as OrdersErrorType,
      };
    default:
      throw new Error(`ERROR: Unknown action type of ${action}!`);
  }
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export default function OrdersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    { orders, order, ordersLoading, orderLoading, ordersError },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getOrdersList = useCallback(async () => {
    dispatch({ type: "orders/loading" });
    console.log("Fetching orders!");

    const { data: orders, error } = await supabase.rpc(
      "orders_inventory_query"
    );

    if (orders) {
      dispatch({ type: "orders/loaded", payload: orders });
      console.log("Successfully fetched orders!");
    } else {
      dispatch({ type: "orders/failedToLoad" });
      throw new Error(`ERROR: ${error?.message}`);
    }
  }, [orders]);

  const getOrder = useCallback(
    async (targetId: number) => {
      if (order?.id && order?.id == targetId) {
        console.log(`Order #${order.id} is already fetched, skipping fetch!`);
        return;
      }
      dispatch({ type: "order/loading" });
      console.log("Fetching order!");

      const { data: Order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", targetId)
        .single();
      if (Order) {
        dispatch({ type: "order/loaded", payload: Order });
        console.log("Successfully fetched order!");
      } else {
        dispatch({ type: "order/failedToLoad" });
        throw new Error(`ERROR: ${error?.message}`);
      }
    },
    [order]
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        order,
        ordersError,
        orderLoading,
        ordersLoading,
        getOrder,
        getOrdersList,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export { OrdersContext };
