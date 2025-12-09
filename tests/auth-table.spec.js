import { test, expect } from "@playwright/test";

const TEST_EMAIL = "twoj_uzytkownik@test.pl";
const TEST_PASSWORD = "TwojeHaslo123!";

test("logowanie i dostęp do strony z tabelą", async ({ page }) => {
  await page.goto("http://localhost:3000/user/signin?returnUrl=/table");

  await page.getByLabel("Email").fill(TEST_EMAIL);
  await page.getByLabel("Hasło").fill(TEST_PASSWORD);

  await page.getByRole("button", { name: "Zaloguj" }).click();

  await expect(page).toHaveURL(/.*\/table/);

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Komponent tabeli (temat 3)"
  );

  await expect(page.getByText("Zapisz dane do bazy")).toBeVisible();
});
