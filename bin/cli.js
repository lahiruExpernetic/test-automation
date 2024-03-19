#!/usr/bin/env node
const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const repoName = "testbolt-automation";
const gitCheckoutCommand = `git clone --depth 1 https://github.com/lahiruExpernetic/testbolt-automation.git`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`cloning repo with ${repoName}`);

const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);
