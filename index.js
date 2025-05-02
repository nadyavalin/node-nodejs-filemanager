import { getUserName } from "./utils/getUserName.js";
import { createCliInterface, userPrompt, handleExit } from "./utils/cli.js";
import { MESSAGES } from "./utils/messages.js";

const userName = getUserName();
console.log(MESSAGES.WELCOME(userName));

const readLine = createCliInterface();

userPrompt(readLine, userName, (input) => {
  console.log(MESSAGES.INPUT_ECHO(input));
});

handleExit(readLine, userName);
