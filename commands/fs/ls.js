import path from "path";
import { promises as fs } from "fs";
import { ERROR_MESSAGES } from "../../constants/fsMessages.js";

export async function ls(inputArgs) {
  if (inputArgs.length > 0) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  try {
    const currentDir = process.cwd();
    const items = await fs.readdir(currentDir);
    const directories = [];
    const files = [];

    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stats = await fs.stat(itemPath);
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
    allItems.forEach((item, _) => {
      let displayName = item;
      if (item.length > 30) {
        displayName = item.substring(0, 27) + "...";
      }
      const type = directories.includes(item) ? "directory" : "file";
      tableData.push({ Name: displayName, Type: type });
    });

    if (tableData.length > 0) {
      console.table(tableData);
    }

    return { success: true, message: "" };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
