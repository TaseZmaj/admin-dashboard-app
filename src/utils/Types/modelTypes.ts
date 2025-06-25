export type ProductTypes = "Tire" | "Rim" | "Car battery";
export type ServiceTypes =
  | "Tire service"
  | "Undercarriage repair"
  | "Oil filter change"
  | "Car battery service"
  | "Auto AC service"
  | "Other";

interface Generic {
  id: number;
  name: string;
  sales_price: number;
  price_without_tax: number;
  cost: number;
}

export interface Product extends Generic {
  kind: "product";
  type: ProductTypes;
  brand: string;
  stock: number;
  diameter: number; //for the Rim Variants
}

export interface Service extends Generic {
  kind: "service";
  type: ServiceTypes;
}

export interface Employee extends Generic {
  kind: "employee";
}
export interface SalesChannel extends Generic {
  kind: "sales_channel";
}
export interface Customer extends Generic {
  kind: "customer";
}
export interface Order extends Generic {
  kind: "order";
}
export interface Review extends Generic {
  kind: "review";
}

export type DataTableItem =
  | Product
  | Service
  | Employee
  | SalesChannel
  | Customer
  | Order
  | Review;
