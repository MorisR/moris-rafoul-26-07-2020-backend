BEGIN;

DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE messages
(
    id                 SERIAL PRIMARY KEY,
    "sender"           int,
    "receiver"         int,
    "subject"          text not null,
    "message"          text        default '',
    "creationDate"     TIMESTAMPTZ default current_timestamp,

    FOREIGN KEY (sender) REFERENCES users (id),
    FOREIGN KEY (receiver) REFERENCES users (id)
);

DROP TABLE IF EXISTS "messagesSettings" CASCADE;

CREATE TABLE "messagesSettings"
(
    id               SERIAL PRIMARY KEY,
    "userId"         int,
    "messageId"      int,
    "inTrash"          bool default false,
    deleted          bool default false,
    "addedToTrashDate" timestamptz,
    FOREIGN KEY ("userId") REFERENCES users (id),
    FOREIGN KEY ("messageId") REFERENCES messages (id)
);


END;