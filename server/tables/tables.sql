-- basically deletes table if it already exists
-- Cascade means if you find a table and it has foreign keys, go to that table and do w/e command
-- on that table as well
DROP TABLE IF EXISTS webpageranking CASCADE;

-- in psql have to make sure you're logged into the correct db
-- unit 10 sql part
-- basically you have to run this script page on psql separately
-- only runs once and you don't have to care about it again 
-- only has to run once ever, not every time I'm starting up the server

CREATE TABLE all_websites (
  "domain_name" VARCHAR PRIMARY KEY,
);

CREATE TABLE all_websites (
  "domain_name" VARCHAR PRIMARY KEY,
);