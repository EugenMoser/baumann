"use client";
import {
  useActionState,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { addColorAction } from "@/features/color/actions/addColor";
import { ColorNotificationFormStates } from "@/features/color/types";

import CustomButton from "../shared/CustomButton";
import ColorInputField from "./ColorInputField";

interface ColorDetailsFormProps {}

export default function ColorDetailsForm({}: ColorDetailsFormProps): React.JSX.Element {
  const [formData, setFormData] = useState({
    colorId: "",
    code: "",
    name: "",
  });
  const initialState: ColorNotificationFormStates = {
    message: "",
    errors: {},
    success: false,
  };
  const [state, formAction] = useActionState(addColorAction, initialState);

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
    console.log("Form data changed:", { name, value });
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={formAction} className="flex flex-col space-y-2">
      <ColorInputField
        type="string"
        colorId="colorId"
        name="colorId"
        title="Farben - ID"
        placeholder="Farben - ID"
        value={formData.colorId}
        onChange={handleOnChange}
        aria-describedby="color-id-error"
        error={state.errors?.colorId}
      />
      <ColorInputField
        type="string"
        colorId="colorName"
        name="name"
        title="Farben - Name"
        placeholder="Farben - Name"
        value={formData.name}
        onChange={handleOnChange}
        aria-describedby="color-name-error"
        error={state.errors?.colorName}
      />
      <ColorInputField
        type="string"
        colorId="colorCode"
        name="code"
        title="Farben - Code"
        placeholder="Hexa - Code z.B. #abc123"
        value={formData.code}
        onChange={handleOnChange}
        aria-describedby="color-code-error"
        error={state.errors?.colorCode}
      />
      <CustomButton
        type="submit"
        buttonType="defaultButton"
        title="Farbe hinzufügen"
        ariaLabel="Farbe hinzufügen"
      />
    </form>
  );
}
