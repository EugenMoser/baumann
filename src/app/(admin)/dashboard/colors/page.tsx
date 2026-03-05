import Link from "next/link";

import { getAllColors } from "@/features/color";

import ColorsManagementClient from "../../../../features/color/components/ColorsManagementClient";

/**
 * Dashboard page listing all colors with search, edit and delete options.
 */
export default async function ColorsManagementPage(): Promise<React.JSX.Element> {
  const colors = await getAllColors();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1>Farbverwaltung</h1>
        <div className="flex gap-3">
          <Link href="/dashboard" className="btn-secondary">
            ← Dashboard
          </Link>
          <Link href="/dashboard/colors/new" className="btn-create">
            + Neue Farbe
          </Link>
        </div>
      </div>

      <ColorsManagementClient colors={colors ?? []} />
    </div>
  );
}
