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
  (input) => {
    const result = processCommand(input);
    console.log(result.message);
  },
  true
);

handleExit(readLine, userName);
