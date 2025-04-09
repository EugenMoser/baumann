import { redirect } from "next/navigation";
import { auth } from "src/auth";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return <div className="p-4">{children}</div>;
}

export default DashboardLayout;
