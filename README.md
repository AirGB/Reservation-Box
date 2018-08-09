# Reservation Service for AirGB

> Booking module allows user to see general listing details, vacancies in a month, and make a reservation by choosing check-in/check-out dates on a calendar, and specify number of guests.

## Related Projects

  - https://github.com/AirGB/hero-photo-service
  - https://github.com/AirGB/Review-service
  - https://github.com/AirGB/about-service
  - https://github.com/AirGB/kony-proxy

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [API](#API)

## Usage

- Use this app to further investigate the reservation service component of our AirGB project. For those who are curious, the GB in AirGB stands for Good Boi

## Requirements

- Node 6.13.0
- Mysql 5.7.22 

## Development

### Setting Up 

To create database of mock data
From within root directory:

```sh
mysql -h localhost -u root 
source db/schema.sql
use reservation
source mock-data/mock_data.sql
```


To install dependencies
From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
npm start
```

## API

### To make a GET request to the server to retrieve a listing's information by id

```sh
curl -H "Content-Type: application/json" -X GET -d '{"listingId":"1234567"}' http://localhost:3003/api/listings/:listingId
```
### To make a POST request to the server to add a new reservation 

```sh
curl -H "Content-Type: application/json" -X POST -d '{"guest_id":"184", "booked_dates_id":"763", "total_adults":"1", "total_pups":"5", "total_charge":"117.54"}' http://localhost:3003/api/reservations/new
```

### To make a PUT request to updat a listing at a specific id with a new rate

```sh
curl -H "Content-Type: application/json" -X PUT -d '{"listingId":"20183", "rate":"135.99"}' http://localhost:3003/api/listing/:listingId/rate/:rate
```

### To make a DELETE request to delete a reservation by id

```sh
curl -H "Content-Type: application/json" -X DELETE -d '{"reservationId":"2018"}' http://localhost:3003/api/reservation/:reservationId
```


