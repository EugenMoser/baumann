"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordReset } from "@/features/auth";
import { PasswordResetFormSchema } from "@/features/auth/schemas/passwordSchema";

type PasswordResetValues = z.infer<typeof PasswordResetFormSchema>;

export function PasswordResetForm(): React.JSX.Element | null {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<PasswordResetValues>({
    resolver: zodResolver(PasswordResetFormSchema),
    defaultValues: { token: token ?? "", password: "", confirmPassword: "" },
  });

  function onSubmit(values: PasswordResetValues) {
    setServerMessage("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("token", values.token);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      const result = await passwordReset(
        { message: "", errors: {} },
        formData,
      );
      if (result.actionSuccess) {
        setIsSuccess(true);
        setServerMessage(result.message);
      } else if (result.message) {
        setServerMessage(result.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-1/2 flex-col gap-4 border p-4"
      >
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort wiederholen</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Passwort wiederholen"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending} disabled={isSuccess}>
          Passwort ändern
        </SubmitButton>
        {!isPending && serverMessage && (
          <p className="mt-2 text-sm text-red-500">{serverMessage}</p>
        )}
        {!isPending && isSuccess && (
          <Button type="button" asChild>
            <Link href="/login">Zum Login</Link>
          </Button>
        )}
      </form>
    </Form>
  );
}
