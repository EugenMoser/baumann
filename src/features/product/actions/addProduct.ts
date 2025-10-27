import { requireAuth } from "@/lib/helpers/requireAuth";
  // Require authentication
  try {
    await requireAuth();
  } catch (error) {
    return {
      success: false,
      globalError: "Nicht autorisiert. Bitte melden Sie sich an.",
    };
  }
