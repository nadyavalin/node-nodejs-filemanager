import os from "os";
import { MESSAGES } from "../../constants/osMessages.js";

export async function eol() {
  const eol = os.EOL;
  const eolDisplay = eol === "\r\n" ? "\\r\\n (CRLF)" : "\\n (LF)";
  return {
    success: true,
    message: MESSAGES.EOL_DISPLAY(eolDisplay),
  };
}
