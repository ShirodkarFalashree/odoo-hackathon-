# Postman API Testing Guide

## Base URL
```
http://localhost:YOUR_PORT
```
Replace `YOUR_PORT` with your actual port (e.g., 3000, 5000, etc.)

---

## 1. Database Test
**GET** `/test-db`
- Tests database connection
- No body required

---

## 2. Authentication APIs

### Signup
**POST** `/api/auth/signup`

**Body (JSON):**
```json
{
  "login_id": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
**POST** `/api/auth/login`

**Body (JSON):**
```json
{
  "login_id": "john_doe",
  "password": "password123"
}
```

---

## 3. Warehouse APIs

### Create Warehouse
**POST** `/api/warehouse`

**Body (JSON):**
```json
{
  "name": "Main Warehouse",
  "short_code": "WH",
  "address": "123 Industrial Street, City, State 12345"
}
```

### Get Warehouse
**GET** `/api/warehouse`
- No body required

### Update Warehouse
**PUT** `/api/warehouse`

**Body (JSON):**
```json
{
  "id": 1,
  "name": "Updated Warehouse Name",
  "short_code": "WH",
  "address": "456 New Address, City, State 12345"
}
```

---

## 4. Location APIs

### Get Locations
**GET** `/api/locations`
- No body required

### Create Location
**POST** `/api/locations`

**Body (JSON):**
```json
{
  "name": "Stock Area 1",
  "short_code": "STK1"
}
```

---

## 5. Product APIs

### Get Products
**GET** `/api/products`
- Optional query parameter: `?search=laptop`

### Create Product
**POST** `/api/products`

**Body (JSON):**
```json
{
  "name": "Laptop Computer",
  "sku": "LAP-001",
  "category": "Electronics",
  "unit_of_measure": "Unit",
  "unit_cost": 999.99,
  "reorder_level": 10,
  "initial_stock": 50
}
```

**More Product Examples:**
```json
{
  "name": "Wireless Mouse",
  "sku": "MSE-001",
  "category": "Accessories",
  "unit_of_measure": "Unit",
  "unit_cost": 29.99,
  "reorder_level": 20,
  "initial_stock": 100
}
```

```json
{
  "name": "USB Cable",
  "sku": "USB-001",
  "category": "Cables",
  "unit_of_measure": "Unit",
  "unit_cost": 9.99,
  "reorder_level": 50,
  "initial_stock": 200
}
```

---

## 6. Stock APIs

### Get Stock
**GET** `/api/stock`
- No body required
- Returns all products with stock levels

### Update Stock
**PUT** `/api/stock/:id`
- Replace `:id` with product ID (e.g., `/api/stock/1`)

**Body (JSON):**
```json
{
  "qty_on_hand": 75,
  "qty_free": 75
}
```

---

## 7. Receipt APIs

### Create Receipt
**POST** `/api/receipts`

**Body (JSON):**
```json
{
  "from_name": "Supplier ABC",
  "to_location_id": 1,
  "contact_name": "John Supplier",
  "schedule_date": "2024-01-15",
  "responsible_user_id": 1
}
```

### Add Line to Receipt
**POST** `/api/receipts/:id/lines`
- Replace `:id` with receipt ID (e.g., `/api/receipts/1/lines`)

**Body (JSON):**
```json
{
  "product_id": 1,
  "qty": 25
}
```

### Update Receipt Status
**PUT** `/api/receipts/:id/status`
- Replace `:id` with receipt ID

**Body (JSON):**
```json
{
  "status": "ready"
}
```
*Status options: `draft`, `ready`, `done`*

### Validate Receipt
**POST** `/api/receipts/:id/validate`
- Replace `:id` with receipt ID
- No body required
- This will update stock levels and create stock moves

---

## 8. Delivery APIs

### Create Delivery
**POST** `/api/deliveries`

**Body (JSON):**
```json
{
  "from_location_id": 1,
  "to_name": "Customer XYZ",
  "contact_name": "Jane Customer",
  "schedule_date": "2024-01-20",
  "operation_type": "Sale",
  "responsible_user_id": 1
}
```

**More Delivery Examples:**
```json
{
  "from_location_id": 1,
  "to_name": "Retail Store ABC",
  "contact_name": "Bob Manager",
  "schedule_date": "2024-01-25",
  "operation_type": "Transfer",
  "responsible_user_id": 1
}
```

### Add Line to Delivery
**POST** `/api/deliveries/:id/lines`
- Replace `:id` with delivery ID

**Body (JSON):**
```json
{
  "product_id": 1,
  "qty": 10
}
```

### Update Delivery Status
**PUT** `/api/deliveries/:id/status`
- Replace `:id` with delivery ID

**Body (JSON):**
```json
{
  "status": "ready"
}
```
*Status options: `draft`, `waiting`, `ready`, `done`*

### Validate Delivery
**POST** `/api/deliveries/:id/validate`
- Replace `:id` with delivery ID
- No body required
- This will check stock availability and update stock levels

---

## 9. Stock Moves API

### Get Stock Moves
**GET** `/api/moves`
- Optional query parameter: `?search=WH/OUT/0001`

---

## 10. Dashboard API

### Get Overview
**GET** `/api/dashboard/overview`
- No body required
- Returns counts of pending receipts and deliveries

---

## Testing Workflow (Recommended Order)

1. **Test Database Connection**
   - `GET /test-db`

2. **Create Warehouse** (Required first)
   - `POST /api/warehouse`

3. **Create Location** (Required for receipts/deliveries)
   - `POST /api/locations`

4. **Create User** (Required for receipts/deliveries)
   - `POST /api/auth/signup`

5. **Create Products**
   - `POST /api/products` (create multiple products)

6. **Check Stock**
   - `GET /api/stock`

7. **Create Receipt**
   - `POST /api/receipts`
   - `POST /api/receipts/:id/lines` (add products)
   - `PUT /api/receipts/:id/status` (set to "ready")
   - `POST /api/receipts/:id/validate` (validate and update stock)

8. **Create Delivery**
   - `POST /api/deliveries`
   - `POST /api/deliveries/:id/lines` (add products)
   - `PUT /api/deliveries/:id/status` (set to "ready")
   - `POST /api/deliveries/:id/validate` (validate and update stock)

9. **View Stock Moves**
   - `GET /api/moves`

10. **View Dashboard**
    - `GET /api/dashboard/overview`

---

## Sample Complete Workflow JSON

### Step 1: Create Warehouse
```json
{
  "name": "Main Warehouse",
  "short_code": "WH",
  "address": "123 Main St, City, State"
}
```

### Step 2: Create Location
```json
{
  "name": "Storage Area 1",
  "short_code": "STG1"
}
```

### Step 3: Create User
```json
{
  "login_id": "admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Step 4: Create Product
```json
{
  "name": "Sample Product",
  "sku": "PROD-001",
  "category": "General",
  "unit_of_measure": "Unit",
  "unit_cost": 100.00,
  "reorder_level": 10,
  "initial_stock": 100
}
```

### Step 5: Create Receipt
```json
{
  "from_name": "Supplier Inc",
  "to_location_id": 1,
  "contact_name": "Supplier Contact",
  "schedule_date": "2024-01-15",
  "responsible_user_id": 1
}
```

### Step 6: Add Receipt Line
```json
{
  "product_id": 1,
  "qty": 50
}
```

### Step 7: Update Receipt Status
```json
{
  "status": "ready"
}
```

### Step 8: Validate Receipt (no body needed)

### Step 9: Create Delivery
```json
{
  "from_location_id": 1,
  "to_name": "Customer Corp",
  "contact_name": "Customer Contact",
  "schedule_date": "2024-01-20",
  "operation_type": "Sale",
  "responsible_user_id": 1
}
```

### Step 10: Add Delivery Line
```json
{
  "product_id": 1,
  "qty": 20
}
```

### Step 11: Update Delivery Status
```json
{
  "status": "ready"
}
```

### Step 12: Validate Delivery (no body needed)

