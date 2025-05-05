import { MESSAGES } from "../../constants/osMessages.js";

export async function architecture() {
  const arch = process.arch;
  return {
    success: true,
    message: MESSAGES.CPU_ARCH(arch),
  };
}
