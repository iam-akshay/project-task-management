const mongoose = require('mongoose');
const logger = require('morgan');
const { KeycloakIAM } = require('./keycloak/auth');

mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    logger('Database connected successfully!');
}).catch(() => {
    logger('Error occurred while connecting database!');
});


module.exports.keycloakObject = new KeycloakIAM(
    process.env.KEYCLOAK_AUTH_SERVER_URL,
    process.env.KEYCLOAK_REALM
);