import { redirect } from "next/navigation";
import { auth } from "src/auth";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return <main className="p-4">{children}</main>;
}

export default DashboardLayout;
