import { test, expect } from "@playwright/test";

test("przejście z aplikacji do strony logowania", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByText("Zaloguj").click();

  await expect(page).toHaveURL(/.*\/user\/signin/);
  await expect(page.locator("h1")).toContainText("Logowanie");
});
