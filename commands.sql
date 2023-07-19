CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  content text NOT NULL,
  important boolean,
  date time
)

insert into notes (content, important) values ('Relational databases rule the world', true);

insert into notes (content, important) values ('MongoDB is webscale', false);