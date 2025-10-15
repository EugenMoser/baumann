"use client";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import CustomButton from "@/components/shared/CustomButton";
import { Input } from "@/components/ui/input";
import { passwordRequestAction } from "@/features/auth/actions/password";
import { FormPasswordStates } from "@/types/form";

// todo: implement shadcn ui form
export default function PasswordRequestForm(): React.JSX.Element | null {
  const initialState: FormPasswordStates = {
    message: "",
    errors: {},
    actionSuccess: false,
  };

  const [state, formAction, isPending] = useActionState(
    passwordRequestAction,
    initialState,
  );

  //disable button if there send a mail to the user
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (!state.errors) {
      setIsDisabled(!isDisabled);
    }
  }, [state.errors]);

  // todo: implement isPending ui
  return (
    <form
      action={formAction}
      noValidate
      className="flex w-1/2 flex-col gap-4 border p-4"
    >
      <Input
        type="email"
        name="email"
        placeholder="E-Mail-Adresse"
        aria-describedby="email-error"
        className="w-50"
        disabled={isDisabled}
      />

      {state.errors?.email && (
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors.email.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      )}

      <CustomButton
        type="submit"
        buttonType="defaultButton"
        title="Link anfordern"
        isDisabled={isDisabled}
        ariaLabel="Link anfordern"
      />

      {isPending && "Loading..."}
      {!isPending && state.message && (
        <div id="message" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        </div>
      )}
      {!isPending && state.actionSuccess && (
        <CustomButton
          type="button"
          buttonType="redirect"
          title="Zum Login"
          redirectUrl="/login"
          ariaLabel="Zum Login"
        />
      )}
    </form>
  );
}
