-- ============================================
-- Seed Script: products & reviews
-- Run this command: bunx prisma db execute --file prisma/seed.sql
-- ============================================

-- Clear existing data (order matters due to FK constraint)
TRUNCATE TABLE reviews RESTART IDENTITY CASCADE;
TRUNCATE TABLE products RESTART IDENTITY CASCADE;

-- ============================================
-- Products
-- ============================================
INSERT INTO products (name, description, price) VALUES
  ('Wireless Noise-Cancelling Headphones', 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and foldable design.', 149.99),
  ('Mechanical Keyboard', 'TKL layout mechanical keyboard with Cherry MX Red switches, RGB backlighting, and aluminium frame.', 89.99),
  ('USB-C Hub 7-in-1', 'Multiport adapter with 4K HDMI, 2x USB-A 3.0, USB-C PD 100W, SD card reader, and Gigabit Ethernet.', 49.99),
  ('Ergonomic Office Chair', 'Fully adjustable mesh chair with lumbar support, armrests, and breathable backrest for all-day comfort.', 299.99),
  ('27" 4K Monitor', 'IPS panel display with 144Hz refresh rate, HDR400, and USB-C connectivity for professionals and gamers alike.', 499.99),
  ('Portable SSD 1TB', 'Ultra-fast NVMe portable drive with USB 3.2 Gen 2, read speeds up to 1050MB/s in a rugged compact casing.', 109.99),
  ('Smart LED Desk Lamp', 'Touch-controlled desk lamp with adjustable colour temperature, brightness memory, and USB-A charging port.', 34.99),
  ('Webcam 1080p', 'Full HD webcam with auto-focus, built-in stereo microphone, and plug-and-play USB connectivity.', 69.99);

-- ============================================
-- Reviews  (productId references products.id)
-- ============================================
INSERT INTO reviews (author, rating, content, "createdAt", "productId") VALUES

  -- Product 1 – Headphones
  ('Alice Nguyen',    5, 'Absolutely love these headphones. The noise cancellation is phenomenal and the battery lasts forever.',        '2024-11-01 09:15:00', 1),
  ('Marcus Webb',     4, 'Great sound quality and very comfortable. Wish the ear cups were a bit larger but overall very happy.',        '2024-11-10 14:22:00', 1),
  ('Sophie Durand',   3, 'Decent headphones but the Bluetooth connection drops occasionally. Customer support was helpful though.',      '2024-11-18 11:05:00', 1),
  ('James Okafor',    5, 'Best headphones I have ever owned. Worth every penny.',                                                       '2024-12-02 08:44:00', 1),

  -- Product 2 – Mechanical Keyboard
  ('Priya Sharma',    5, 'The typing feel is incredible. Red switches are smooth and quiet enough for an office environment.',           '2024-10-05 16:30:00', 2),
  ('Tom Eriksson',    4, 'Solid build quality and the RGB looks great. Would have liked dedicated macro keys.',                          '2024-10-20 12:10:00', 2),
  ('Lena Fischer',    2, 'Started double-registering keystrokes after two months of use. Disappointing for the price.',                  '2024-11-25 09:55:00', 2),

  -- Product 3 – USB-C Hub
  ('Carlos Mendez',   5, 'Works flawlessly with my MacBook Pro. All seven ports function perfectly and passthrough charging is fast.',   '2024-09-14 10:00:00', 3),
  ('Hannah Lee',      4, 'Very useful hub. Gets slightly warm under heavy load but nothing alarming.',                                   '2024-09-28 17:45:00', 3),
  ('Oliver Brown',    3, 'The Ethernet port stopped working after a firmware update. HDMI and USB are fine.',                            '2024-10-12 13:20:00', 3),

  -- Product 4 – Ergonomic Chair
  ('Nina Patel',      5, 'My back pain has reduced significantly since switching to this chair. Assembly was straightforward.',          '2024-08-01 11:30:00', 4),
  ('Ryan Kowalski',   4, 'Very comfortable for long work sessions. The lumbar support is excellent. Armrests could be wider.',           '2024-08-20 15:00:00', 4),
  ('Fatima Al-Hassan',5, 'Exceptional quality. Looks professional and feels even better. Highly recommend for remote workers.',          '2024-09-05 09:10:00', 4),
  ('Ethan Clarke',    3, 'Good chair overall but the seat cushion is a little firm out of the box. Softened up after a few weeks.',     '2024-09-22 14:50:00', 4),

  -- Product 5 – 4K Monitor
  ('Mia Johansson',   5, 'Stunning picture quality. The colours are vibrant and accurate straight out of the box.',                     '2024-07-10 08:00:00', 5),
  ('Daniel Rossi',    5, 'Perfect monitor for both work and gaming. 144Hz at 4K is butter smooth.',                                     '2024-07-25 19:30:00', 5),
  ('Aisha Kamara',    4, 'Great monitor. The USB-C single-cable setup is super convenient. Stand tilt range could be greater.',         '2024-08-15 10:45:00', 5),

  -- Product 6 – Portable SSD
  ('Lucas Martins',   5, 'Transfer speeds are insane. Moved 100GB in under two minutes. Compact enough to carry everywhere.',           '2024-06-18 13:00:00', 6),
  ('Yuki Tanaka',     4, 'Very fast and reliable. The included cable is a bit short but the drive itself is excellent.',                 '2024-07-03 11:20:00', 6),
  ('Grace O''Brien',  3, 'Good speeds but the casing gets quite hot during long transfers. Speeds throttle a little after that.',        '2024-07-19 16:35:00', 6),

  -- Product 7 – Desk Lamp
  ('Leo Müller',      5, 'Perfect lamp for my desk setup. The colour temperature range covers everything from warm reading to cool work.','2024-05-11 20:00:00', 7),
  ('Sara Ivanova',    4, 'Sleek design and easy to use. The USB charging port is a handy addition.',                                    '2024-05-28 08:30:00', 7),
  ('Omar Hassan',     4, 'Good quality lamp. Would love an app to control it remotely but the touch controls work well.',               '2024-06-15 17:00:00', 7),

  -- Product 8 – Webcam
  ('Emma Larsson',    5, 'Crystal-clear image. My video calls look professional now. Plug and play with no driver install required.',   '2024-04-22 09:00:00', 8),
  ('Isaac Fernández', 3, 'Image quality is good in bright light but struggles in low-light conditions. Microphone is decent.',          '2024-05-07 14:15:00', 8),
  ('Chloe Martin',    4, 'Solid webcam for the price. Auto-focus is fast and accurate. Happy with the purchase.',                       '2024-05-20 11:40:00', 8);