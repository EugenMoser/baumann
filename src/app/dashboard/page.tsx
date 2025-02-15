import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  return (
    <>
      <h1>Willkommen</h1>
      <a href="/dashboard/addProduct">Produkt hinzufügen</a>

      <LogoutButton />
    </>
  );
}
