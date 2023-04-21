const { keycloakObject } = require('../config');

const loginController = async (req, res, next) => {

    const { username, password } = req.body;

    const tokenData = await keycloakObject.getToken(
        username,
        password,
        process.env.KEYCLOAK_CLIENT_ID,
        process.env.KEYCLOAK_CLIENT_SECRET
    );

    res.status(200).send(tokenData);
};

module.exports = {
    loginController
};