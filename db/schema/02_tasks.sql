DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  start_date DATE,
  category VARCHAR(255),
  urgency SMALLINT DEFAULT 1,
  complete BOOLEAN NOT NULL DEFAULT FALSE
)