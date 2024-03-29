DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  start_date TIMESTAMP,
  category VARCHAR(255),
  urgency SMALLINT DEFAULT 1,
  complete BOOLEAN NOT NULL DEFAULT FALSE
);
