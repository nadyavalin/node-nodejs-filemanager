import path from "path";
import fs from "fs";
import { ERROR_MESSAGES } from "../constants/messages.js";

function changeDirectory(path) {
  try {
    const stats = fs.statSync(path);

    if (!fs.existsSync(path)) {
      return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
    }

    if (!stats.isDirectory()) {
      return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
    }

    process.chdir(path);
    return { success: true, message: "" };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}

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
    const absolutePath = path.resolve(process.cwd(), targetPath);

    return changeDirectory(absolutePath);
  }

  if (command.toLowerCase() === "up") {
    if (args.length > 0) {
      return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
    }

    const parentPath = path.resolve(process.cwd(), "..");
    return changeDirectory(parentPath);
  }

  if (command.toLowerCase() === "ls") {
    if (args.length > 0) {
      return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
    }

    try {
      const items = fs.readdirSync(process.cwd());
      const directories = [];
      const files = [];

      for (const item of items) {
        const itemPath = path.join(process.cwd(), item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
          directories.push(item);
        } else if (stats.isFile()) {
          files.push(item);
        }
      }

      directories.sort((a, b) => a.localeCompare(b));
      files.sort((a, b) => a.localeCompare(b));

      const tableData = [];
      const allItems = [...directories, ...files];
      allItems.forEach((item, index) => {
        const type = directories.includes(item) ? "directory" : "file";
        tableData.push({ Name: item, Type: type });
      });

      if (tableData.length > 0) {
        console.table(tableData);
      }

      return { success: true, message: "" };
    } catch (error) {
      return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
    }
  }

  return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
}
