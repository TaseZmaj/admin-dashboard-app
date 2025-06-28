import { DataTableType } from "./Types/utilTypes";

const TopBarHeight: number = 83;

//Table heading names
const goodsHeadings = [
  "id",
  "name",
  "type",
  "brand",
  "stock",
  "sales_price",
  "price_without_tax",
  "cost",
];
const serviceHeadings = [
  "id",
  "name",
  "type",
  "sales_price",
  "price_without_tax",
  "cost",
];
const employeesHeadings = [
  "id",
  "avatar",
  "name",
  "type",
  "email",
  "job_title",
  "is_active",
  "employment_status",
  "salary",
];
const salesChannelsHeadings = [
  "id",
  "name",
  "type",
  "address",
  "is_active",
  "start_date",
  "end_date",
];
const customersHeadings = [
  "id",
  "name",
  "type",
  "email",
  "phone_number",
  "alt_phone_number",
];
const ordersHeadings = [
  "id",
  "type",
  "customer_id",
  "salesperson_id",
  "delivery_status_type",
  "order_date",
  "shipping_cost",
];
const reviewsHeadings = [
  "id",
  "type",
  "customer_id",
  "rating",
  "reviewed_item",
];

const tableHeadings: Record<DataTableType, string[]> = {
  goods: goodsHeadings,
  "goods/tires": goodsHeadings,
  "goods/rims": goodsHeadings,
  "goods/carBatteries": goodsHeadings,
  services: serviceHeadings,
  "services/tires": serviceHeadings,
  "services/undercarriageRepairs": serviceHeadings,
  "services/oilFilterChanges": serviceHeadings,
  "services/carBattery": serviceHeadings,
  "services/autoAc": serviceHeadings,
  "services/other": serviceHeadings,
  employees: employeesHeadings,
  "employees/salespersons": employeesHeadings,
  "employees/servicemen": employeesHeadings,
  salesChannels: salesChannelsHeadings,
  "salesChannels/physicalStores": salesChannelsHeadings,
  "salesChannels/onlineStores": salesChannelsHeadings,
  customers: customersHeadings,
  "customers/individuals": customersHeadings,
  "customers/walkInCustomers": customersHeadings,
  "customers/wholesalePartners": customersHeadings,
  "customers/businessAccounts": customersHeadings,
  orders: ordersHeadings,
  "orders/onSite": ordersHeadings,
  "orders/online": ordersHeadings,
  reviews: reviewsHeadings,
  "reviews/goods": reviewsHeadings,
  "reviews/services": reviewsHeadings,
  "reviews/salesChannels": reviewsHeadings,
};

// Table heading widths (column widths)
const goodsTableHeadingSizes = {
  id: "5%",
  name: "20%",
  brand: "10%",
  type: "13%",
  stock: "7%",
  sales_price: "15%",
  price_without_tax: "15%",
  cost: "15%",
};

const servicesTableHeadingSizes = {
  id: "5%",
  name: "38%",
  type: "12%",
  sales_price: "15%",
  price_without_tax: "15%",
  cost: "15%",
};

const employeesTableHeadingSizes = {
  id: "5%",
  avatar: "5%",
  type: "10%",
  name: "15%",
  email: "15%",
  job_title: "10%",
  is_active: "10%",
  employment_status: "15%",
  salary: "10%",
};

const salesChannelsTableHeadingSizes = {
  id: "5%",
  name: "30%",
  type: "10%",
  address: "25%",
  is_active: "10%",
  start_date: "10%",
  end_date: "10%",
};

const customersTableHeadingSizes = {
  id: "5%",
  name: "30%",
  type: "10%",
  email: "25%",
  phone_number: "15%",
  alt_phone_number: "15%",
};

const ordersTableHeadingSizes = {
  id: "5%",
  type: "11%",
  customer_id: "7%",
  salesperson_id: "7%",
  delivery_status_type: "10%",
  order_date: "10%",
  shipping_cost: "10%",
  //Unique columns, not included in orders
  total_sales_price: "10%",
  total_sales_price_without_tax: "10%",
  cost_without_shipping: "10%", //total_sales_price + shipping_cost
  total_cost: "10%",
};

const reviewsTableHeadingSizes = {
  id: "5%",
  type: "20%",
  customer_id: "10%",
  rating: "20%",
  reviewed_item: "45%",
};

const tableHeadingSizes: Record<DataTableType, object> = {
  goods: goodsTableHeadingSizes,
  "goods/tires": goodsTableHeadingSizes,
  "goods/rims": goodsTableHeadingSizes,
  "goods/carBatteries": goodsTableHeadingSizes,
  services: servicesTableHeadingSizes,
  "services/tires": servicesTableHeadingSizes,
  "services/undercarriageRepairs": servicesTableHeadingSizes,
  "services/oilFilterChanges": servicesTableHeadingSizes,
  "services/carBattery": servicesTableHeadingSizes,
  "services/autoAc": servicesTableHeadingSizes,
  "services/other": servicesTableHeadingSizes,
  employees: employeesTableHeadingSizes,
  "employees/salespersons": employeesTableHeadingSizes,
  "employees/servicemen": employeesTableHeadingSizes,
  salesChannels: salesChannelsTableHeadingSizes,
  "salesChannels/physicalStores": salesChannelsTableHeadingSizes,
  "salesChannels/onlineStores": salesChannelsTableHeadingSizes,
  customers: customersTableHeadingSizes,
  "customers/individuals": customersTableHeadingSizes,
  "customers/walkInCustomers": customersTableHeadingSizes,
  "customers/wholesalePartners": customersTableHeadingSizes,
  "customers/businessAccounts": customersTableHeadingSizes,
  orders: ordersTableHeadingSizes,
  "orders/onSite": ordersTableHeadingSizes,
  "orders/online": ordersTableHeadingSizes,
  reviews: reviewsTableHeadingSizes,
  "reviews/goods": reviewsTableHeadingSizes,
  "reviews/services": reviewsTableHeadingSizes,
  "reviews/salesChannels": reviewsTableHeadingSizes,
};

export { tableHeadingSizes, tableHeadings, TopBarHeight };
