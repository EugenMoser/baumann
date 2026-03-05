import Link from "next/link";

import { ColorDetailsForm } from "@/features/color/forms/ColorDetailsForm";

export default function AddColor(): React.JSX.Element {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1>Farbe hinzufügen</h1>
        <Link href="/dashboard/colors" className="btn-secondary">
          ← Zurück
        </Link>
      </div>
      <div className="rounded-lg border p-6">
        <ColorDetailsForm />
      </div>
    </div>
  );
}
