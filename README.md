# Amazon Warehouse Management System

A full-stack warehouse management system for managing inventory, stock movements, orders, wastage, suppliers, categories, reports, and warehouse settings.

The system uses PostgreSQL-backed operations to keep inventory quantities synchronized across warehouse activities.

## Features

###  Authentication

* User registration and login
* Protected application routes
* Authenticated warehouse access

###  Dashboard

* Total products, stock, orders, revenue, and profit
* Low-stock and out-of-stock monitoring
* Pending order tracking
* Revenue and order-status charts
* Recent orders
* Dynamic statistics from database data

###  Inventory Management

* Product CRUD with SKU and barcode
* Category and supplier management
* Cost and selling price tracking
* Automatic stock status updates
* Stock In / Stock Out operations
* Quantity validation to prevent negative stock

###  Orders

* Create and manage orders
* Automatic revenue and profit calculation
* Order status tracking
* Automatic inventory deduction
* Database-persisted order history

###  Wastage

* Record damaged, expired, or wasted stock
* Automatic inventory deduction
* Wastage loss calculation using product cost
* Track reasons and dates

###  Reports

* Inventory reports
* Sales reports
* Stock movement reports
* Wastage reports
* Inventory value and cost
* Revenue, orders, stock movements, and wastage loss

###  Settings

* Warehouse name configuration
* Low-stock threshold
* Currency selection
* Email and low-stock notification preferences
* Reset to default settings
* Database-backed settings
* Dashboard integration with configurable low-stock threshold

## Inventory Logic

Warehouse operations automatically update product quantities:

```text
Stock In   → Current Quantity + Added Quantity
Stock Out  → Current Quantity - Removed Quantity
Order      → Current Quantity - Ordered Quantity
Wastage    → Current Quantity - Wasted Quantity
```

All inventory changes are persisted in PostgreSQL along with their transaction records.

## Tech Stack

**Frontend**

* React
* Vite
* React Router DOM
* Context API
* Tailwind CSS
* Recharts
* React Icons

**Backend**

* Node.js
* Express.js
* REST API

**Database**

* PostgreSQL

**Tools**

* Git
* GitHub
* npm

## Project Structure

```text
src/
├── components/
│   ├── dashboard/
│   ├── products/
│   ├── categories/
│   ├── suppliers/
│   ├── stockIn/
│   ├── stockOut/
│   ├── orders/
│   ├── wastage/
│   ├── reports/
│   └── settings/
├── context/
├── layouts/
├── pages/
├── services/
├── utils/
└── App.jsx

backend/
├── config/
├── controllers/
├── routes/
└── server.js
```

## Core Modules

**Authentication · Dashboard · Products · Categories · Suppliers · Stock In · Stock Out · Orders · Wastage · Reports · Settings**

## Database

PostgreSQL stores and manages:

* Products
* Categories
* Suppliers
* Stock In / Stock Out records
* Orders
* Wastage records
* Warehouse settings

Inventory operations update both product quantities and transaction records to maintain data consistency.

## Getting Started

### Prerequisites

* Node.js
* npm
* PostgreSQL

### Clone Repository

```bash
git clone https://github.com/Fatimakhan01/amazon-warehouse-management.git
cd amazon-warehouse-management
```

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Configure your PostgreSQL connection in `backend/.env`:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
```

Make sure PostgreSQL is running and the required database tables are created before starting the backend.
