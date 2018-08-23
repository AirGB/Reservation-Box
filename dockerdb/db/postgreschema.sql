
-- USE SERIAL for primary keys

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text NOT NULL
);

CREATE TABLE hosts (
  id SERIAL PRIMARY KEY,
  user_id int
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  total_reviews int,
  avg_rating int
);
    
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  property_name text,
  host_id int,
  review_id int,
  views_id int,
  min_stay int,
  max_guests int,
  fees int,
  tax_rate int,
  rate int NOT NULL
);

CREATE TABLE booked_dates (
  id SERIAL PRIMARY KEY,
  listing_id int, 
  check_in date NOT NULL,
  check_out date NOT NULL
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  guest_id int,
  booked_dates_id int,
  total_adults int NOT NULL,
  total_pups int,
  total_charge int NOT NULL,
  created_at date default current_timestamp
);

-- copy csv files into correct table
\COPY users (id, username) FROM './db/data-generation/usersData.csv' DELIMITER ',' CSV;
\COPY hosts (id, user_id) FROM './db/data-generation/hostsData.csv' DELIMITER ',' CSV;
\COPY reviews (id, total_reviews, avg_rating) FROM './db/data-generation/reviewsData.csv' DELIMITER ',' CSV;
\COPY listings (id, property_name, host_id, review_id, views_id, min_stay, max_guests, fees, tax_rate, rate) FROM './db/data-generation/listingsData.csv' DELIMITER ',' CSV;
\COPY booked_dates (id, listing_id, check_in, check_out) FROM './db/data-generation/bookedDatesData.csv' DELIMITER ',' CSV;
\COPY reservations (id, guest_id, booked_dates_id, total_adults, total_pups, total_charge, created_at) FROM './db/data-generation/reservationsData.csv' DELIMITER ',' CSV;

ALTER TABLE hosts ADD CONSTRAINT fk_hosts_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE listings ADD CONSTRAINT fk_listings_host_id FOREIGN KEY (host_id) REFERENCES hosts(id);
ALTER TABLE listings ADD CONSTRAINT fk_listings_reviews_id FOREIGN KEY (review_id) REFERENCES reviews(id);
ALTER TABLE booked_dates ADD CONSTRAINT fk_booked_dates_listing_id FOREIGN KEY (listing_id) REFERENCES listings(id);
ALTER TABLE reservations ADD CONSTRAINT fk_reservations_guest_id FOREIGN KEY (guest_id) REFERENCES users(id);
ALTER TABLE reservations ADD CONSTRAINT fk_reservations_booked_dates_id FOREIGN KEY (booked_dates_id) REFERENCES booked_dates(id);

-- create indexes here before dockerizing
CREATE INDEX on booked_dates (listing_id);
CREATE INDEX on booked_dates (check_in);
CREATE INDEX on booked_dates (check_out);


  