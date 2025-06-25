import {
  Product,
  Order,
  Customer,
  Employee,
  Service,
  SalesChannel,
  Review,
} from "./modelTypes";

export type Percentage = `${
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100}%`;

export type NavLinks =
  | "dashboard"
  | "goods"
  | "services"
  | "employees"
  | "sales channels"
  | "customers"
  | "orders"
  | "compare"
  | "reviews"
  | "logout";

export type FilterGroups = "TimeFilter" | "AllTimeBtn" | "DateFilter";

export type DataTableType =
  | "goods"
  | "goods/tires"
  | "goods/rims"
  | "goods/car_batteries"
  | "services"
  | "services/tires"
  | "services/undercarriage_repair"
  | "services/oil_filter_change"
  | "services/car_battery"
  | "services/auto_ac"
  | "employees"
  | "employees/salespersons"
  | "employees/servicemen"
  | "sales-channels"
  | "customers"
  | "orders"
  | "reviews";

export type DataTableSchemaMap = {
  goods: Product;
  services: Service;
  orders: Order;
  customers: Customer;
  employees: Employee;
  reviews: Review;
  "sales-channels": SalesChannel;
};

export type ServicesErrorType =
  | "Services failed to load"
  | "Service failed to load";

export type ProductsErrorType =
  | "Products failed to load"
  | "Product failed to load";

export type EmployeesErrorType =
  | "Employees failed to load"
  | "Employee failed to load";

export type SalesChannelsErrorType =
  | "Sales channels failed to load"
  | "Sales channel failed to load";

export type CustomersErrorType =
  | "Customers failed to load"
  | "Customer failed to load";

export type OrdersErrorType = "Orders failed to load" | "Order failed to load";

export type ReviewsErrorType =
  | "Reviews failed to load"
  | "Review failed to load";

export type ErrorType =
  | ProductsErrorType
  | ServicesErrorType
  | EmployeesErrorType
  | SalesChannelsErrorType
  | CustomersErrorType
  | OrdersErrorType
  | ReviewsErrorType;
