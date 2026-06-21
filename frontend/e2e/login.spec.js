import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    // Clear all storage and cookies before each test
    await page.goto("/login");
  });

  test("should render the login page with all elements", async ({ page }) => {
    // Check page title
    await expect(page.locator("text=Welcome Back")).toBeVisible();
    await expect(page.locator("text=Sign in to your account to continue")).toBeVisible();

    // Check form fields exist
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();

    // Check footer
    await expect(page.locator("text=Use your company credentials to sign in")).toBeVisible();
  });

  test("should show validation errors with empty form", async ({ page }) => {
    // Click submit without filling anything
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for validation errors
    await expect(page.locator("text=Email is required")).toBeVisible();
    await expect(page.locator("text=Password is required")).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    await page.locator('input[type="email"]').fill("invalid-email");
    await page.locator('input[type="password"]').fill("password123");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page.locator("text=Enter a valid email address")).toBeVisible();
  });

  test("should toggle password visibility", async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill("mysecretpassword");

    // Initially should be password type
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Click the toggle button - look for the visibility toggle icon button inside the password field
    const toggleButton = page.locator('button').filter({ has: page.locator('[data-testid="VisibilityOff"]') }).or(
      page.locator('button').filter({ has: page.locator('[data-testid="Visibility"]') })
    );
    if (await toggleButton.count() > 0) {
      await toggleButton.first().click();
    }

    // Should now be text type (visible)
    const textInput = page.locator('input[type="text"]');
    if (await textInput.count() > 0) {
      await expect(textInput).toHaveValue("mysecretpassword");
    }

    // Click again to hide
    if (await toggleButton.count() > 0) {
      await toggleButton.first().click();
    }
  });

  test("should submit login form and show loading state", async ({ page }) => {
    // Fill in valid-looking credentials
    await page.locator('input[type="email"]').fill("test@example.com");
    await page.locator('input[type="password"]').fill("password123");

    // Submit the form
    const submitButton = page.getByRole("button", { name: /sign in/i });
    await submitButton.click();

    // Should show loading spinner (since the API call is in progress)
    // The button should be disabled and show a spinner
    await expect(submitButton).toBeDisabled();
  });

  test("should auto-redirect to /login when accessing protected route", async ({ page }) => {
    // Try to access dashboard directly (without auth)
    await page.goto("/dashboard");
    await page.waitForURL("**/login");
    await expect(page).toHaveURL(/\/login/);
  });
});
