import { useMemo } from "react";
import { DataTableType } from "../utils/Types/utilTypes";
import useGoods from "./useGoods";

export default function useTableData(type: DataTableType) {
  switch (true) {
    case type.startsWith("goods"):
      const {
        getProductsList,
        getProduct,
        products,
        productsLoading,
        productsError,
      } = useGoods();

      const filteredData = useMemo(() => {
        if (!products) return [];
        switch (type) {
          case "goods/tires":
            return products.filter((item) => item.type === "Tire");
          case "goods/rims":
            return products.filter((item) => item.type === "Rim");
          case "goods/car_batteries":
            return products.filter((item) => item.type === "Car battery");
          case "goods":
          default:
            return products;
        }
      }, [products]);

      return {
        data: filteredData,
        loading: productsLoading,
        error: productsError,
        fetchItems: getProductsList,
        fetchItem: getProduct,
      };
    default:
      throw new Error(`ERROR: Invalid type ${type}`);
  }
}
