import os from "os";
import { MESSAGES } from "../../constants/osMessages.js";

export async function homedir() {
  const homeDir = os.homedir();
  return {
    success: true,
    message: MESSAGES.HOME_DIR(homeDir),
  };
}
