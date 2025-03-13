-- Insert sample product data
INSERT INTO produk (nama, stok, link_gambar) VALUES 
('Laptop Asus', 10, 'https://example.com/laptop-asus.jpg'),
('Smartphone Samsung', 15, 'https://example.com/smartphone-samsung.jpg'),
('Monitor LG', 8, 'https://example.com/monitor-lg.jpg'),
('Mechanical Keyboard', 20, 'https://example.com/keyboard.jpg');

-- Note: We don't insert user data with plain text passwords
-- Users should be created through the API with proper password hashing