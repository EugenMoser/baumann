"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { passwordRequest } from "@/features/auth";
import { PasswordRequestFormSchema } from "@/features/auth/schemas/passwordSchema";

type PasswordRequestValues = z.infer<typeof PasswordRequestFormSchema>;

export function PasswordRequestForm(): React.JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<PasswordRequestValues>({
    resolver: zodResolver(PasswordRequestFormSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: PasswordRequestValues) {
    setServerMessage("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", values.email);

      const result = await passwordRequest(
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="E-Mail-Adresse"
                  disabled={isSuccess}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending} disabled={isSuccess}>
          Link anfordern
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
