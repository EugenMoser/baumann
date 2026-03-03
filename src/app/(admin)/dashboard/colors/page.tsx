import Link from "next/link";

import {
  DeleteColorButton,
  EditColorForm,
  getAllColors,
} from "@/features/color";

/**
 * Dashboard page listing all colors with edit and delete options.
 */
export default async function ColorsManagementPage(): Promise<React.JSX.Element> {
  const colors = await getAllColors();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Farbverwaltung</h1>
        <Link
          href="/dashboard/colors/new"
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          + Neue Farbe
        </Link>
      </div>

      {!colors || colors.length === 0 ? (
        <p className="text-muted-foreground">Keine Farben vorhanden.</p>
      ) : (
        <div className="space-y-4">
          {colors.map((color) => (
            <div
              key={color.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-10 w-10 rounded-full border"
                  style={{ backgroundColor: color.code }}
                  title={color.code}
                />
                <div>
                  <p className="font-medium">
                    {color.name}{" "}
                    <span className="text-muted-foreground text-sm">
                      (ID: {color.colorId})
                    </span>
                  </p>
                  <p className="text-muted-foreground text-sm">{color.code}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <EditColorForm color={color} />
                <DeleteColorButton
                  colorId={color.colorId}
                  colorName={color.name}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
