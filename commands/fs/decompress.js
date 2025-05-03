import fs from "fs";
import path from "path";
import zlib from "zlib";
import { ERROR_MESSAGES } from "../../constants/fsMessages.js";

export async function decompress(args) {
  if (args.length !== 2) {
    return {
      success: false,
      message: ERROR_MESSAGES.NO_DECOMPRESS_ARGS,
    };
  }

  const [sourcePath, destDir] = args.map((arg) =>
    arg.replace(/^"|"$/g, "").trim()
  );
  const absoluteSourcePath = path.resolve(process.cwd(), sourcePath);
  const absoluteDestDir = path.resolve(process.cwd(), destDir);

  const sourceFileName = path.basename(sourcePath);
  if (!sourceFileName.endsWith(".br")) {
    return {
      success: false,
      message: ERROR_MESSAGES.NOT_BR,
    };
  }
  const decompressedFileName = sourceFileName.slice(0, -3);
  const absoluteDestPath = path.join(absoluteDestDir, decompressedFileName);

  return new Promise((resolve) => {
    const readStream = fs.createReadStream(absoluteSourcePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const decompress = zlib.createBrotliDecompress();

    readStream.pipe(decompress).pipe(writeStream);

    writeStream.on("finish", () => {
      resolve({
        success: true,
        message: `File ${sourcePath} decompressed to ${destDir}/${decompressedFileName}`,
      });
    });

    writeStream.on("error", (error) => {
      resolve({
        success: false,
        message: ERROR_MESSAGES.FAILED_DECOMPRESS(error),
      });
    });

    readStream.on("error", (error) => {
      resolve({
        success: false,
        message: ERROR_MESSAGES.FAILED_DECOMPRESS(error),
      });
    });

    decompress.on("error", (error) => {
      resolve({
        success: false,
        message: ERROR_MESSAGES.FAILED_DECOMPRESS(error),
      });
    });
  });
}
