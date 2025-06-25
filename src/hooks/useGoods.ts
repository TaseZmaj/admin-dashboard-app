import { useContext } from "react";
import { GoodsContext } from "../contexts/GoodsContext.tsx";

function useGoods() {
  const context = useContext(GoodsContext);
  if (!context)
    throw new Error("ERROR: GoodsContext was used outside of GoodsProvider");
  return context;
}

export default useGoods;
