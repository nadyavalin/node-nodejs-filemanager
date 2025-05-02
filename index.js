import { createCliInterface, handleExit, userPrompt } from "./cli/cli.js";
import { getUserName } from "./utils/getUserName.js";
import { MESSAGES } from "./constants/messages.js";

const userName = getUserName();
console.log(MESSAGES.WELCOME(userName));
console.log(MESSAGES.CURRENT_DIR(process.cwd()));

const readLine = createCliInterface();

userPrompt(readLine, userName, (input) => {
  console.log(MESSAGES.INPUT_ECHO(input));
});

handleExit(readLine, userName);
