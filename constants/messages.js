export const MESSAGES = {
  WELCOME: (username) => `Welcome to the File Manager, ${username}!`,
  FAREWELL: (username) =>
    `Thank you for using File Manager, ${username}, goodbye!`,
  INPUT_ECHO: (input) => `Your input: ${input}`,
  CURRENT_DIR: (path) => `You are currently in ${path}`,
  COMMAND_PROMPT: "Type a command (or .exit to quit):",
  SUCCESS_CREATE_FILE: (filename) => `File "${filename}" created successfully`,
  SUCCESS_CREATE_DIR: (dirname) =>
    `Directory "${dirname}" created successfully`,
  SUCCESS_RENAME_FILE: (newname) => `File renamed to "${newname}" successfully`,
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
};
