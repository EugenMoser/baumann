"use client";

import { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SubmitButton } from "@/components/shared/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/actions/login";
import { LoginFormSchema } from "@/features/auth/schemas/loginFormSchema";

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export function LoginForm(): React.JSX.Element {
  const router = useRouter();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");
  const [actionExecuted, setActionExecuted] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (actionExecuted) {
      (async () => {
        await update();
        router.replace("/dashboard");
      })();
    }
  }, [actionExecuted, router, update]);

  function onSubmit(values: LoginFormValues) {
    setServerError("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const result = await login({ message: "", errors: {} }, formData);
      if (result.actionSuccess) {
        setActionExecuted(true);
      } else if (result.message) {
        setServerError(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="E-Mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Passwort" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending}>Login</SubmitButton>
        {isPending && <p>Wird verarbeitet...</p>}
        {serverError && (
          <p className="mt-2 text-sm text-red-500">{serverError}</p>
        )}
      </form>
    </Form>
  );
}
