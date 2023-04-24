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

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    const error = await keycloakObject.validateToken(authorization);
    if (error) {
        return res.status(403).send({ error });
    }
    next();
}

module.exports = {
    loginController,
    validateToken
};