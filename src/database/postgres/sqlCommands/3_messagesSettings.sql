BEGIN ;

DROP TABLE IF EXISTS "messagesSettings" CASCADE;

CREATE TABLE "messagesSettings"
(
    id               SERIAL PRIMARY KEY,
    "userId"         int not null,
    "messageId"      int not null,
    "inTrash"          bool default false,
    "addedToTrashDate" timestamptz,
    "read"          bool default false,
    "readDate" timestamptz,
    deleted          bool default false,
    FOREIGN KEY ("userId") REFERENCES users (id),
    FOREIGN KEY ("messageId") REFERENCES messages (id)
);

END;