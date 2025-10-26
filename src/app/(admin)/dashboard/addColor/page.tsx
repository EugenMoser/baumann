import ColorDetailsForm from "@/components/forms/ColorDetailsForm";

interface AddColorProps {}

export default function AddColor({}: AddColorProps): React.JSX.Element {
  return (
    <>
      <h2>----------- Farbe hinzufügen --------------</h2>
      <ColorDetailsForm />
    </>
  );
}
