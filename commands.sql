-- Check current database
-- or \c
SELECT current_database();

-- List all databases
-- or \l
SELECT datname FROM pg_database;

-- Switch to the app database
-- \c fullstackopen_part13_blue_glitter_1370

-- List all tables in the database \d

-- Create the blogs table
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0
);

-- List all tables in the database \d
-- Verify the table structure \d blogs

-- Add two blogs to the database
INSERT INTO blogs (author, url, title, likes)
VALUES
  ('John Doe', 'https://example.com/blog1', 'My First Blog', 10),
  ('Jane Doe', 'https://example.com/blog2', 'My Second Blog', 20);

-- List all entries on blogs
SELECT * FROM blogs;