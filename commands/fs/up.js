import path from "path";
import { promises as fs } from "fs";
import { ERROR_MESSAGES } from "../../constants/fsMessages.js";

export async function up(inputArgs) {
  if (inputArgs.length > 0) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const parentPath = path.resolve(process.cwd(), "..");

  try {
    await fs.access(parentPath);

    const stats = await fs.stat(parentPath);
    if (!stats.isDirectory()) {
      return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
    }

    process.chdir(parentPath);
    return { success: true, message: "" };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
