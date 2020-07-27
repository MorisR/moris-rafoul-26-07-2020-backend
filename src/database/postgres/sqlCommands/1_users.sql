BEGIN;

DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users
(
    id          SERIAL PRIMARY KEY,
    "firstName" text not null ,
    "lastName"  text not null ,
    "email"     text not null ,
    "password"  text not null ,
    "isDeleted" bool default false not null
);


END;