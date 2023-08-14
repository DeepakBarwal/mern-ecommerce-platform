# MERN eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

This project is a fully-featured shopping cart with PayPal & credit/debit payments (use sandbox accounts to try). See it in action at https://mern-ecommerce-51ss.onrender.com

<!-- toc -->

- [Features](#features)
- [Usage](#usage)
  - [Env Variables](#env-variables)
  - [Install Dependencies (frontend & backend)](#install-dependencies-frontend--backend)
  - [Run](#run)
- [Build & Deploy](#build--deploy)
  - [Seed Database](#seed-database)

<!-- tocstop -->

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Create `.env` file and add the following

```
NODE_ENV = development
PORT = 4000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
SALT_ROUNDS = your choice
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
```

Change the JWT_SECRET, SALT_ROUNDS and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:4000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
npm run build
npm run server
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@email.com (Admin)
123456

jon@email.com (Customer)
123456

jane@email.com (Customer)
123456
```
