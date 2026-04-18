-- Insert Vehicle Types
INSERT INTO vehicle_types (name, description) VALUES
  ('Bus', 'Large vehicles for group transportation'),
  ('Van', 'Medium-sized vehicles for small groups'),
  ('Car', 'Standard vehicles for small groups or individuals'),
  ('Luxury', 'Premium vehicles for special occasions')
ON CONFLICT DO NOTHING;

 Insert Sample Users (If needed - customize as per your requirements)
 INSERT INTO users (username, email, password, first_name, last_name, phone, role) VALUES
   ('owner1', 'owner1@example.com', 'hashed_password', 'Owner', 'One', '9876543210', 'owner'),
   ('user1', 'user1@example.com', 'hashed_password', 'User', 'One', '9876543211', 'user');
 Insert Sample Vehicles (optional - customize as per your requirements)
 INSERT INTO vehicles (owner_id, name, type_id, description, capacity, price_per_km, city, available, image_url, features) VALUES
  (1, 'Toyota Innova', 1, 'Comfortable sedan for city travel', 5, '10.00', 'Chennai', true, NULL, 'AC,Power Windows'),
 (1, 'Volvo Bus', 2, 'Large bus for groups', 50, '15.00', 'Bangalore', true, NULL, 'AC,Reclining Seats');
