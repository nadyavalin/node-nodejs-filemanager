import os from "os";

export async function homedir() {
  const homeDir = os.homedir();
  return {
    success: true,
    message: `Home directory: ${homeDir}`,
  };
}
