create table tasks(
  id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) NOT NULL,
  done boolean DEFAULT FALSE
);

create table timeSlices(
  id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
  comment varchar(255) NOT NULL,
  start datetime,
  end datetime
);