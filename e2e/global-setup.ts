import { execSync } from "node:child_process"
import path from "node:path"

const root = path.resolve(__dirname, "..")
const monorepoFrontend = path.resolve(root, "../yurika/frontend")

function run(cmd: string, cwd: string) {
  console.log(`[setup] ${cmd} (cwd: ${cwd})`)
  execSync(cmd, { cwd, stdio: "inherit", env: process.env })
}

export default async function globalSetup() {
  if (process.env.PLAYWRIGHT_SKIP_BUILD === "1") {
    console.log("[setup] PLAYWRIGHT_SKIP_BUILD=1 — skipping build steps")
    return
  }
  // Checklist item: pnpm build green in both repos
  run("pnpm build", root)
  run("pnpm build", monorepoFrontend)
}
