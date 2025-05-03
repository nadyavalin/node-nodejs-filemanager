import fs from "fs";
import { ERROR_MESSAGES } from "../../constants/messages.js";

export async function cat(inputArgs) {
  if (inputArgs.length !== 1) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const targetPath = inputArgs[0].replace(/^"|"$/g, "").trim();
  const absolutePath = targetPath;

  try {
    await new Promise((resolve, reject) => {
      fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const stats = await fs.promises.stat(absolutePath);
    if (!stats.isFile()) {
      return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
    }

    let content = "";
    const readStream = fs.createReadStream(absolutePath, { encoding: "utf8" });

    return new Promise((resolve) => {
      readStream.on("data", (chunk) => {
        content += chunk;
      });

      readStream.on("end", () => {
        resolve({ success: true, message: "", content: content });
      });

      readStream.on("error", () => {
        resolve({ success: false, message: ERROR_MESSAGES.OPERATION_FAILED });
      });
    });
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
