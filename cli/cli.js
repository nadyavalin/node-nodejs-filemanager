import readline from "readline";
import { MESSAGES } from "../constants/messages.js";

export function createCliInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export function userPrompt(rl, username, callback, isFirstPrompt = false) {
  if (isFirstPrompt) {
    console.log(MESSAGES.COMMAND_PROMPT);
  }
  rl.question("> ", (input) => {
    if (input.trim() === ".exit") {
      exitProgram(rl, username);
    }
    callback(input);
    console.log(MESSAGES.CURRENT_DIR(process.cwd()));
    userPrompt(rl, username, callback);
  });
}

export function handleExit(rl, username) {
  rl.on("SIGINT", () => {
    exitProgram(rl, username);
  });
}

function exitProgram(rl, username) {
  console.log(MESSAGES.FAREWELL(username));
  rl.close();
  process.exit(0);
}
