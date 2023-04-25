To run this project:

`docker-compose up --build -d`

## Technologies used:

- Backend: Node JS
- OpenID-Connect: Keycloak
- Database: Mongo DB

## Database Migration

- package-used: [migrate-mongo](https://www.npmjs.com/package/migrate-mongo)
- dependency package is mongodb
- `migrate-mongo init`: To initilise migration config file (make changes: database url)
- `migrate-mongo create <<file_name>>`: To create new migration file (write code for up/down migration)
- up/down method is used in node js app, to migrate the changes accordingly (upgrade/downgrade)

## Project Structure

- \routes:
- \controllers:
- \services:
- \models:
- \helpers:
- \constants:
- \migrations:
- \keycloak:
- app.js:
- config.js:
