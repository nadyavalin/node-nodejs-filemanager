import fs from "fs/promises";
import { ERROR_MESSAGES, MESSAGES } from "../constants/messages.js";

export async function add(inputArgs) {
  if (inputArgs.length !== 1) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const fileName = inputArgs[0].replace(/^"|"$/g, "").trim();

  if (fileName.includes(" ")) {
    return { success: false, message: ERROR_MESSAGES.NO_SPACES_IN_FILE };
  }

  const filePath = `${process.cwd()}/${fileName}`;

  try {
    try {
      await fs.access(filePath);
      return { success: false, message: ERROR_MESSAGES.EXISTS_FILE(fileName) };
    } catch {
      await fs.writeFile(filePath, "", { flag: "wx" });
      return {
        success: true,
        message: MESSAGES.SUCCESS_CREATE_FILE(fileName),
      };
    }
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
