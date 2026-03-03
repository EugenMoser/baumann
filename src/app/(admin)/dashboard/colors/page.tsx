import Link from "next/link";

import { getAllColors } from "@/features/color";

import ColorsManagementClient from "./ColorsManagementClient";

/**
 * Dashboard page listing all colors with search, edit and delete options.
 */
export default async function ColorsManagementPage(): Promise<React.JSX.Element> {
  const colors = await getAllColors();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Farbverwaltung</h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            ← Dashboard
          </Link>
          <Link
            href="/dashboard/colors/new"
            className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            + Neue Farbe
          </Link>
        </div>
      </div>

      <ColorsManagementClient colors={colors ?? []} />
    </div>
  );
}
