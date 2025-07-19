-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.car_batteries (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  capacity_ampheres numeric NOT NULL,
  price_without_tax numeric NOT NULL,
  cold_cranking_ampheres numeric NOT NULL,
  reserve_capacity numeric NOT NULL,
  polarity text NOT NULL,
  voltage numeric NOT NULL,
  stock numeric NOT NULL,
  cost numeric NOT NULL,
  sales_price numeric NOT NULL,
  CONSTRAINT car_batteries_pkey PRIMARY KEY (id),
  CONSTRAINT Car_Batteries_id_fkey FOREIGN KEY (id) REFERENCES public.goods(id)
);
CREATE TABLE public.channel_services (
  channel_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  service_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT channel_services_pkey PRIMARY KEY (channel_id, service_id),
  CONSTRAINT channel_services_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.sales_channels(id),
  CONSTRAINT channel_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);
CREATE TABLE public.channel_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT channel_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.customers (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
  customer_type_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email text,
  phone_number text,
  alt_phone_number text,
  CONSTRAINT customers_pkey PRIMARY KEY (id),
  CONSTRAINT customers_customer_type_id_fkey FOREIGN KEY (customer_type_id) REFERENCES public.customers_types(id)
);
CREATE TABLE public.customers_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description text,
  CONSTRAINT customers_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.delivery_status_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description text NOT NULL,
  CONSTRAINT delivery_status_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employee_channels (
  employee_id bigint NOT NULL,
  channel_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT employee_channels_pkey PRIMARY KEY (employee_id, channel_id),
  CONSTRAINT employee_channels_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id),
  CONSTRAINT employee_channels_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.sales_channels(id)
);
CREATE TABLE public.employee_services (
  employee_id bigint NOT NULL,
  service_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT employee_services_pkey PRIMARY KEY (employee_id, service_id),
  CONSTRAINT employee_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id),
  CONSTRAINT employee_services_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.servicemen(id)
);
CREATE TABLE public.employees (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  gender text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  address text NOT NULL,
  job_title text NOT NULL,
  hire_date date NOT NULL,
  employment_status text NOT NULL,
  salary numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL,
  employee_type_id bigint NOT NULL,
  birth_date date NOT NULL,
  CONSTRAINT employees_pkey PRIMARY KEY (id),
  CONSTRAINT employees_employee_type_id_fkey FOREIGN KEY (employee_type_id) REFERENCES public.employees_types(id)
);
CREATE TABLE public.employees_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT employees_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.goods (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  brand text NOT NULL DEFAULT ''::text,
  good_type_id bigint NOT NULL,
  CONSTRAINT goods_pkey PRIMARY KEY (id),
  CONSTRAINT goods_good_type_id_fkey FOREIGN KEY (good_type_id) REFERENCES public.goods_types(id)
);
CREATE TABLE public.goods_in_channels (
  channel_id bigint NOT NULL,
  good_id bigint NOT NULL,
  stock numeric NOT NULL,
  price numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT goods_in_channels_pkey PRIMARY KEY (channel_id, good_id),
  CONSTRAINT goods_in_channels_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.sales_channels(id),
  CONSTRAINT goods_in_channels_good_id_fkey FOREIGN KEY (good_id) REFERENCES public.goods(id)
);
CREATE TABLE public.goods_sold (
  employee_id bigint NOT NULL,
  good_id bigint NOT NULL,
  sold_at timestamp without time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT goods_sold_pkey PRIMARY KEY (employee_id, good_id),
  CONSTRAINT goods_sold_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.salespersons(id),
  CONSTRAINT goods_sold_good_id_fkey FOREIGN KEY (good_id) REFERENCES public.goods(id)
);
CREATE TABLE public.goods_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  tax_amount numeric NOT NULL,
  CONSTRAINT goods_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.order_goods (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id bigint NOT NULL,
  good_id bigint NOT NULL,
  quantity numeric NOT NULL,
  added_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT order_goods_pkey PRIMARY KEY (id),
  CONSTRAINT order_goods_good_id_fkey FOREIGN KEY (good_id) REFERENCES public.goods(id),
  CONSTRAINT order_goods_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id)
);
CREATE TABLE public.order_services (
  order_id bigint NOT NULL,
  service_id bigint NOT NULL,
  servicemen_ids ARRAY NOT NULL DEFAULT '{}'::bigint[],
  price_at_time numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT order_services_pkey PRIMARY KEY (order_id, service_id),
  CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES public.services(id),
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id)
);
CREATE TABLE public.orders (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customer_id bigint NOT NULL,
  order_date date NOT NULL,
  order_type_id bigint NOT NULL,
  shipping_cost numeric NOT NULL,
  payment_method_type_id bigint NOT NULL,
  delivery_status_type_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  comment text NOT NULL,
  salesperson_id bigint NOT NULL,
  sales_channel_id bigint NOT NULL,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_salesperson_id_fkey FOREIGN KEY (salesperson_id) REFERENCES public.salespersons(id),
  CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id),
  CONSTRAINT orders_delivery_status_type_id_fkey FOREIGN KEY (delivery_status_type_id) REFERENCES public.delivery_status_types(id),
  CONSTRAINT orders_order_type_id_fkey FOREIGN KEY (order_type_id) REFERENCES public.orders_types(id),
  CONSTRAINT orders_payment_method_type_id_fkey FOREIGN KEY (payment_method_type_id) REFERENCES public.payment_method_types(id),
  CONSTRAINT orders_sales_channel_id_fkey FOREIGN KEY (sales_channel_id) REFERENCES public.sales_channels(id)
);
CREATE TABLE public.orders_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  names text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT orders_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.payment_method_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT payment_method_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.physical_channels (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  address text NOT NULL,
  has_parking boolean NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT physical_channels_pkey PRIMARY KEY (id),
  CONSTRAINT physical_channels_id_fkey FOREIGN KEY (id) REFERENCES public.sales_channels(id)
);
CREATE TABLE public.review_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT review_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reviews (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  review_type_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  customer_id bigint,
  comment text,
  updated_at timestamp without time zone,
  edited boolean NOT NULL DEFAULT false,
  rating smallint NOT NULL,
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id),
  CONSTRAINT reviews_review_type_id_fkey FOREIGN KEY (review_type_id) REFERENCES public.review_types(id)
);
CREATE TABLE public.reviews_for_goods (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  good_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL,
  customer_id bigint,
  CONSTRAINT reviews_for_goods_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_for_goods_good_id_fkey FOREIGN KEY (good_id) REFERENCES public.goods(id),
  CONSTRAINT reviews_for_goods_id_fkey FOREIGN KEY (id) REFERENCES public.reviews(id)
);
CREATE TABLE public.reviews_for_sales_channels (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  channel_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  customer_id bigint,
  CONSTRAINT reviews_for_sales_channels_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_for_sales_channels_id_fkey FOREIGN KEY (id) REFERENCES public.reviews(id),
  CONSTRAINT reviews_for_sales_channels_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.sales_channels(id)
);
CREATE TABLE public.reviews_for_services (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  service_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  customer_id bigint,
  CONSTRAINT reviews_for_services_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_for_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id),
  CONSTRAINT reviews_for_services_id_fkey FOREIGN KEY (id) REFERENCES public.reviews(id)
);
CREATE TABLE public.rim_variants (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  rim_id bigint NOT NULL,
  diameter numeric NOT NULL,
  sales_price numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  stock numeric NOT NULL,
  cost numeric NOT NULL,
  price_without_tax numeric NOT NULL,
  CONSTRAINT rim_variants_pkey PRIMARY KEY (id),
  CONSTRAINT Rim_Variants_rim_id_fkey FOREIGN KEY (rim_id) REFERENCES public.rims(id)
);
CREATE TABLE public.rims (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  holes numeric NOT NULL,
  CONSTRAINT rims_pkey PRIMARY KEY (id),
  CONSTRAINT Rims_id_fkey FOREIGN KEY (id) REFERENCES public.goods(id)
);
CREATE TABLE public.sales_channels (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  channel_type_id bigint NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL,
  CONSTRAINT sales_channels_pkey PRIMARY KEY (id),
  CONSTRAINT sales_channels_channel_type_id_fkey FOREIGN KEY (channel_type_id) REFERENCES public.channel_types(id)
);
CREATE TABLE public.salespersons (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT salespersons_pkey PRIMARY KEY (id),
  CONSTRAINT salespersons_id_fkey FOREIGN KEY (id) REFERENCES public.employees(id)
);
CREATE TABLE public.service_providers (
  order_id bigint NOT NULL,
  service_id bigint NOT NULL,
  employee_id bigint NOT NULL,
  CONSTRAINT service_providers_pkey PRIMARY KEY (order_id, service_id, employee_id),
  CONSTRAINT service_providers_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id),
  CONSTRAINT service_providers_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT service_providers_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);
CREATE TABLE public.servicemen (
  id bigint NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT servicemen_pkey PRIMARY KEY (id),
  CONSTRAINT servicemen_id_fkey FOREIGN KEY (id) REFERENCES public.employees(id)
);
CREATE TABLE public.services (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  sales_price numeric NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  servies_type_id bigint NOT NULL,
  cost numeric NOT NULL,
  price_without_tax numeric NOT NULL,
  CONSTRAINT services_pkey PRIMARY KEY (id),
  CONSTRAINT services_servies_type_id_fkey FOREIGN KEY (servies_type_id) REFERENCES public.services_types(id)
);
CREATE TABLE public.services_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  names text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  tax_amount numeric NOT NULL,
  CONSTRAINT services_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tires (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  diameter numeric NOT NULL,
  profile numeric NOT NULL,
  width numeric NOT NULL,
  season text NOT NULL DEFAULT ''::text,
  pattern text NOT NULL DEFAULT ''::text,
  speed_index text NOT NULL DEFAULT ''::text,
  weight_index text NOT NULL DEFAULT ''::text,
  sales_price numeric NOT NULL,
  stock numeric NOT NULL,
  cost numeric NOT NULL,
  price_without_tax numeric NOT NULL,
  CONSTRAINT tires_pkey PRIMARY KEY (id),
  CONSTRAINT Tires_id_fkey FOREIGN KEY (id) REFERENCES public.goods(id)
);