import os from "os";

export async function eol() {
  const eol = os.EOL;
  const eolDisplay = eol === "\r\n" ? "\\r\\n (CRLF)" : "\\n (LF)";
  return {
    success: true,
    message: `Default system End-Of-Line (EOL): ${eolDisplay}`,
  };
}
