"use server";

import { log } from "console";
import { revalidatePath } from "next/cache";

import {
  ColorDetailsFormSchema,
  ColorFormDataProps,
  ColorNotificationFormStates,
} from "@/features/color";
import createTimestamps from "@/lib/helpers/createTimestamps";
import { requireAuth } from "@/lib/helpers/requireAuth";
import { prisma } from "@/lib/prisma";

export async function addColor(
  _previousState: ColorNotificationFormStates,
  formData: FormData,
): Promise<ColorNotificationFormStates> {
  // Require authentication
  try {
    await requireAuth();
  } catch (error) {
    return {
      success: false,
      globalError: "Nicht autorisiert. Bitte melden Sie sich an.",
    };
  }

  const timestamps = createTimestamps("Color");

  // *------get form data
  const colorFormData: ColorFormDataProps = {
    colorId: formData.get("colorId") as string,
    colorName: formData.get("name") as string,
    colorCode: formData.get("code") as string,
    colorSuffix: Number(formData.get("colorSuffix")),
  };

  // *----- validated color fields
  const validatedColorFields = ColorDetailsFormSchema.safeParse({
    ...colorFormData,
  });
  log("----->>>>> validatedColorFields", validatedColorFields);
  const colorErrors = !validatedColorFields.success && {
    ...validatedColorFields.error.flatten().fieldErrors,
  };

  // *------return errors if validation fails
  if (colorErrors) {
    return {
      success: false,
      errors: colorErrors || {},
      globalError: "Farbe konnte nicht hinzugefügt werden.",
    };
  }
  const { colorId, colorName, colorCode, colorSuffix } =
    validatedColorFields.data!;

  // *------add color to database
  try {
    const createdColor = await prisma.color.create({
      data: {
        colorId,
        name: colorName,
        code: colorCode,
        createdAt: timestamps.createdAtColor,
        updatedAt: timestamps.updatedAtColor,
      },
    });

    revalidatePath("/dashboard");
    return {
      message: "Farbe erfolgreich hinzugefügt",
      success: true,
      createdColor,
    };
  } catch (error: any) {
    console.error("Errors due to adding color details:", error);
    return {
      success: false,
      globalError: `Farbe konnte nicht gespeichert werden. Bitte versuche es erneut: ${error.message}`,
    };
  }
}
