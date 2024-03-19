#!/usr/bin/env node

const readline = require('readline');
const { signIn } = require('./src/auth');
const { callApi } = require('./src/api');

let accessToken = null;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Welcome to the Interactive CLI');
console.log('Commands: login, call-api <endpoint>, exit');

rl.prompt();

rl.on('line', async (input) => {
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'login':
            signIn().then(token => {
                accessToken = token;
                console.log('Logged in. Token stored in session.');
            }).catch(error => console.error('Login error:', error));
            break;
        case 'call-api':
            if (!accessToken) {
                console.log('Please login first.');
            } else {
                const endpoint = args.join(' ');
                callApi(endpoint, accessToken)
                    .then(data => console.log('API Response:', data))
                    .catch(error => console.error('API Call Error:', error));
            }
            break;
        case 'exit':
            rl.close();
            break;
        default:
            console.log('Unknown command. Available commands are: login, call-api <endpoint>, exit');
    }
    rl.prompt();
}).on('close', () => {
    console.log('Session ended. Goodbye!');
    process.exit(0);
});
