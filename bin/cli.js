const { exeSync } = require("child_process");

const runCommand = (command) => {
  try {
    exeSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/lahiruExpernetic/testbolt-automation.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);
