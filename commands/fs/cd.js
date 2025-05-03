import path from "path";
import { promises as fs } from "fs";
import { ERROR_MESSAGES } from "../../constants/messages.js";

export async function cd(inputArgs) {
  if (inputArgs.length === 0) {
    return { success: false, message: ERROR_MESSAGES.CD_NO_PATH };
  }

  const targetPath = inputArgs.join(" ").replace(/^"|"$/g, "").trim();
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
