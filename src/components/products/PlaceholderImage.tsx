import Image from "next/image";

export default function PlaceholderImage(): React.JSX.Element {
  return (
    <div className="justify-center-center flex h-[200px] w-[465px] overflow-hidden">
      <Image
        src={"/images/placeholder-image.jpg"}
        alt="Kein Bild verfügbar"
        width={465}
        height={200}
        loading="lazy"
        className="object-cover"
      />
    </div>
  );
}
