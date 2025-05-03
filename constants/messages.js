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
};

export const ERROR_MESSAGES = {
  NO_USERNAME: "Error: --username argument was not specified",
  INVALID_INPUT: "Invalid input",
  OPERATION_FAILED: "Operation failed",
  CD_NO_PATH: "Error: Path argument is required for cd command",
  NO_SPACES_IN_FILE: `File name cannot contain spaces`,
  NO_SPACES_IN_DIR: `Directory name cannot contain spaces`,
  NO_SPACES_IN_NEW_FILE: `New file name cannot contain spaces`,
  EXISTS_FILE: (filename) => `File with name "${filename}" already exists`,
  EXISTS_DIR: (dirname) => `Directory with name "${dirname}" already exists`,
  EXISTS_NEW_NAME_FILE: (newname) =>
    `File with name "${newname}" already exists`,
  CORRECT_TYPE: "Path must be a file, not a directory",
  EXISTS_COPY_FILE: (filename, dirname) =>
    `File with name "${filename}" already exists in the directory "${dirname}"`,
  NOT_EXISTS_SOURCE_FILE: "Source file does not exist",
  NOT_DIR: "Destination must be a directory",
  NOT_EXISTS_SOURCE_DIR: "Destination directory does not exist",
  FAILED_READ_SOURCE_FILE: "Failed to read source file",
  FAILED_WRITE_DEST_FILE: "Failed to write to destination file",
};
