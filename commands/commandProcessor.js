import { ERROR_MESSAGES } from "../constants/messages.js";
import { parseRnArgs } from "../utils/parseRnArgs.js";
import { cd } from "./cd.js";
import { up } from "./up.js";
import { ls } from "./ls.js";
import { cat } from "./cat.js";
import { add } from "./add.js";
import { mkdir } from "./mkdir.js";
import { rn } from "./rn.js";
import { cp } from "./cp.js";
import { mv } from "./mv.js";

export async function processCommand(input) {
  const parts = input.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);
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
    case "rn":
      const rnArgs = parseRnArgs(input.replace(/^rn\s+/, ""));
      return await rn(rnArgs.length === 2 ? rnArgs : []);
    case "cp":
      const cpArgs = parseRnArgs(input.replace(/^cp\s+/, ""));
      return await cp(cpArgs.length === 2 ? cpArgs : []);
    case "mv":
      const mvArgs = parseRnArgs(input.replace(/^mv\s+/, ""));
      return await mv(mvArgs.length === 2 ? mvArgs : []);
    default:
      return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }
}
