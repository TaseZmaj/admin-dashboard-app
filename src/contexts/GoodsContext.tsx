import { createContext, useReducer } from "react";
import { ProductTypes } from "../utils/customTypes.ts";
import supabase from "../utils/supabase.ts";

// Types
interface Product {
  id: number;
  name: "string";
  type: ProductTypes;
}

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
  getProductsList: () => void;
  getProduct: () => void;
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

  const getProductsList = async () => {
    dispatch({ type: "loading" });

    const { data: Goods, error } = await supabase
      .from("Goods")
      .select("*")
      .returns<Product[]>();
    if (Goods) {
      dispatch({ type: "products/loaded", payload: Goods });
    } else {
      throw new Error(`ERROR: ${error.message}`);
    }
  };

  const getProduct = async () => {};

  // TODO: Test the context!

  // useEffect(() => {
  //   async function fetchGoods() {
  //     const { data, error } = await supabase.from("Goods").select("*");

  //     if (error) {
  //       console.log("SUPABASE ERROR: ", error);
  //     } else {
  //       console.log("Fetched data:", data);
  //     }
  //   }

  //   fetchGoods();
  // }, []);

  return (
    <GoodsContext.Provider
      value={{ products, product, isLoading, getProduct, getProductsList }}
    >
      {children}
    </GoodsContext.Provider>
  );
}

export { GoodsContext };
