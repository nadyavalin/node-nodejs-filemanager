import os from "os";
import { getUserName } from "./utils/getUserName.js";
import { createCliInterface, handleExit, userPrompt } from "./cli/cli.js";
import { processCommand } from "./commands/commandProcessor.js";
import { MESSAGES } from "./constants/fsMessages.js";

process.chdir(os.homedir());

const userName = getUserName();
console.log(MESSAGES.WELCOME(userName));
let currentDir = process.cwd();
console.log(MESSAGES.CURRENT_DIR(currentDir));

const readLine = createCliInterface();

userPrompt(
  readLine,
  userName,
  async (input) => {
    const result = await processCommand(input);
    if (result && result.message) {
      console.log(result.message);
      if (result.newDir) {
        currentDir = result.newDir;
        console.log(MESSAGES.CURRENT_DIR(currentDir));
      }
    } else if (result && result.content) {
      console.log(result.content);
    }
  },
  true
);

handleExit(readLine, userName);
