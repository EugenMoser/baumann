import { redirect } from "next/navigation";
import { auth } from "src/auth";

import CustomButton from "@/components/CustomButton";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  // const session = await auth();

  // if (session) {
  //   return redirect("/dashboard");
  // }

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border p-5">
      <h2 className="mb-4 text-xl font-bold">Login</h2>
      <LoginForm />
      <CustomButton type="button" buttonType="goResetPassword" />
    </div>
  );
}
