export type ProductTypes = "Tire" | "Rim" | "Car battery";
export type ServiceTypes =
  | "Tire service"
  | "Undercarriage repair"
  | "Oil filter change"
  | "Car battery service"
  | "Auto AC service"
  | "Other";
export type EmployeeTypes = "Salesperson" | "Serviceman";
export type SalesChannelTypes = "Physical store" | "Online store";
export type CustomerTypes =
  | "Individual customer"
  | "Walk-in customer"
  | "Business account"
  | "Wholesale partner";
export type OrderTypes = "Online" | "On-site";
export type ReviewTypes =
  | "Goods review"
  | "Services review"
  | "Sales channel review";

interface Base {
  id: number;
}

export interface Product extends Base {
  type: ProductTypes;
  kind: "product";
  name: string;

  brand: string;
  stock: number;
  diameter: number; //for the Rim Variants

  sales_price: number;
  price_without_tax: number;
  cost: number;
}

export interface Service extends Base {
  type: ServiceTypes;
  kind: "service";
  name: string;

  sales_price: number;
  price_without_tax: number;
  cost: number;
}

export interface Employee extends Base {
  type: EmployeeTypes;
  kind: "employee";
  name: string;

  gender: string;
  email: string;
  phone_number: string;
  job_title: string;
  employment_status: string;
  is_active: boolean;
  salary: number;
}
export interface SalesChannel extends Base {
  type: SalesChannelTypes;
  kind: "sales_channel";
  name: string;

  address: string;
  is_active: boolean;
  start_date: Date;
  endDate: Date | null;
}
export interface Customer extends Base {
  type: CustomerTypes;
  kind: "customer";
  name: string | null;

  email: string | null;
  phone_number: string;
  alt_phone_number: string;
}
export interface Order extends Base {
  type: OrderTypes;
  kind: "order";

  customer_id: number;
  salesperson_id: number;
  sales_channel_id: number;
  delivery_status_type: string;
  // payment_method_type: string;
  order_date: number;
  shipping_cost: number;
}
export interface Review extends Base {
  type: ReviewTypes;
  kind: "review";

  customer_id: number;
  rating: number;

  good_id: number | null;
  service_id: number | null;
  sales_channel_id: number | null;
}

export type DataTableItem =
  | Product
  | Service
  | Employee
  | SalesChannel
  | Customer
  | Order
  | Review;
