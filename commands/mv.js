import fs from "fs";
import path from "path";
import { ERROR_MESSAGES, MESSAGES } from "../constants/messages.js";

export async function mv(inputArgs) {
  if (inputArgs.length !== 2) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  const sourcePath = inputArgs[0].replace(/^"|"$/g, "").trim();
  const destDirPath = inputArgs[1].replace(/^"|"$/g, "").trim();

  const absoluteSourcePath = path.resolve(process.cwd(), sourcePath);
  const absoluteDestDirPath = path.resolve(process.cwd(), destDirPath);

  try {
    try {
      const sourceStats = await fs.promises.stat(absoluteSourcePath);
      if (!sourceStats.isFile()) {
        return {
          success: false,
          message: ERROR_MESSAGES.CORRECT_TYPE,
        };
      }
    } catch {
      return {
        success: false,
        message: ERROR_MESSAGES.NOT_EXISTS_SOURCE_FILE(
          path.basename(absoluteSourcePath)
        ),
      };
    }

    try {
      const destStats = await fs.promises.stat(absoluteDestDirPath);
      if (!destStats.isDirectory()) {
        return {
          success: false,
          message: ERROR_MESSAGES.NOT_DIR,
        };
      }
    } catch {
      return {
        success: false,
        message: ERROR_MESSAGES.NOT_EXISTS_SOURCE_DIR,
      };
    }

    const fileName = path.basename(absoluteSourcePath);
    const destPath = path.join(absoluteDestDirPath, fileName);
    const dirName = path.basename(absoluteDestDirPath);

    try {
      await fs.promises.access(destPath);
      return {
        success: false,
        message: ERROR_MESSAGES.EXISTS_COPY_FILE(fileName, dirName),
      };
    } catch {}

    const readStream = fs.createReadStream(absoluteSourcePath);
    const writeStream = fs.createWriteStream(destPath);

    return new Promise((resolve) => {
      readStream.on("error", () => {
        writeStream.end();
        fs.promises.unlink(destPath).catch(() => {});
        resolve({
          success: false,
          message: ERROR_MESSAGES.FAILED_READ_SOURCE_FILE,
        });
      });

      writeStream.on("finish", () => {
        fs.promises
          .unlink(absoluteSourcePath)
          .then(() => {
            resolve({
              success: true,
              message: MESSAGES.SUCCESS_MOVE_FILE(fileName, dirName),
            });
          })
          .catch(() => {
            resolve({
              success: false,
              message: ERROR_MESSAGES.OPERATION_FAILED,
            });
          });
      });

      writeStream.on("error", () => {
        readStream.destroy();
        fs.promises.unlink(destPath).catch(() => {});
        resolve({
          success: false,
          message: ERROR_MESSAGES.FAILED_WRITE_DEST_FILE,
        });
      });

      readStream.pipe(writeStream);
    });
  } catch (error) {
    return { success: false, message: ERROR_MESSAGES.OPERATION_FAILED };
  }
}
