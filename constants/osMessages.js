export const MESSAGES = {
  EOL_DISPLAY: (eol) => `Default system End-Of-Line (EOL): ${eol}`,
  CPU_INFO: (count, info) => `Total CPUs: ${count}\n${info}`,
  HOME_DIR: (dir) => `Home directory: ${dir}`,
  USER_NAME: (name) => `System username: ${name}`,
  CPU_ARCH: (arch) => `CPU architecture: ${arch}`,
};
