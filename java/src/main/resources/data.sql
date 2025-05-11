-- 添加管理员账户（密码为 123456 的BCrypt加密形式）
INSERT INTO users (username, password, email, name, role, status, email_verified, created_at, updated_at)
VALUES 
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'admin@example.com', '管理员', 'admin', 'active', true, NOW(), NOW());

-- 添加测试滑板车
INSERT INTO scooters (scooter_id, model, battery, range, price_per_hour, status, shop_id)
VALUES 
('S001', 'Model A', 100, 50, 10.0, 'available', 'SHOP001'),
('S002', 'Model B', 90, 45, 12.0, 'available', 'SHOP001'),
('S003', 'Model C', 95, 48, 11.0, 'available', 'SHOP002'); 