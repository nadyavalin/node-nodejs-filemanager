import readline from "readline";
import { MESSAGES } from "./messages.js";

export function createCliInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function exitProgram(rl, username) {
  console.log(MESSAGES.FAREWELL(username));
  rl.close();
  process.exit(0);
}

export function userPrompt(rl, username, callback) {
  rl.question("> ", (input) => {
    if (input.trim() === ".exit") {
      exitProgram(rl, username);
    }
    callback(input);
    userPrompt(rl, username, callback);
  });
}

export function handleExit(rl, username) {
  rl.on("SIGINT", () => {
    exitProgram(rl, username);
  });
}
