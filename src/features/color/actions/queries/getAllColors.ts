import { prisma } from "@/lib/prisma";
import { Color } from "@prisma/client";

// ********************* get color *********************

export async function getAllColors() {
  let color: Color[] | null = null;
  try {
    color = await prisma.color.findMany();
    return color;
  } catch (error) {
    console.error("Keine Farben gefunden:", error);
    return null;
  }
}
