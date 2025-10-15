"use client";
import {
  useEffect,
  useState,
} from "react";

import {
  Check,
  ChevronsUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { getAllColors } from "@/lib/database";
import { cn } from "@/lib/utils";
import { Color } from "@prisma/client";

interface ColorDetailsFormProps {
  colors: Color[] | null;
}

export default function ColorDetailsForm({
  colors,
}: ColorDetailsFormProps): React.JSX.Element {
  const [colorMode, setColorMode] = useState("existingColor");
  // const [colors, setColors] = useState<Color[]>([]);
  const [colorValue, setColorValue] = useState("");

  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   const fetchColors = async () => {
  //     const result = await getAllColor();
  //     setColors(result ?? []);
  //   };
  //   fetchColors();
  // }, []);
  return (
    <>
      <h2>----------- Farbe --------------</h2>

      <RadioGroup
        defaultValue="existingColor"
        onValueChange={(value) => setColorMode(value)}
        name="colorMode"
        className="flex-column flex"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existingColor" id="existingColor" />
          <Label htmlFor="existingColor">vorhandene Farbe wählen</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="newColor" id="newColor" />
          <Label htmlFor="newColor">neue Farbe hinzufügen</Label>
        </div>
      </RadioGroup>
      {colorMode === "existingColor" && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[400px] justify-between"
            >
              {colorValue
                ? colors?.find((color) => color.colorId === colorValue)?.name
                : "Bitte Farbe wählen..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] p-0">
            <Command>
              <CommandInput placeholder="Suche Farbe..." />
              <CommandList>
                <CommandEmpty>Keine Farbe gefunden.</CommandEmpty>
                <CommandGroup>
                  {colors?.map((color) => (
                    <CommandItem
                      key={color.id}
                      value={color.name}
                      className="flex items-center gap-2"
                      onSelect={(currentValue) => {
                        const selectedColor = colors.find(
                          (color) => color.name === currentValue,
                        );

                        setColorValue(
                          selectedColor?.colorId === colorValue
                            ? ""
                            : selectedColor?.colorId || "",
                        );

                        setOpen(false);
                      }}
                    >
                      {" "}
                      <div className="flex items-center gap-2">
                        <span
                          style={
                            {
                              "--bg-color": color.code || "transparent",
                            } as React.CSSProperties
                          }
                          className={cn(
                            `h-4 w-4 shrink-0 rounded-full border-black bg-[var(--bg-color)]`,
                          )}
                        />

                        {color.name}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}

      {colorMode === "newColor" && (
        <div className="flex flex-col space-y-2">
          <Input
            type="string"
            name="colorId"
            id="colorId"
            placeholder="Farben - ID"
            className="size-fit border border-gray-300 p-2 text-center"
            // aria-describedby="email-error"
          />{" "}
          <Input
            type="string"
            name="colorName"
            id="colorName"
            placeholder="Farben - Name"
            className="size-fit border border-gray-300 p-2 text-center"
            // aria-describedby="email-error"
          />
          <Input
            type="string"
            name="colorCode"
            id="colorCode"
            placeholder="Hexa - Code z.B. #abc123"
            className="size-fit border border-gray-300 p-2 text-center"
            pattern="^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$"
            // aria-describedby="email-error"
          />
        </div>
      )}
    </>
  );
}
