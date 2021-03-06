# Node.js/React/Redux Time Tracker app

This is yet another Pomodoro-technique-inspired app, for task&time tracking.

**STATUS (2018-09)**: not stable (at all!)

## Install

* Clone this repo
* Install [pnpm](https://pnpm.js.org/) globally: `npm i -g pnpm`
* Run `pnpm install` then `npx lerna bootstrap`

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

## Prepare for Dokku deployment

* `build` script key and `engines` ([example](https://github.com/amannn/dokku-node-hello-world/blob/master/package.json)) in `package.json`
* `dotenv`
* Serve the front app from backend (already done)
* Scope lerna start to only start backend app in production: [lerna exec, lerna run and scoping](https://github.com/lerna/lerna/pull/152)
* Basic auth, depending on existence of env vars. Configure [express-basic-auth](https://www.npmjs.com/package/express-basic-auth) with [challenge](https://stackoverflow.com/questions/48770330/how-to-get-express-basic-auth-to-prompt-a-popup-for-user-and-password)

## Deploy!

Sources:
* [Dokku - Deploying to Dokku](http://dokku.viewdocs.io/dokku~v0.19.11/deployment/application-deployment/)
* [Dokku - Environment Variables](http://dokku.viewdocs.io/dokku~v0.19.11/configuration/environment-variables/)
* [dokku-node-hello-world](https://github.com/amannn/dokku-node-hello-world)

### 1. Create app

```
dokku apps:create app-name
```

### 2. Install [Dokky MySQL plugin](https://github.com/dokku/dokku-mysql)

To be done once only

```
sudo dokku plugin:install https://github.com/dokku/dokku-mysql.git mysql
```

### 3. Create DB service

```
dokku mysql:create myappdb
```

### 4. Link DB service to app

```
dokku mysql:link myappdb app-name
```

**BEWARE**, you don't have to use the `DB_*` vars from env, but `DATABASE_URL`, e.g.: `mysql://mysql:863504e9c117e833@dokku-mysql-myappdb:3306/myappdb`

### 5. Deploy

Inject a dump to populate the DB. e.g.:

```
dokku mysql:import traktdb < trakt-20200106.sql
```

Set environment variables, e.g. for Basic Auth:

```
dokku config:set trakt AUTH_USER=foo AUTH_PASS=bar
```

Push the project to Dokku

```
git remote add dokku dokku@subdomain.dokku.me:app-name
git push dokku master
```
