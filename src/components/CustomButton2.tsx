"use client";
import {
  Moon,
  Sun,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

import { Button } from "./ui/button";

interface CustomButtonProps {
  type: "button" | "submit";
  title: string;
  isDisabled?: boolean;
  handleOnClick?: () => void;
}

export default function CustomButton({
  type,
  title,
  isDisabled,
  handleOnClick,
}: CustomButtonProps): React.JSX.Element {
  return (
    <Button type={type} onClick={() => handleOnClick}>
      {title}
    </Button>
  );
}
