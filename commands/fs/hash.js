import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ERROR_MESSAGES } from "../../constants/fsMessages.js";

export async function hash(args) {
  if (args.length !== 1) {
    return {
      success: false,
      message: ERROR_MESSAGES.NO_FILE_TO_HASH,
    };
  }

  const filePath = args[0].replace(/^"|"$/g, "").trim();
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileName = path.basename(filePath);

  try {
    const data = await fs.readFile(absolutePath);
    const hash = crypto.createHash("md5").update(data).digest("hex");
    return { success: true, message: `MD5 hash for ${fileName}: ${hash}` };
  } catch (error) {
    return {
      success: false,
      message: ERROR_MESSAGES.FAILED_CALC_HASH(error),
    };
  }
}
