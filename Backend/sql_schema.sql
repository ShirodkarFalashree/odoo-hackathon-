CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  login_id VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE warehouses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  short_code VARCHAR(20) NOT NULL UNIQUE, -- e.g. 'WH'
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,        -- e.g. 'Stock1'
  short_code VARCHAR(20) NOT NULL,   -- e.g. 'Stock1'
  warehouse_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  sku VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(100),
  unit_of_measure VARCHAR(50) NOT NULL,
  unit_cost DECIMAL(10,2) DEFAULT 0,
  reorder_level INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_levels (
  product_id INT PRIMARY KEY,
  qty_on_hand INT NOT NULL DEFAULT 0,
  qty_free INT NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE receipts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reference_code VARCHAR(50) UNIQUE,        -- e.g. WH/IN/0001
  from_name VARCHAR(150),                   -- vendor
  to_location_id INT,                       -- location (WH/Stock1)
  contact_name VARCHAR(150),
  schedule_date DATE,
  status ENUM('draft','ready','done') DEFAULT 'draft',
  responsible_user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  validated_at TIMESTAMP NULL,
  FOREIGN KEY (to_location_id) REFERENCES locations(id),
  FOREIGN KEY (responsible_user_id) REFERENCES users(id)
);

CREATE TABLE receipt_lines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receipt_id INT NOT NULL,
  product_id INT NOT NULL,
  qty INT NOT NULL,
  FOREIGN KEY (receipt_id) REFERENCES receipts(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE delivery_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reference_code VARCHAR(50) UNIQUE,       -- e.g. WH/OUT/0001
  from_location_id INT,                    -- WH/Stock1
  to_name VARCHAR(150),                    -- vendor / customer
  contact_name VARCHAR(150),
  schedule_date DATE,
  operation_type VARCHAR(50),              -- dropdown in UI
  status ENUM('draft','waiting','ready','done') DEFAULT 'draft',
  responsible_user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  validated_at TIMESTAMP NULL,
  FOREIGN KEY (from_location_id) REFERENCES locations(id),
  FOREIGN KEY (responsible_user_id) REFERENCES users(id)
);

CREATE TABLE delivery_lines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  delivery_id INT NOT NULL,
  product_id INT NOT NULL,
  qty INT NOT NULL,
  FOREIGN KEY (delivery_id) REFERENCES delivery_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE stock_moves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  reference_type ENUM('receipt','delivery','adjustment') NOT NULL,
  reference_id INT NOT NULL,
  reference_code VARCHAR(50) NOT NULL,
  move_date DATE NOT NULL,
  contact_name VARCHAR(150),
  from_name VARCHAR(150),
  to_name VARCHAR(150),
  qty_change INT NOT NULL,       -- positive for IN, negative for OUT
  status VARCHAR(20),            -- copy of operation status at that time
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_stock_moves_ref (reference_type, reference_id),
  INDEX idx_stock_moves_date (move_date)
);

async function generateReferenceCode(conn, type) {
 
  const [[wh]] = await conn.query(
    "SELECT short_code FROM warehouses LIMIT 1"
  );
  const prefix = `${wh.short_code}/${type}/`;

  const table = type === 'IN' ? 'receipts' : 'delivery_orders';

  const [[row]] = await conn.query(
    `SELECT reference_code FROM ${table}
     WHERE reference_code LIKE ?
     ORDER BY id DESC LIMIT 1`,
    [`${prefix}%`]
  );

  let nextNumber = 1;
  if (row && row.reference_code) {
    const parts = row.reference_code.split('/');
    nextNumber = parseInt(parts[2], 10) + 1;
  }

  const padded = String(nextNumber).padStart(4, '0'); 
  return `${prefix}${padded}`;                         
}
