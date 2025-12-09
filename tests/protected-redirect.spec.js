import { test, expect } from "@playwright/test";

test("niezalogowany użytkownik jest przekierowywany z /table do logowania", async ({ page }) => {
  await page.goto("http://localhost:3000/table");

  await expect(page).toHaveURL(/.*\/user\/signin\?returnUrl=%2Ftable/);

  await expect(page.locator("h1")).toContainText("Logowanie");
});
