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
          case "goods/carBatteries":
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
          case "services/undercarriageRepairs":
            return services.filter(
              (item) => item.type === "Undercarriage repair"
            );
          case "services/oilFilterChanges":
            return services.filter((item) => item.type == "Oil filter change");
          case "services/carBattery":
            return services.filter(
              (item) => item.type === "Car battery service"
            );
          case "services/autoAc":
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
            return employees;
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
          case "salesChannels/physicalStores":
            return salesChannels.filter(
              (item) => item.type === "Physical store"
            );
          case "salesChannels/onlineStores":
            return salesChannels.filter((item) => item.type === "Online store");
          case "salesChannels":
          default:
            return salesChannels;
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
      const {
        getCustomersList,
        getCustomer,
        customers,
        customerLoading,
        customersError,
      } = useCustomers();

      const filteredCustomers = useMemo(() => {
        if (!customers) return [];
        switch (type) {
          case "customers/individuals":
            return customers.filter(
              (item) => item.type === "Individual customer"
            );
          case "customers/walkInCustomers":
            return customers.filter((item) => item.type === "Walk-in customer");
          case "customers/wholesalePartners":
            return customers.filter(
              (item) => item.type === "Wholesale partner"
            );
          case "customers/businessAccounts":
            return customers.filter((item) => item.type === "Business account");
          case "customers":
          default:
            return customers;
        }
      }, [customers, type]);

      return {
        data: filteredCustomers,
        loading: customerLoading,
        error: customersError,
        fetchItems: getCustomersList,
        fetchItem: getCustomer,
      };
    case type.startsWith("orders"):
    case type.startsWith("reviews"):
    default:
      throw new Error(`ERROR: Invalid type ${type}`);
  }
}
