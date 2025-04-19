import fs from "fs";
export function init() {
  if (fs.existsSync("/run/secrets")) {
    const secrets = fs.readdirSync("/run/secrets");
    for (const secret of secrets) {
      const secretPath = `/run/secrets/${secret}`;
      process.env[secret.toUpperCase()] = fs
        .readFileSync(secretPath, "utf8")
        .trim();
    }
    return;
  }
  console.log("No secrets found in /run/secrets");
}
