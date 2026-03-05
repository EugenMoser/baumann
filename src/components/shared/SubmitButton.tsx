"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  isPending?: boolean;
  disabled?: boolean;
  className?: string;
  form?: string;
}

/**
 * A submit button that shows a loading spinner while the form action is pending.
 */
export function SubmitButton({
  children,
  isPending = false,
  disabled = false,
  className,
  form,
}: SubmitButtonProps): React.JSX.Element {
  return (
    <Button
      form={form}
      type="submit"
      disabled={disabled || isPending}
      className={className}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
