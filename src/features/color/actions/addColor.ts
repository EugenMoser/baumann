import {
  ColorDetailsFormSchema,
  ColorFormDataProps,
  ColorNotificationFormStates,
} from "@/features/color";
import createTimestamps from "@/lib/helpers/createTimestamps";
import { prisma } from "@/lib/prisma";

export async function addColorAction(
  previousState: ColorNotificationFormStates,
  formData: FormData,
): Promise<ColorNotificationFormStates> {
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
    // await prisma.color.create({
    //   data: {
    console.log({
      colorId,
      name: colorName,
      code: colorCode,
      colorSuffix,
      createdAt: timestamps.createdAtColor,
      updatedAt: timestamps.updatedAtColor,
    });

    return { message: "Farbe erfolgreich hinzugefügt", success: true };
  } catch (error: any) {
    console.error("Errors due to adding color details:", error);
    return {
      success: false,
      globalError: `Farbe konnte nicht gespeichert werden. Bitte versuche es erneut: ${error.message}`,
    };
  }
}
