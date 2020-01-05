create database nodejs_pomodoro_dev character set utf8 collate utf8_unicode_ci;
create user 'pomodoroapp'@'localhost' identified by 'Pomodoro';
grant all privileges on nodejs_pomodoro_dev.* to 'pomodoroapp'@'localhost';
flush privileges;