import { ERROR_MESSAGES } from "../../constants/fsMessages.js";
import { changeDirectory } from "../../utils/changeDir.js";

export async function cd(inputArgs) {
  if (inputArgs.length === 0) {
    return { success: false, message: ERROR_MESSAGES.CD_NO_PATH };
  }

  const targetPath = inputArgs.join(" ").replace(/^"|"$/g, "").trim();
  return await changeDirectory(targetPath);
}
