FROM postgres:alpine

ENV POSTGRES_PASSWORD=''
ENV POSTGRES_DB=reservation
ENV POSTGRES_USER=reservation_user

COPY db/data-generation/ /db/data-generation/

ADD db/postgreschema.sql /docker-entrypoint-initdb.d

EXPOSE 5432
