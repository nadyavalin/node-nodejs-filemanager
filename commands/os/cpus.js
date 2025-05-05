import os from "os";
import { MHZ_TO_GHZ } from "../../constants/constants.js";
import { MESSAGES } from "../../constants/osMessages.js";

export async function cpus() {
  const cpuList = os.cpus();
  const cpuCount = cpuList.length;
  const cpuInfo = cpuList
    .map((cpu, index) => {
      const model = cpu.model.trim();
      const clockSpeedGHz = (cpu.speed / MHZ_TO_GHZ).toFixed(2);
      return `${index + 1}. Model: ${model}, Clock Speed: ${clockSpeedGHz} GHz`;
    })
    .join("\n");

  return {
    success: true,
    message: MESSAGES.CPU_INFO(cpuCount, cpuInfo),
  };
}
