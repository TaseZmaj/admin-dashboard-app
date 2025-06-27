import { useMemo } from "react";
import { DataTableType } from "../utils/Types/utilTypes";
import useGoods from "./useGoods";
import useServices from "./useServices";
import useEmployees from "./useEmployees";
import useSalesChannels from "./useSalesChannels";
import useCustomers from "./useCustomers";
import useOrders from "./useOrders";
import useReviews from "./useReviews";

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
          case "services/other":
            return services.filter((item) => item.type === "Other");
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
    case type.startsWith("employees"):
      const {
        getEmployeesList,
        getEmployee,
        employees,
        employeesLoading,
        employeesError,
      } = useEmployees();

      const filteredEmployees = useMemo(() => {
        if (!employees) return [];
        switch (type) {
          case "employees/salespersons":
            return employees.filter((item) => item.type === "Salesperson");
          case "employees/servicemen":
            return employees.filter((item) => item.type === "Serviceman");
          case "employees":
          default:
            return services;
        }
      }, [employees, type]);

      return {
        data: filteredEmployees,
        loading: employeesLoading,
        error: employeesError,
        fetchItems: getEmployeesList,
        fetchItem: getEmployee,
      };
    case type.startsWith("salesChannels"):
      const {
        getSalesChannelsList,
        getSalesChannel,
        salesChannels,
        salesChannelsLoading,
        salesChannelsError,
      } = useSalesChannels();

      const filteredSalesChannels = useMemo(() => {
        if (!salesChannels) return [];
        switch (type) {
          case "sales_channels/physical_stores":
            return salesChannels.filter(
              (item) => item.type === "Physical store"
            );
          case "sales_channels/online_stores":
            return salesChannels.filter((item) => item.type === "Online store");
          case "sales_channels":
          default:
            return services;
        }
      }, [salesChannels, type]);

      return {
        data: filteredSalesChannels,
        loading: salesChannelsLoading,
        error: salesChannelsError,
        fetchItems: getSalesChannelsList,
        fetchItem: getSalesChannel,
      };
    case type.startsWith("customers"):
    case type.startsWith("orders"):
    case type.startsWith("reviews"):
    default:
      throw new Error(`ERROR: Invalid type ${type}`);
  }
}
