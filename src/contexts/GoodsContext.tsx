import { createContext, useCallback, useReducer } from "react";
import supabase from "../utils/supabase.ts";

// Types
import { Product } from "../utils/Types/modelTypes.ts";

interface State {
  isLoading: boolean;
  products: Product[] | null;
  product: Product | null;
}

type Action =
  | { type: "loading" }
  | { type: "products/loaded"; payload: Product[] }
  | { type: "product/loaded"; payload: Product };

interface GoodsContextType extends State {
  getProductsList: () => Promise<void>;
  getProduct: (id: number) => Promise<void>;
}

// Context
const initialState: State = {
  isLoading: false,
  products: null,
  product: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "products/loaded":
      return { ...state, isLoading: false, products: action.payload };
    case "product/loaded":
      return { ...state, isLoading: false, product: action.payload };
    default:
      throw new Error("Unknown action type!");
  }
}

const GoodsContext = createContext<GoodsContextType | null>(null);

export default function GoodsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ products, product, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getProductsList = useCallback(async () => {
    if (products && products.length > 0) {
      console.log("Products already fetched - skipping fetch!");
      return;
    }
    console.log("Fetching!");
    dispatch({ type: "loading" });

    const { data: Goods, error } = await supabase
      .from("Goods")
      .select("id,name,type,brand,stock");

    // const { data: Goods, error } = await supabase
    //   .from("Goods")
    //   .select("id,name,type,brand,stock,Tires(price)");

    //TODO: FIX THE FETCHING - so that the price shows up

    if (Goods) {
      dispatch({ type: "products/loaded", payload: Goods });
    } else {
      // TODO: Add the error context setter function here instead of throwing an error
      throw new Error(`ERROR: ${error.message}`);
    }
  }, [products]);

  const getProduct = useCallback(async (id: number) => {}, []);

  return (
    <GoodsContext.Provider
      value={{ products, product, isLoading, getProduct, getProductsList }}
    >
      {children}
    </GoodsContext.Provider>
  );
}

export { GoodsContext };
