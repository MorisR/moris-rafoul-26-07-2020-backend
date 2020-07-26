BEGIN;

DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users
(
    id             SERIAL PRIMARY KEY,
    "firstName"       text,
    "lastName"       text,
    "email"       text,
    "password"       text
);


END;