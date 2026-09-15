#CREATE DATABASE IF NOT EXISTS shopdemo;

USE jenkins_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(500),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

INSERT INTO products
(name, description, price, image, stock)
VALUES
(
    'Laptop',
    'Powerful laptop for work and entertainment.',
    55000,
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    10
),
(
    'Smart Phone',
    'Modern smartphone with excellent performance.',
    25000,
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    20
),
(
    'Headphones',
    'Wireless headphones with clear sound.',
    3500,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    30
),
(
    'Smart Watch',
    'Smart watch with fitness tracking features.',
    5000,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    15
);
