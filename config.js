const mongoose = require('mongoose');
const logger = require('morgan');
const { KeycloakIAM } = require('./keycloak/auth');
const { database, up, down } = require('migrate-mongo')

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    logger('Database connected successfully!');
}).then(() => migrate()).catch((err) => {
    logger('Error occurred while connecting database!', err);
});


/**
 * to migrate the changes based on the migration file
 */
const migrate = async () => {
    const { db, client } = await database.connect();
    await up(db, client);
}

module.exports.keycloakObject = new KeycloakIAM(
    process.env.KEYCLOAK_AUTH_SERVER_URL,
    process.env.KEYCLOAK_REALM
);