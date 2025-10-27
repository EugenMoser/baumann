import { auth } from "src/auth";

/**
 * Validates that the user is authenticated and returns the session.
 * Throws an error if the user is not authenticated.
 *
 * Use this function at the start of Server Actions that require authentication.
 *
 * @throws {Error} If user is not authenticated
 * @returns {Promise<Session>} The authenticated session
 *
 * @example
 * ```ts
 * export async function addProductAction(formData: FormData) {
 *   await requireAuth(); // Protect this action
 *   // ... rest of the action
 * }
 * ```
 */
export async function requireAuth() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized: Sie müssen angemeldet sein.");
  }

  return session;
}
