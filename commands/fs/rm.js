import fs from "fs/promises";
import path from "path";
import { ERROR_MESSAGES, MESSAGES } from "../../constants/fsMessages.js";

export async function rm(inputArgs) {
  if (inputArgs.length !== 1) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const filePath = inputArgs[0].replace(/^"|"$/g, "").trim();
  const absoluteFilePath = path.resolve(process.cwd(), filePath);

  try {
    const stats = await fs.stat(absoluteFilePath);
    if (!stats.isFile()) {
      return {
        success: false,
        message: ERROR_MESSAGES.CORRECT_TYPE,
      };
    }

    await fs.unlink(absoluteFilePath);
    return {
      success: true,
      message: MESSAGES.SUCCESS_DELETE(path.basename(absoluteFilePath)),
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      return {
        success: false,
        message: ERROR_MESSAGES.NOT_EXISTS_FILE(
          path.basename(absoluteFilePath)
        ),
      };
    }
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
