import { ERROR_MESSAGES } from "../../constants/fsMessages.js";
import { changeDirectory } from "../../utils/changeDir.js";

export async function up(inputArgs) {
  if (inputArgs.length > 0) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  return await changeDirectory("..");
}
