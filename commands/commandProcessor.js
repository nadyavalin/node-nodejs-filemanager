import { ERROR_MESSAGES } from "../constants/messages.js";

export function processCommand(input) {
  const [command] = input.trim().split(" ");

  if (!command) {
    return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
  }

  return { success: false, message: ERROR_MESSAGES.INVALID_INPUT };
}
