# university-library

This app is using PostgresSQL, in this repo there is the .sql file and the .erp diagram to build the database for the library.

This is a monorepo containing both backend and frontend

To run open a terminal inside each folder and run for the first time setup: `npm install`

then run:
`npm start`

Required env vars for Postgres:
- POSTGRES_USER
- POSTGRES_HOST
- POSTGRES_DB
- POSTGRESS_PASS
- POSTGRESS_PORT

Env for fastify server:
- PORT
- HOST
