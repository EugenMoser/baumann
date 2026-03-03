import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Willkommen im Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Management */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Verwaltung</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/products"
              className="rounded-md bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700"
            >
              Produkte verwalten
            </Link>
            <Link
              href="/dashboard/colors"
              className="rounded-md bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700"
            >
              Farben verwalten
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
