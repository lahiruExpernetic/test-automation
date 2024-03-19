const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const executedTestsPath = path.join(__dirname, 'executedTests.json');
const testsDir = path.join(__dirname, 'tests');
const executedTests = require(executedTestsPath);

function getTestFiles(dir) {
    return fs.readdirSync(dir)
        .filter(file => file.endsWith('.test.js') || file.endsWith('.spec.js'));
}

function runTests(testFiles) {
    testFiles.forEach(file => {
        try {
            console.log(`Running test: ${file}`);
            execSync(`npx playwright test ${file}`, { stdio: 'inherit' });
            executedTests.executedTests.push(file);
        } catch (error) {
            console.error(`Error running test: ${file}`);
        }
    });

    fs.writeFileSync(executedTestsPath, JSON.stringify(executedTests, null, 2));
}

const allTestFiles = getTestFiles(testsDir);
const notExecutedTests = allTestFiles.filter(file => !executedTests.executedTests.includes(file));

runTests(notExecutedTests);
