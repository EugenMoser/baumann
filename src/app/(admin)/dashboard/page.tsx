import Link from "next/link";

export default async function DashboardPage() {
  return (
    <>
      <h1>Willkommen im Dashboard</h1>
      <div className="mt-4 flex flex-col gap-4">
        <h2>Wählen Sie eine Aktion aus:</h2>
        <Link href="/dashboard/addProduct">Produkt hinzufügen</Link>
        <Link href="/dashboard/addArticle">Artikel hinzufügen</Link>
        <Link href="/dashboard/addColor">Farbe hinzufügen</Link>
      </div>
    </>
  );
}
