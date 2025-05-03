import { ERROR_MESSAGES } from "../constants/messages.js";
import { parseRnArgs } from "../utils/parseRnArgs.js";
import { cd } from "./fs/cd.js";
import { up } from "./fs/up.js";
import { ls } from "./fs/ls.js";
import { cat } from "./fs/cat.js";
import { add } from "./fs/add.js";
import { mkdir } from "./fs/mkdir.js";
import { rn } from "./fs/rn.js";
import { cp } from "./fs/cp.js";
import { mv } from "./fs/mv.js";
import { rm } from "./fs/rm.js";
import { eol } from "./os/eol.js";
import { cpus } from "./os/cpus.js";
import { homedir } from "./os/homedir.js";
import { username } from "./os/username.js";

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
    case "rm":
      return await rm(fullArgs ? [fullArgs] : []);
    case "os":
      if (args.length !== 1) {
        return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
      }
      const flag = args[0];
      switch (flag) {
        case "--EOL":
          return await eol();
        case "--cpus":
          return await cpus();
        case "--homedir":
          return await homedir();
        case "--username":
          return await username();
        default:
          return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
      }
    default:
      return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }
}
