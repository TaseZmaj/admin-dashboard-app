-- Rims with all their variants
select
  g.id,
  g.name,
  gt.name as type,
  g.brand,
  rv.diameter,
  rv.stock,
  rv.sales_price
  rv.price_without_tax
  rv.cost
from goods g
join goods_types gt on g.good_type_id = gt.id
join rims r on g.id = r.id
join rim_variants rv on r.id = rv.rim_id
where gt.name = 'Rim'

union all

-- Car Batteries
select
  g.id,
  g.name,
  gt.name as type,
  g.brand,
  null as diameter,
  cb.stock,
  cb.sales_price
  cb.price_without_tax
  cb.cost
from goods g
join goods_types gt on g.good_type_id = gt.id
join car_batteries cb on g.id = cb.id
where gt.name = 'Car battery'

union all

-- Tires
select
  g.id,
  g.name,
  gt.name as type,
  g.brand,
  null as diameter,
  t.stock,
  t.sales_price,
  t.price_without_tax,
  t.cost,
from goods g
join goods_types gt on g.good_type_id = gt.id
join tires t on g.id = t.id
where gt.name = 'Tire';