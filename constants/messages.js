export const MESSAGES = {
  WELCOME: (userName) => `Welcome to the File Manager, ${userName}!`,
  FAREWELL: (username) =>
    `Thank you for using File Manager, ${username}, goodbye!`,
  INPUT_ECHO: (input) => `Your input: ${input}`,
  CURRENT_DIR: (path) => `You are currently in ${path}`,
};

export const ERROR_MESSAGES = {
  NO_USERNAME: "Error: --username argument was not specified",
};
