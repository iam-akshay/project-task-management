const axios = require('axios');
const qs = require('qs');

class KeycloakIAM {
    constructor(baseUrl, realm) {
        this.baseUrl = baseUrl;
        this.realm = realm;
    }

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
}

module.exports = {
    KeycloakIAM
};