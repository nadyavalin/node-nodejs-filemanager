import os from "os";

export async function username() {
  const systemUsername = os.userInfo().username;
  return {
    success: true,
    message: `System username: ${systemUsername}`,
  };
}
