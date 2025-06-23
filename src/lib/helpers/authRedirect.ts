import { auth } from "src/auth"; // Importiere die Authentifizierungs-Logik

export async function checkAndRedirect({ url }: { url: string }) {
  const session = await auth(); // Hole die Session

  if (session) {
    // Falls die Session existiert, leite weiter
    return { redirect: url as string };
  }

  return { redirect: null }; // Keine Weiterleitung nötig
}
