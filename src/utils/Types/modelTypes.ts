export type ProductTypes = "Tire" | "Rim" | "Car battery";
export type ServiceTypes = "Oil change" | "Tire change" | "Tire repair";

interface Generic {
  id: number;
  name: string;
}

export interface Product extends Generic {
  type: ProductTypes;
  brand: string;
  stock: number;
  price: number;
  diameter: number; //for the Rim Variants
}

export interface Service extends Generic {
  type: ServiceTypes;
}

export interface Order extends Generic {}
export interface Customer extends Generic {}
export interface Employee extends Generic {}
export interface Review extends Generic {}
export interface SalesChannel extends Generic {}
