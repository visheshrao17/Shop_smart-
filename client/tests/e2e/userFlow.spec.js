import { test, expect } from '@playwright/test';

test('user can navigate to collection page', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check if the Navbar rendered by looking for the "HOME" link
  await expect(page.locator("p:has-text('HOME')").first()).toBeVisible();

  // Check if the Hero section or Latest Collections is visible
  await expect(page.locator("text=LATEST").first()).toBeVisible();

  // Navigate to Collection page
  await page.click("p:has-text('COLLECTION')");

  // Verify the URL has changed
  await expect(page).toHaveURL(/.*collection/);

  // Verify that the collection page title is visible
  await expect(page.locator("text=ALL").first()).toBeVisible();
});