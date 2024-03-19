const { PublicClientApplication } = require('@azure/msal-node');
const msalConfig = {
    auth: {
        clientId: '10e926ad-8ba8-47be-8dca-9ada3072fb3e',
        authority: 'https://login.microsoftonline.com/d05546f2-f265-4777-99b0-8d519534b90f',
    }
};

const pca = new PublicClientApplication(msalConfig);

async function signIn() {
    const deviceCodeRequest = {
        deviceCodeCallback: async (response) => {
            console.log(response.message);
            try {
                const open = (await import('open')).default;
                if (response.verificationUri) {
                    open(response.verificationUri);
                } else {
                    console.error("Verification URL is undefined.");
                }
            } catch (error) {
                console.error('Failed to open the browser:', error);
            }
        },
        scopes: ["user.Read"],
    };

    return new Promise((resolve, reject) => {
        pca.acquireTokenByDeviceCode(deviceCodeRequest)
            .then((response) => {
                console.log('Token acquired');
                resolve(response.accessToken);
            })
            .catch((error) => {
                console.error('Error acquiring token:', error);
                reject(error);
            });
    });
}

module.exports = { signIn };
