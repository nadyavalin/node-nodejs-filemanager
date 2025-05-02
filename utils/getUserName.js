import { ERROR_MESSAGES } from "./messages.js";

export function getUserName() {
  const args = process.argv.slice(2);
  const userNameArg = args.find((arg) => arg.startsWith("--username="));

  if (!userNameArg) {
    console.error(ERROR_MESSAGES.NO_USERNAME);
    process.exit(1);
  }
  return userNameArg.split("=")[1];
}
