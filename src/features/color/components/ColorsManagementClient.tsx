"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { DeleteColorButton, EditColorForm } from "@/features/color";
import { Color } from "@prisma/client";

interface ColorsManagementClientProps {
  colors: Color[];
}

/**
 * Client component for colors management with search by name or color ID (RAL number).
 */
export default function ColorsManagementClient({
  colors,
}: ColorsManagementClientProps): React.JSX.Element {
  const [search, setSearch] = useState("");

  const q = search.toLowerCase().trim();
  const filtered = q
    ? colors.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.colorId.toLowerCase().includes(q),
      )
    : colors;

  return (
    <>
      <div className="mb-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Suche nach Name oder RAL-Nummer..."
          className="w-full rounded-md border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          autoComplete="off"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">Keine Farben gefunden.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((color) => (
            <div
              key={color.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="h-10 w-10 rounded-full border"
                  style={{ backgroundColor: color.code }}
                  title={color.code}
                />
                <div>
                  <p className="font-medium">{color.name}</p>
                  <p className="text-muted-foreground text-sm">{color.code}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <EditColorForm color={color} />
                <DeleteColorButton
                  colorId={color.colorId}
                  colorName={color.name}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
