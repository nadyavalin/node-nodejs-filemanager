import fs from "fs";
import path from "path";
import zlib from "zlib";
import { ERROR_MESSAGES } from "../../constants/fsMessages.js";

export async function compress(args) {
  if (args.length !== 2) {
    return {
      success: false,
      message: ERROR_MESSAGES.NO_COMPRESS_ARGS,
    };
  }

  const [sourcePath, destDir] = args.map((arg) =>
    arg.replace(/^"|"$/g, "").trim()
  );
  const absoluteSourcePath = path.resolve(process.cwd(), sourcePath);
  const absoluteDestDir = path.resolve(process.cwd(), destDir);
  const sourceFileName = path.basename(sourcePath);
  const compressedFileName = `${sourceFileName}.br`;
  const absoluteDestPath = path.join(absoluteDestDir, compressedFileName);

  return new Promise((resolve) => {
    const readStream = fs.createReadStream(absoluteSourcePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const compress = zlib.createBrotliCompress();

    readStream.pipe(compress).pipe(writeStream);

    writeStream.on("finish", () => {
      resolve({
        success: true,
        message: `File ${sourcePath} compressed to ${destDir}/${compressedFileName}`,
      });
    });

    writeStream.on("error", (error) => {
      resolve({
        success: false,
        message: ERROR_MESSAGES.FAILED_COMPRESS(error),
      });
    });

    readStream.on("error", (error) => {
      resolve({
        success: false,
        message: ERROR_MESSAGES.FAILED_COMPRESS(error),
      });
    });
  });
}
