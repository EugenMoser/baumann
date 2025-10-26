"use server";
import Link from "next/link";

import CustomButton from "@/components/shared/CustomButton";

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
      {/* <CustomButton
        type="button"
        buttonType="logout"
        title="Logout"
        className="rounded bg-red-500 p-2 text-white"
        ariaLabel="Logout"
      /> */}
    </>
  );
}
