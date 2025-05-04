import fs from "fs";
import path from "path";
import zlib from "zlib";
import { pipeline } from "stream";
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
  const { name, ext } = path.parse(sourcePath);
  if (ext !== ".br") {
    return {
      success: false,
      message: ERROR_MESSAGES.NOT_BR,
    };
  }

  return new Promise((resolve) => {
    const readStream = fs.createReadStream(absoluteSourcePath);
    const decompress = zlib.createBrotliDecompress();
    let headerLength = 0;
    let headerData = Buffer.alloc(0);
    let headerProcessed = false;
    let dataBuffer = Buffer.alloc(0);

    readStream.on("data", (chunk) => {
      if (headerProcessed) {
        dataBuffer = Buffer.concat([dataBuffer, chunk]);
        return;
      }

      headerData = Buffer.concat([headerData, chunk]);

      if (headerLength === 0 && headerData.length >= 1) {
        headerLength = headerData[0];
      }

      if (headerLength > 0 && headerData.length >= headerLength + 1) {
        const header = headerData.slice(1, headerLength + 1).toString();
        const [length, extension] = header.split(":");
        if (!header.includes(":") || parseInt(length) !== extension.length) {
          resolve({
            success: false,
            message: ERROR_MESSAGES.NOT_HEADER_BR,
          });
          readStream.destroy();
          return;
        }

        const decompressedFileName = `${name}${extension}`;
        const absoluteDestPath = path.join(
          absoluteDestDir,
          decompressedFileName
        );
        const writeStream = fs.createWriteStream(absoluteDestPath);

        const remainingData = headerData.slice(headerLength + 1);
        if (remainingData.length > 0) {
          dataBuffer = Buffer.concat([dataBuffer, remainingData]);
        }

        const remainingStream = fs.createReadStream(absoluteSourcePath, {
          start: headerLength + 1,
        });

        pipeline(remainingStream, decompress, writeStream, (err) => {
          if (err) {
            resolve({
              success: false,
              message: ERROR_MESSAGES.FAILED_DECOMPRESS(err),
            });
          } else {
            resolve({
              success: true,
              message: `File ${sourcePath} decompressed to ${destDir}/${decompressedFileName}`,
            });
          }
        });

        headerProcessed = true;
      }
    });

    readStream.on("error", (error) => {
      resolve({
        success: false,
        message: ERROR_MESSAGES.FAILED_DECOMPRESS(error),
      });
    });

    readStream.on("end", () => {
      if (!headerProcessed) {
        resolve({
          success: false,
          message: ERROR_MESSAGES.NOT_HEADER_BR,
        });
      }
    });
  });
}
