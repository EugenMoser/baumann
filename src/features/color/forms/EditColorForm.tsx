"use client";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CustomButton from "@/components/shared/CustomButton";
import { Button } from "@/components/ui/button";
import {
  ColorInputField,
  ColorNotificationFormStates,
  updateColor,
} from "@/features/color";
import { Color } from "@prisma/client";

interface EditColorFormProps {
  color: Color;
}

/**
 * Client component with a dialog-like toggle to edit a color inline.
 */
export function EditColorForm({
  color,
}: EditColorFormProps): React.JSX.Element {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    colorId: color.colorId,
    name: color.name,
    code: color.code,
  });

  const initialState: ColorNotificationFormStates = {
    message: "",
    errors: {},
    success: false,
  };

  const updateWithId = updateColor.bind(null, color.id);
  const [state, formAction] = useActionState(updateWithId, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Farbe wurde aktualisiert.");
      setIsEditing(false);
      router.refresh();
    } else if (!state.success && Object.keys(state.errors ?? {}).length > 0) {
      toast.error(state.globalError || "Fehler beim Aktualisieren.");
    }
  }, [state.success, state.errors, state.message, state.globalError, router]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isEditing) {
    return (
      <Button onClick={() => setIsEditing(true)} className="btn">
        Bearbeiten
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">
          Farbe bearbeiten: {color.name}
        </h3>
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
          <div className="flex gap-2 pt-4">
            <CustomButton
              type="submit"
              buttonType="defaultButton"
              title="Aktualisieren"
              ariaLabel="Farbe aktualisieren"
            />
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              Abbrechen
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
