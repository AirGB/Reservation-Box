#!/bin/bash

dropdb --if-exists reservation
dropuser --if-exists reservation_user

createdb reservation
psql reservation < ./postgreschema.sql

psql reservation -c "create user reservation_user;"
psql reservation -c "alter user reservation_user password 'root';"
psql reservation -c "grant all on DATABASE reservation to reservation_user;"
psql reservation -c "GRANT ALL on ALL TABLES in SCHEMA public to reservation_user;"