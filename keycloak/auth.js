const axios = require('axios');
const qs = require('qs');
const jwt = require('jsonwebtoken');
const { DEFAULT_GROUP } = require('../constants/auth');

class KeycloakIAM {
    constructor(baseUrl, realm) {
        this.baseUrl = baseUrl;
        this.realm = realm;
    }

    /**
     * get token based on username and password
     */
    getToken = async (username, password, clientId, clientSecret, grantType = 'password') => {
        const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;

        const data = qs.stringify({
            username: username,
            password: password,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: grantType
        });

        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return response.data;
    };

    /**
     * Validate token for authentication
     */
    validateToken = async (accessToken) => {
        if (!accessToken) {
            return "Token is missing";
        }

        const active = await this.tokenIntrospect(
            accessToken,
            process.env.KEYCLOAK_CLIENT_ID,
            process.env.KEYCLOAK_CLIENT_SECRET
        );

        if (!active) {
            return "Invalid Token"
        }

        const { groups } = await jwt.decode(accessToken);
        if (!groups.includes(DEFAULT_GROUP)) {
            return "User not found in Default group, please contact System Administrator."
        }
    }

    /**
     * Token introspect: it will check if token is active
     */
    tokenIntrospect = async (token, clientId, clientSecret) => {
        const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token/introspect`;

        const data = qs.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            token: token
        });

        try {
            const response = await axios.post(url, data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            return response.data.active
        } catch (error) {
            const error_prefix = "An error occurred while validating token"
            console.error(`${error_prefix} ${error}`)
            return error_prefix
        }
    }
}

module.exports = {
    KeycloakIAM
};