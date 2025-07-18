"use server";
import Link from "next/link";

import CustomButton from "@/components/CustomButton";

export default async function DashboardPage() {
  return (
    <>
      <h1>Willkommen im Dashboard</h1>
      <Link href="/dashboard/addProduct">Produkt hinzufügen</Link>

      {/* <CustomButton type="button" buttonType="logout" /> */}
      <CustomButton
        type="button"
        buttonType="logout"
        title="Logout"
        className="rounded bg-red-500 p-2 text-white"
      />
    </>
  );
}
