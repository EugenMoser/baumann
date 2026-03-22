"use client";
import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";

import { FormInputField } from "@/components/shared/FormInputField";
import { SubmitButton } from "@/components/shared/SubmitButton";
import {
  addColor,
  ColorNotificationFormStates,
} from "@/features/color";

interface ColorDetailsFormProps {}

const initialFormDataState = {
  colorId: "",
  code: "",
  name: "",
};

const initialFormState: ColorNotificationFormStates = {
  message: "",
  errors: {},
  success: false,
};

export function ColorDetailsForm({}: ColorDetailsFormProps): React.JSX.Element {
  const [formData, setFormData] = useState(initialFormDataState);
  const [state, formAction, isPending] = useActionState(
    addColor,
    initialFormState,
  );

  // Show toast notification when add article failed or success
  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Farbe wurde hinzugefügt");
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error(state.globalError || "Fehler beim Hinzufügen der Farbe");
    }
  }, [state.success, state.errors]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={formAction} className="flex flex-col space-y-2">
      <FormInputField
        type="string"
        id="colorId"
        name="colorId"
        title="Farben - ID"
        placeholder="Farben - ID"
        value={formData.colorId}
        onChange={handleOnChange}
        aria-describedby="color-id-error"
        error={state.errors?.colorId}
      />
      <FormInputField
        type="string"
        id="colorName"
        name="name"
        title="Farben - Name"
        placeholder="Farben - Name"
        value={formData.name}
        onChange={handleOnChange}
        aria-describedby="color-name-error"
        error={state.errors?.colorName}
      />
      <FormInputField
        type="string"
        id="colorCode"
        name="code"
        title="Farben - Code"
        placeholder="Hexa - Code z.B. #abc123"
        value={formData.code}
        onChange={handleOnChange}
        aria-describedby="color-code-error"
        error={state.errors?.colorCode}
      />
      <SubmitButton isPending={isPending}>Farbe hinzufügen</SubmitButton>
    </form>
  );
}
