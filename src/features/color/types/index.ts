import { z } from "zod";

import { ColorDetailsFormSchema } from "@/features/color";
import { NotificationFormStates } from "@/features/product/types/globalTypes";
import { Color } from "@prisma/client";

export type ColorProps = Color & { colorSuffix?: number };

export type ColorFormDataProps = z.infer<typeof ColorDetailsFormSchema>;

export type ColorFormFieldErrors = {
  colorId?: string[];
  colorName?: string[];
  colorCode?: string[];
  colorSuffix?: string[];
};

export type ColorNotificationFormStates = NotificationFormStates & {
  errors?: ColorFormFieldErrors; // field specific errors
  createdColor?: Color; // returned after successful creation
};
