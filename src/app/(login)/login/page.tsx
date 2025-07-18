import { redirect } from "next/navigation";
import { auth } from "src/auth";

import CustomButton from "@/components/CustomButton";
import LoginForm from "@/components/Login/LoginForm";
import { checkAndRedirect } from "@/lib/helpers/authRedirect";

export default async function LoginPage() {
  const { redirect: redirectUrl } = await checkAndRedirect({
    url: "/dashboard",
  });

  if (redirectUrl) {
    redirect(redirectUrl); // Weiterleitung zu /dashboard
  }

  // style https://blocks.so/login
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border p-5">
      <h2 className="mb-4 text-xl font-bold">Login</h2>
      <LoginForm />
      {/* <CustomButton type="button" buttonType="goResetPassword" /> */}

      <CustomButton
        type="button"
        buttonType="redirect"
        redirectUrl="//password-request"
        title="Passwort zurücksetzen"
      />
    </div>
  );
}
