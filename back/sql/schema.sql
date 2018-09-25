create table tasks (
  id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) NOT NULL,
  active boolean DEFAULT TRUE,
  done boolean DEFAULT FALSE
);

create table timeSlices (
  id integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
  taskId integer,
  type ENUM('POMODORO', 'SHORT_BREAK', 'LONG_BREAK'),
  comment varchar(255) NOT NULL DEFAULT '',
  start datetime,
  end datetime,
  foreign key (taskId) REFERENCES tasks(id)
);
