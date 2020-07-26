BEGIN;

DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE messages
(
    id             SERIAL PRIMARY KEY,
    "sender"       int,
    "receiver"       int,
    "subject"       int,
    "message"      VARCHAR(300),
    "creationDate" TIMESTAMPTZ default current_timestamp,
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (receiver) REFERENCES users(id)

);


END;