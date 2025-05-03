import { ERROR_MESSAGES } from "../constants/messages.js";
import { cd } from "./cd.js";
import { up } from "./up.js";
import { ls } from "./ls.js";
import { cat } from "./cat.js";
import { add } from "./add.js";
import { mkdir } from "./mkdir.js";

export async function processCommand(input) {
  const [command, ...args] = input.trim().split(/\s+/);
  const fullArgs = args.join(" ").trim();

  if (!command) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const commandLower = command.toLowerCase();

  switch (commandLower) {
    case "cd":
      return await cd(fullArgs ? [fullArgs] : []);
    case "up":
      return await up([]);
    case "ls":
      return await ls([]);
    case "cat":
      return await cat(fullArgs ? [fullArgs] : []);
    case "add":
      return await add(fullArgs ? [fullArgs] : []);
    case "mkdir":
      return await mkdir(fullArgs ? [fullArgs] : []);
    default:
      return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }
}
