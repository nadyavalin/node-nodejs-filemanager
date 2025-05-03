import path from "path";
import fs from "fs/promises";
import { ERROR_MESSAGES, MESSAGES } from "../../constants/fsMessages.js";

export async function rn(inputArgs) {
  if (inputArgs.length !== 2) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const oldPath = inputArgs[0].replace(/^"|"$/g, "").trim();
  const newFileName = inputArgs[1].replace(/^"|"$/g, "").trim();

  if (newFileName.includes(" ")) {
    return { success: false, message: ERROR_MESSAGES.NO_SPACES_IN_NEW_FILE };
  }

  const absoluteOldPath = path.resolve(process.cwd(), oldPath);
  const newPath = path.join(path.dirname(absoluteOldPath), newFileName);

  try {
    await fs.access(absoluteOldPath);

    const stats = await fs.stat(absoluteOldPath);
    if (!stats.isFile()) {
      return {
        success: false,
        message: ERROR_MESSAGES.CORRECT_TYPE,
      };
    }

    try {
      await fs.access(newPath);
      return {
        success: false,
        message: ERROR_MESSAGES.EXISTS_NEW_NAME_FILE(newFileName),
      };
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await fs.rename(absoluteOldPath, newPath);
    return {
      success: true,
      message: MESSAGES.SUCCESS_RENAME_FILE(newFileName),
    };
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
