import { useMemo } from "react";
import { DataTableType } from "../utils/Types/utilTypes";
import useGoods from "./useGoods";
import useServices from "./useServices";

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

      const filteredGoods = useMemo(() => {
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
      }, [products, type]);

      return {
        data: filteredGoods,
        loading: productsLoading,
        error: productsError,
        fetchItems: getProductsList,
        fetchItem: getProduct,
      };
    case type.startsWith("services"):
      const {
        getServicesList,
        getService,
        services,
        servicesLoading,
        servicesError,
      } = useServices();

      const filteredServices = useMemo(() => {
        if (!services) return [];
        switch (type) {
          case "services/tires":
            return services.filter((item) => item.type === "Tire service");
          case "services/undercarriage_repair":
            return services.filter(
              (item) => item.type === "Undercarriage repair"
            );
          case "services/oil_filter_change":
            return services.filter((item) => item.type == "Oil filter change");
          case "services/car_battery":
            return services.filter(
              (item) => item.type === "Car battery service"
            );
          case "services/auto_ac":
            return services.filter((item) => item.type === "Auto AC service");
          case "services":
          default:
            return services;
        }
      }, [services, type]);

      return {
        data: filteredServices,
        loading: servicesLoading,
        error: servicesError,
        fetchItems: getServicesList,
        fetchItem: getService,
      };
    default:
      throw new Error(`ERROR: Invalid type ${type}`);
  }
}
