const axios = require('axios');

async function callApi(endpoint, token) {
    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to call API:', error);
        throw error;
    }
}

module.exports = { callApi };
