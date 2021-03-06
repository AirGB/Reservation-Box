
-- USE SERIAL for primary keys

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text NOT NULL
);

CREATE TABLE hosts (
  id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(id)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  total_reviews int,
  avg_rating int
);
    
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  property_name text,
  host_id int REFERENCES hosts(id),
  review_id int REFERENCES reviews(id),
  views_id int,
  min_stay int,
  max_guests int,
  fees int,
  tax_rate int,
  rate int NOT NULL
);

CREATE TABLE booked_dates (
  id SERIAL PRIMARY KEY,
  listing_id int REFERENCES listings(id), 
  check_in date NOT NULL,
  check_out date NOT NULL
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  guest_id int REFERENCES users(id),
  booked_dates_id int REFERENCES booked_dates(id),
  total_adults int NOT NULL,
  total_pups int,
  total_charge int NOT NULL,
  created_at date default current_timestamp
);

-- copy csv files into correct table
-- COPY users (id, username) FROM '/Users/AlecHyde/workspace/HRSF98/SDC/Reservation-Box/data-generation/usersData.csv' DELIMITER ',' CSV;
-- COPY hosts (id, user_id) FROM '/Users/AlecHyde/workspace/HRSF98/SDC/Reservation-Box/data-generation/hostsData.csv' DELIMITER ',' CSV;
-- COPY reviews (id, total_reviews, avg_rating) FROM '/Users/AlecHyde/workspace/HRSF98/SDC/Reservation-Box/data-generation/reviewsData.csv' DELIMITER ',' CSV;
-- COPY listings (id, property_name, host_id, review_id, views_id, min_stay, max_guests, fees, tax_rate, rate) FROM '/Users/AlecHyde/workspace/HRSF98/SDC/Reservation-Box/data-generation/listingsData.csv' DELIMITER ',' CSV;
-- COPY booked_dates (id, listing_id, check_in, check_out) FROM '/Users/AlecHyde/workspace/HRSF98/SDC/Reservation-Box/data-generation/bookedDatesData.csv' DELIMITER ',' CSV;
-- COPY reservations (id, guest_id, booked_dates_id, total_adults, total_pups, total_charge, created_at) FROM '/Users/AlecHyde/workspace/HRSF98/SDC/Reservation-Box/data-generation/reservationsData.csv' DELIMITER ',' CSV;

  

  
  