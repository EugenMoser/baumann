import { auth } from "src/auth";

export async function checkSessionAndRedirect({ url }: { url: string }) {
  const session = await auth(); // Get the current session

  if (session) {
    // If session exists, redirect
    return { redirect: url as string };
  }

  return { redirect: null }; // No redirect needed
}
