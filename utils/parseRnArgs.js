export function parseRnArgs(input) {
  const args = [];
  let firstArg = "";
  let secondArg = "";
  let foundSpace = false;
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === " " && !inQuotes && !foundSpace) {
      foundSpace = true;
      continue;
    }

    if (!foundSpace) {
      firstArg += char;
    } else {
      secondArg += char;
    }
  }

  if (firstArg) args.push(firstArg.trim());
  if (secondArg) args.push(secondArg.trim());

  return args;
}
