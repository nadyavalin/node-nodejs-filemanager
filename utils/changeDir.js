import path from "path";
import { promises as fs } from "fs";
import { ERROR_MESSAGES } from "../constants/fsMessages.js";

export async function changeDirectory(targetPath) {
  const absolutePath = path.resolve(process.cwd(), targetPath);

  try {
    await fs.access(absolutePath);

    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
    }

    process.chdir(absolutePath);
    return { success: true, message: "" };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
