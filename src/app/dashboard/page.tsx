import CustomButton from "@/components/CustomButton";

export default async function DashboardPage() {
  return (
    <>
      <h1>Willkommen</h1>
      <a href="/dashboard/addProduct">Produkt hinzufügen</a>

      <CustomButton type="button" buttonType="logout" />
    </>
  );
}
