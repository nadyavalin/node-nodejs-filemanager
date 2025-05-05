import os from "os";
import { MESSAGES } from "../../constants/osMessages.js";

export async function username() {
  const systemUsername = os.userInfo().username;
  return {
    success: true,
    message: MESSAGES.USER_NAME(systemUsername),
  };
}
