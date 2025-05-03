import fs from "fs/promises";
import { ERROR_MESSAGES, MESSAGES } from "../constants/messages.js";

export async function mkdir(inputArgs) {
  if (inputArgs.length !== 1) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const dirName = inputArgs[0].replace(/^"|"$/g, "").trim();

  if (dirName.includes(" ")) {
    return { success: false, message: ERROR_MESSAGES.NO_SPACES("Directory") };
  }

  const dirPath = `${process.cwd()}/${dirName}`;

  try {
    try {
      await fs.access(dirPath);
      return { success: false, message: ERROR_MESSAGES.EXISTS("Directory") };
    } catch {
      await fs.mkdir(dirPath);
      return {
        success: true,
        message: MESSAGES.SUCCESS_CREATE("Directory", dirName),
      };
    }
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
