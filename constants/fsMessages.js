export const MESSAGES = {
  WELCOME: (username) => `Welcome to the File Manager, ${username}!`,
  FAREWELL: (username) =>
    `Thank you for using File Manager, ${username}, goodbye!`,
  INPUT_ECHO: (input) => `Your input: ${input}`,
  CURRENT_DIR: (path) => `You are currently in ${path}`,
  COMMAND_PROMPT: "Type a command (or .exit to quit):",
  SUCCESS_CREATE_FILE: (filename) =>
    `File "${filename}" was created successfully`,
  SUCCESS_CREATE_DIR: (dirname) =>
    `Directory "${dirname}" was created successfully`,
  SUCCESS_RENAME_FILE: (newname) =>
    `File was renamed to "${newname}" successfully`,
  SUCCESS_COPY_FILE: (newname) => `File "${newname}" was copied successfully`,
  SUCCESS_MOVE_FILE: (filename, dirname) =>
    `File "${filename}" was moved to "${dirname}" successfully`,
  SUCCESS_DELETE: (path) => `File "${path}" was deleted successfully`,
  SUCCESS_COMPRESS: (filename, compressedPath) =>
    `File "${filename}" was compressed to ${compressedPath} successfully`,
  SUCCESS_DECOMPRESS: (filename, destinationPath) =>
    `File "${filename}" was decompressed to ${destinationPath} successfully`,
};

export const ERROR_MESSAGES = {
  NO_USERNAME: "Error: --username argument was not specified",
  INVALID_INPUT: "Invalid input",
  OPERATION_FAILED: "Operation failed",
  CD_NO_PATH: "Error: Path argument is required for cd command",
  NO_SPACES_IN_FILE: `File name cannot contain spaces`,
  NO_SPACES_IN_DIR: `Directory name cannot contain spaces`,
  NO_SPACES_IN_NEW_FILE: `New file name cannot contain spaces`,
  EXISTS_FILE: (filename) =>
    `File with name "${filename}" already exists`,
  EXISTS_FILE_IN_DIR: (filename, dirname) =>
    `File with name "${filename}" already exists in the directory "${dirname}"`,
  EXISTS_DIR: (dirname) => `Directory with name "${dirname}" already exists`,
  EXISTS_NEW_NAME_FILE: (newname) =>
    `File with name "${newname}" already exists`,
  CORRECT_TYPE: "Path must be a file, not a directory",
  NOT_EXISTS_SOURCE_FILE: (filename) =>
    `Source file "${filename}" does not exist`,
  NOT_EXISTS_FILE: (filename) => `File "${filename}" does not exist`,
  NOT_DIR: "Destination must be a directory",
  NOT_EXISTS_SOURCE_DIR: "Destination directory does not exist",
  FAILED_READ_SOURCE_FILE: "Failed to read source file",
  FAILED_WRITE_DEST_FILE: "Failed to write to destination file",
  NO_FILE_TO_HASH: "Invalid input. Usage: hash path_to_file",
  FAILED_CALC_HASH: (error) => `Failed to calculate hash: ${error.message}`,
  NO_COMPRESS_ARGS:
    "Invalid input. Usage: compress source_path destination_path",
  FAILED_COMPRESS: (error) => `Failed to compress file: ${error.message}`,
  NO_DECOMPRESS_ARGS:
    "Invalid input. Usage: decompress source_path destination_path",
  FAILED_DECOMPRESS: (error) => `Failed to decompress file: ${error.message}`,
  NOT_BR: "Invalid file extension. Expected .br file for decompression.",
  NOT_HEADER_BR: "Invalid compressed file format: header not found",
};
