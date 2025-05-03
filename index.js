import os from "os";
import { getUserName } from "./utils/getUserName.js";
import { createCliInterface, handleExit, userPrompt } from "./cli/cli.js";
import { processCommand } from "./commands/commandProcessor.js";
import { MESSAGES } from "./constants/messages.js";

process.chdir(os.homedir());

const userName = getUserName();
console.log(MESSAGES.WELCOME(userName));
console.log(MESSAGES.CURRENT_DIR(process.cwd()));

const readLine = createCliInterface();

userPrompt(
  readLine,
  userName,
  async (input) => {
    const result = await processCommand(input);
    if (result && result.message) {
      console.log(result.message);
    } else if (result && result.content) {
      console.log(result.content);
    }
  },
  true
);

handleExit(readLine, userName);
