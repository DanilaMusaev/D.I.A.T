CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE packs(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);