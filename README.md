# Admin-dashboard-app

A work-in-progress project for my portfolio designed exclusively with frontend technologies using a dummy API and some generated mock data.

## Overview

- [Overview](#overview)
  - [Requests, Features and Pages list](#Requests-features-and-pages-list)
    - [Requests](#requests)
    - [Features](#features)
    - [Pages](#pages)
      - [Dashboard](#dashboard-homepage);
      - [Goods](#goods-page)
      - [Services](#services-page)
      - [Profits]()
      - [Customers]()
      - [Sales Channels]()
      - [Analytics](#analytics-page)
      - [Error](#error-page)
    - [Other functionalities](#Other-functionalities)
  - [Technologies](#technologies)
    - [Logic](#logic)
    - [Styling](#styling)
    - [Animation](#animations)
    - [Other](#other)
  - [Design](#design)

## Requests, features and pages list

### Requests:

- **Today's** sales, also a _comparison_ between today's sales and the sales on the same day last year, and the year before
- **This week's** sales, with the same _comparison_
- **This month's** sales, with the same _comparison_
- **This year's** sales, with _comparison_ from the beginning of the year until the same day of the year - for the past 2 years

#### **Structure of the sales**:

1.  Total _goods_, with a list of goods, sorted in decending order
2.  Total _services_, with a list of services, sorted in decending order
3.  Total _profits_ from goods, profit margin - with analytics: for this week, this month and this year - compared to the past 2 years
4.  _Analytics of the sales by salespeople_: total sales, total profits and profit margins
5.  _Structure of the sales by sales channels_: webshop, invoices, customer visits

### Features:

The ability to view:

1. Total goods, with a list of goods, sorted in decending order
2. Total services, with a list of services, sorted in decending order
3. Total profits from goods, profit margin - with analytics: for this week, this month and this year - compared to the past 2 years

### Pages:

#### Dashboard (HomePage)

The dashboard homepage includes a **select field** in which we can pick an option: "weekly", "monthly", "yearly", "last 2 years" upon which the Dashboard homepage will display the data with that filter.
Filter explanation:

- Weekly means the past 7 days starting from yesterday.
- Monthly means the past 30 days starting from yesterday.
- Yearly means the past 365 days starting from yesterday.

Based on that filter:

- The **cards** will display the _comparrison_ between the current weeks/months/yearly sales compared to the previous weeks/months/yearly/2 years sales.
- The **charts** will display the data for the _current_ week/month/year/last 2 years (there is no comparrison to previous years like with the cards).
  The data will be displayed with these components:
- The **lists** will also display the data from the _current_ week/month/year/last 2 years. <!-- They are called lists here, but in practice - define them as card components. -->

1. <span style="color: #ffd233;">Sales revenue card</span> - displays total revenue.
2. **Sales profit card** - displays sales profit (revenue - expenses).
3. **New customers card** - displays the number of new customers (based on data from the past week, month, year or 2 years according to the filter).
4. **Average order value card** - displays the average price of the total orders of all customers based on the specified filter.
5. **Repeat purchase rate card** - <!--TODO: think of what to make this component -->
6. **Trending goods list**

- Displays the <u>goods</u> that, based on the filter, are being sold the most.
- Upon clicking this list, it takes us to the [](#Goods-page) and sets the filter on that page to "secured in the highest volume".
<!--TODO: Think of a better name "secured in the highest volume" is too long for a filter-->
- Alternatively, clicking on a good takes us to the dynamically generated page for that particullar good [](#Dynamic-good-page).

7. **Trending services list**

- Displays the <u>services</u> that, based on the filter, are bing sold the most.
- Upon clicking this list it takes us to the [](#Services-page) and sets the filter on that page to "secured in the highest volume".
<!--TODO: Think of a better name "secured in the highest volume" is too long for a filter-->
- Alternatively, clicking on a service takes us to the dynamically generated page for that particullar good [](#Dynamic-service-page).

8. **Recent orders list** - displays the most recent orders. This card does NOT care about the filter and just displays the last few goods/services that were purchased.

9. **Top customers list** - displays the customers that generated the most revenue weekly/monthly/yearly or from the last 2 years based on the filter.
10. <!--TODO: Define a few charts and what they should be about-->

All of the cards must include a small **percentage increase/decrease indicator** on the bottom right/left to compare the results from the previous week, month, year or the last 2 years (based on the selector).

The elements in the Dashboard must be **draggable** so that the Admin can customize their app accordingly.

- Best chart practices:
  - Line charts for trends over time
  - Bar charts for comparisons
  - Pie charts for distribution

### Other functionalities

If the admin IS NOT logged in - don't allow other routes other than the /login route

#### Goods page

- list of all goods sales, sorted by filter (alphabet, price, date)
- upon clicking one of the list item - go to a [dynamically generated good page](Dynamic-good-page) for that particular _good_ just the same as in the [Dashboard homepage](#dashboard-homepage)
- add pagination

#### Services page

- list of all services sales, sorted by filter (alphabet, price, date)
- upon clicking one of the list item - go to a [dynamically generated good page](Dynamic-service-page) for that particular _service_ just the same as in the [Dashboard homepage](#dashboard-homepage)
- add pagination

#### Profits page (with Analytics)

- Charts included for:
  - The ability to view and _compare_ the current sales with the sales made:
    -The week before
    -The month before
    -The year before and two years before

### Analytics page

- The analytics page is a page to analyze the performance of employees. It is mostly comprised of charts and a where the employees are ordered in a decending order where the employee who made the company the most revenue is ranked at the top.
- Just as the [dashboard home page](#dashboard-homepage) and the [profits page](#profits), there will be the same filter - "last 7 days", "last 30 days", "last year", "last 2 years" for a comparrison of the employee's sales data.
- The elements that comprise this page include:

1. A pie chart for the display of employees
   - List of all employees, sorted by filter (alphabed, most/least sales, date)

### Login page

- Upon opening the app this is the main page

### Error page

- Invalid URL handling
- Link to previous page and/or Homepage

## Technologies

### Logic:

- [React](https://react.dev/learn/typescript) framework of choice.
- [React Router](https://reactrouter.com) for managing routes.
- [Typescript](https://www.typescriptlang.org/docs/) language of choice.

### Styling:

- [Material UI](https://mui.com) styled components.

### Animations:

- [React Motion](https://motion.dev) animations and transitions.

### Other

- [DNDkit](https://dndkit.com) drag and drop functionality.

## Design <!--TODO: After completion, replace with screenshots from the current finished design -->

These are some of the current design ideas:

- [Design 1](https://www.behance.net/gallery/184403667/E-commerce-Admin-Dashboard-Design)
  ![](./public/designs/Design1.jpg)

- [Design 2](https://www.behance.net/gallery/177641865/Admin-Dashboard-Design?tracking_source=search_projects|e-commerce+admin+dashboard+design&l=0)
  ![](./public/designs/Design2.jpg)

- [Design 3](https://www.behance.net/gallery/212217641/Cybersecurity-Dashboard)
  ![](./public/designs/Design3.jpg)

- [Design 4](https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html)
  ![](./public/designs/Design4.jpg)

## Admin-dashboard example <!--TODO: Remove after completion -->

- [An example](https://example.admin.refine.dev)
