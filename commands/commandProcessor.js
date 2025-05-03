import { ERROR_MESSAGES } from "../constants/messages.js";
import { cd } from "./cd.js";
import { up } from "./up.js";
import { ls } from "./ls.js";
import { cat } from "./cat.js";

export async function processCommand(input) {
  const [command, ...args] = input.trim().split(/\s+/);

  if (!command) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const commandLower = command.toLowerCase();

  switch (commandLower) {
    case "cd":
      return await cd(args);
    case "up":
      return await up(args);
    case "ls":
      return await ls(args);
    case "cat":
      return await cat(args);
    default:
      return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }
}
