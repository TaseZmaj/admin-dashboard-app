import { createContext, useCallback, useReducer } from "react";
import supabase from "../utils/supabase.ts";

// Types
import { Product } from "../utils/Types/modelTypes.ts";

type ErrorType = "Products failed to load" | "Product failed to load";

interface State {
  productLoading: boolean;
  productsLoading: boolean;
  products: Product[] | null;
  product: Product | null;
  error: ErrorType | null;
}

type Action =
  | { type: "products/loading" }
  | { type: "product/loading" }
  | { type: "products/loaded"; payload: Product[] }
  | { type: "product/loaded"; payload: Product }
  | { type: "products/failedToLoad" }
  | { type: "product/failedToLoad" };

interface GoodsContextType extends State {
  getProductsList: () => Promise<void>;
  getProduct: (id: number) => Promise<void>;
}

// Context
const initialState: State = {
  productsLoading: false,
  productLoading: false,
  products: null,
  product: null,
  error: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "products/loading":
      return { ...state, productsLoading: true };
    case "product/loading":
      return { ...state, productLoading: true };
    case "products/loaded":
      return { ...state, productsLoading: false, products: action.payload };
    case "product/loaded":
      return { ...state, productLoading: false, product: action.payload };
    case "products/failedToLoad":
      return {
        ...state,
        productsLoading: false,
        error: "Products failed to load" as ErrorType,
      };
    case "product/failedToLoad":
      return {
        ...state,
        productLoading: false,
        error: "Product failed to load" as ErrorType,
      };
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
  const [
    { products, product, productsLoading, productLoading, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getProductsList = useCallback(async () => {
    if (products && products.length > 0) {
      console.log("Products already fetched - skipping fetch!");
      return;
    }
    dispatch({ type: "products/loading" });
    console.log("Fetching products!");

    const { data: Goods, error } = await supabase.rpc("goods_inventory_query");

    if (Goods) {
      dispatch({ type: "products/loaded", payload: Goods });
      console.log("Successfully fetched products!");
    } else {
      dispatch({ type: "products/failedToLoad" });
      throw new Error(`ERROR: ${error?.message}`);
    }
  }, [products]);

  //TODO: Change the query here as to better match the needs of the
  // Single Product Page and also redirect to said page
  const getProduct = useCallback(
    async (targetId: number) => {
      if (product?.id && product?.id == targetId) {
        console.log("The product is already fetched, skipping fetch!");
        return;
      }
      dispatch({ type: "product/loading" });
      console.log("Fetching product!");

      let { data: Product, error } = await supabase
        .from("Goods")
        .select("*")
        .eq("id", targetId)
        .single();
      if (Product) {
        dispatch({ type: "product/loaded", payload: Product });
        console.log("Successfully fetched product!");
      } else {
        dispatch({ type: "product/failedToLoad" });
        throw new Error(`ERROR: ${error?.message}`);
      }
    },
    [product]
  );

  return (
    <GoodsContext.Provider
      value={{
        products,
        product,
        error,
        productLoading,
        productsLoading,
        getProduct,
        getProductsList,
      }}
    >
      {children}
    </GoodsContext.Provider>
  );
}

export { GoodsContext };
