import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6">Willkommen im Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Management */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4">Verwaltung</h2>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard/products" className="btn">
              Produkte verwalten
            </Link>
            <Link href="/dashboard/colors" className="btn">
              Farben verwalten
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
