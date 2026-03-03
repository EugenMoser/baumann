import { auth } from "src/auth";

// Validates that the user is authenticated.
export async function requireAuth() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error();
  }

  return session;
}
