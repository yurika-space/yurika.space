import type { Page } from "@playwright/test"
import { expect } from "@playwright/test"
import type { RegisteredUser } from "./fixtures"

const AUTH_STORAGE_KEY = "yurika-auth"

export async function seedAuthSession(page: Page, session: RegisteredUser) {
  await page.addInitScript(
    ({ key, access, refresh, user }) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          state: {
            accessToken: access,
            refreshToken: refresh,
            user,
          },
          version: 0,
        })
      )
    },
    {
      key: AUTH_STORAGE_KEY,
      access: session.access,
      refresh: session.refresh,
      user: session.user,
    }
  )
}

/** Wait until seeded session is active in the app shell. */
export async function waitForSessionUI(page: Page) {
  await page.waitForFunction(() => {
    const raw = localStorage.getItem("yurika-auth")
    if (!raw) return false
    try {
      const parsed = JSON.parse(raw)
      return Boolean(parsed?.state?.accessToken)
    } catch {
      return false
    }
  })
  await expect(page.getByRole("button", { name: /SIGN OUT/i }).first()).toBeVisible({ timeout: 15_000 })
}
