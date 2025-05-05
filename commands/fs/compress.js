import fs from "fs";
import path from "path";
import zlib from "zlib";
import { Readable } from "stream";
import { MESSAGES, ERROR_MESSAGES } from "../../constants/fsMessages.js";

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

  const { name, ext } = path.parse(sourcePath);
  const compressedFileName = `${name}.br`;
  const absoluteDestPath = path.join(absoluteDestDir, compressedFileName);

  try {
    await fs.promises.access(absoluteDestPath);
    return {
      success: false,
      message: ERROR_MESSAGES.EXISTS_FILE_IN_DIR(
        compressedFileName,
        path.basename(absoluteDestDir)
      ),
    };
  } catch {

  }

  const extension = ext || "";
  const header = Buffer.from(`${extension.length}:${extension}`);
  const headerLength = Buffer.from([header.length]);

  return new Promise((resolve) => {
    const readStream = fs.createReadStream(absoluteSourcePath);
    const writeStream = fs.createWriteStream(absoluteDestPath);
    const compress = zlib.createBrotliCompress();
    const headerStream = Readable.from([headerLength, header]);

    headerStream.pipe(writeStream, { end: false });

    headerStream.on("end", () => {
      readStream.pipe(compress).pipe(writeStream);
    });

    writeStream.on("finish", () => {
      resolve({
        success: true,
        message: MESSAGES.SUCCESS_COMPRESS(name + ext, absoluteDestPath),
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
