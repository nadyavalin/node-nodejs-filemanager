import readline from "readline";
import { MESSAGES } from "../constants/fsMessages.js";

export function createCliInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export async function userPrompt(
  rl,
  username,
  callback,
  isFirstPrompt = false
) {
  if (isFirstPrompt) {
    process.stdout.write(MESSAGES.COMMAND_PROMPT + "\n");
  }

  const input = await new Promise((resolve) => {
    rl.question("> ", (answer) => resolve(answer));
  });

  if (input.trim() === ".exit") {
    exitProgram(rl, username);
    return;
  }

  await callback(input);

  process.stdout.write(MESSAGES.CURRENT_DIR(process.cwd()) + "\n");
  await userPrompt(rl, username, callback);
}

export function handleExit(rl, username) {
  rl.on("SIGINT", () => {
    exitProgram(rl, username);
  });
}

function exitProgram(rl, username) {
  process.stdout.write(MESSAGES.FAREWELL(username) + "\n");
  rl.close();
  process.exit(0);
}
