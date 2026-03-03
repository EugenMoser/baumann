"use server";

import { revalidatePath } from "next/cache";

import {
  ColorDetailsFormSchema,
  ColorFormDataProps,
  ColorNotificationFormStates,
} from "@/features/color";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

/**
 * Server Action to update an existing color.
 * Validates form data and updates the color in the database.
 */
export async function updateColor(
  colorMongoId: string,
  _previousState: ColorNotificationFormStates,
  formData: FormData,
): Promise<ColorNotificationFormStates> {
  try {
    await requireAuth();
  } catch {
    return {
      success: false,
      globalError: "Nicht autorisiert. Bitte melden Sie sich an.",
    };
  }

  const colorFormData: ColorFormDataProps = {
    colorId: formData.get("colorId") as string,
    colorName: formData.get("name") as string,
    colorCode: formData.get("code") as string,
    colorSuffix: Number(formData.get("colorSuffix")),
  };

  const validated = ColorDetailsFormSchema.safeParse(colorFormData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      globalError: "Validierung fehlgeschlagen.",
    };
  }

  const { colorId, colorName, colorCode } = validated.data;

  try {
    await prisma.color.update({
      where: { id: colorMongoId },
      data: {
        colorId,
        name: colorName,
        code: colorCode,
      },
    });

    revalidatePath("/dashboard");

    return { message: "Farbe erfolgreich aktualisiert.", success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return {
      success: false,
      globalError: `Farbe konnte nicht aktualisiert werden: ${message}`,
    };
  }
}
