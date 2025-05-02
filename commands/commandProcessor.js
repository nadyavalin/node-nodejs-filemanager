import path from "path";
import fs from "fs";
import { ERROR_MESSAGES } from "../constants/messages.js";

export function processCommand(input) {
  const [command, ...args] = input.trim().split(/\s+/);

  if (!command) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  if (command.toLowerCase() === "cd") {
    if (args.length === 0) {
      return { success: false, message: ERROR_MESSAGES.CD_NO_PATH };
    }

    const targetPath = args.join(" ").replace(/^"|"$/g, "").trim();

    try {
      const absolutePath = path.resolve(process.cwd(), targetPath);
      const stats = fs.statSync(absolutePath);

      if (!fs.existsSync(absolutePath)) {
        return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
      }

      if (!stats.isDirectory()) {
        return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
      }

      process.chdir(absolutePath);
      return { success: true, message: "" };
    } catch (error) {
      return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
    }
  }


  if (command.toLowerCase() === "up") {
    if (args.length > 0) {
      return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
    }

    try {
      const parentPath = path.resolve(process.cwd(), "..");
      const stats = fs.statSync(parentPath);

      if (!fs.existsSync(parentPath)) {
        return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
      }

      if (!stats.isDirectory()) {
        return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
      }

      process.chdir(parentPath);
      return { success: true, message: "" };
    } catch (error) {
      return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
    }
  }
  return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
}
