export const MESSAGES = {
  WELCOME: (username) => `Welcome to the File Manager, ${username}!`,
  FAREWELL: (username) =>
    `Thank you for using File Manager, ${username}, goodbye!`,
  INPUT_ECHO: (input) => `Your input: ${input}`,
  CURRENT_DIR: (path) => `You are currently in ${path}`,
  COMMAND_PROMPT: "Type a command (or .exit to quit):",
  SUCCESS_CREATE: (type, filename) => `${type} "${filename}" created successfully`,
};

export const ERROR_MESSAGES = {
  NO_USERNAME: "Error: --username argument was not specified",
  INVALID_INPUT: "Invalid input",
  OPERATION_FAILED: "Operation failed",
  CD_NO_PATH: "Error: Path argument is required for cd command",
  NO_SPACES: (type) => `${type} name cannot contain spaces`,
  EXISTS: (type) => `${type} already exists`,
};
