-- basically deletes table if it already exists
-- Cascade means if you find a table and it has foreign keys, go to that table and do w/e command
-- on that table as well
DROP TABLE IF EXISTS webpageranking CASCADE;

-- in psql have to make sure you're logged into the correct db
-- unit 10 sql part
-- basically you have to run this script page on psql separately
-- only runs once and you don't have to care about it again 
-- only has to run once ever, not every time I'm starting up the server

CREATE TABLE webpageranking (
  "username" VARCHAR PRIMARY KEY,
  "password" VARCHAR NOT NULL,
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "interval" INTERVAL
);

CREATE TABLE contacts (
  "contact_id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "company" VARCHAR NOT NULL,
  "email" VARCHAR
);

CREATE TABLE engagements (
  "username" VARCHAR NOT NULL,
  "contact_id" INTEGER NOT NULL,
  "time_created" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "method" VARCHAR NOT NULL,
  "status" status NOT NULL DEFAULT 'pending',
  "notes" VARCHAR,
  PRIMARY KEY (username, contact_id, time_created),
  FOREIGN KEY (username)
    REFERENCES users (username)
    ON DELETE CASCADE,
  FOREIGN KEY (contact_id)
    REFERENCES contacts (contact_id)
    ON DELETE CASCADE
);