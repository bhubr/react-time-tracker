# Node.js/React/Redux Time Tracker app

This is yet another Pomodoro-technique-inspired app, for task&time tracking.

**STATUS (2018-09)**: not stable (at all!)

## Requirements

If you intend to run this on your computer or on a server, you'll need:
* Node.js (tested with 8.x)
* MySQL (tested with 5.7)

That's pretty much it!

## Configuration

* Create a MySQL database for the app, a user with privileges on that database if need be (example in `back/sql/init.sql`)
* Inject `back/schema/schema.sql` into that database
* Copy `back/credentials.sample.js` to `back/credentials.js` and edit the latter, according to your DB setup
* In both `back` and `front`, run `npm install`

## Run

* Start server with `npm start` from `back` (you may set `PORT` to a custom port, `5000` is the default)
* Start client with `npm start` from `front` (change `proxy` in `package.json` if you changed the server's port)

