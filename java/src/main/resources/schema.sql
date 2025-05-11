-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS scooter_rental;
USE scooter_rental;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user',
    status VARCHAR(20) DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 8 HOUR),
    updated_at DATETIME NOT NULL
);

-- 滑板车表
CREATE TABLE IF NOT EXISTS scooters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    scooter_id VARCHAR(50) NOT NULL UNIQUE,
    model VARCHAR(50),
    battery INTEGER,
    range INTEGER,
    price_per_hour DOUBLE,
    deposit DOUBLE DEFAULT 0,
    status VARCHAR(20),
    shop_id VARCHAR(50),
    current_order_id VARCHAR(50)
);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    scooter_id VARCHAR(50) NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    total_amount DOUBLE,
    status VARCHAR(20) DEFAULT 'normal',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 创建索引
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_scooter_id ON scooters(scooter_id);
CREATE INDEX idx_shop_id ON scooters(shop_id);
CREATE INDEX idx_order_id ON orders(order_id);
CREATE INDEX idx_user_id ON orders(user_id);
CREATE INDEX idx_scooter_id_orders ON orders(scooter_id); 