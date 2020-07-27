BEGIN;

DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE messages
(
    id             SERIAL PRIMARY KEY,
    "sender"       int,
    "receiver"     int,
    "subject"      text not null,
    "message"      text,
    "creationDate" TIMESTAMPTZ default current_timestamp,
    "deleted"      bool default false not null,
    "inTrash"      bool default false not null,
    "movedToTrashDate" TIMESTAMPTZ default null,
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (receiver) REFERENCES users(id)
);


END;