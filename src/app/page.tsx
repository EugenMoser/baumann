import Image from "next/image";

import sections from "@constants/sections";

export default async function Home() {
  return (
    <>
      <h1>Willkommen auf unserer Webseite</h1>
      <p>
        Wir entwickeln und produzieren im Allgäu seit 41 Jahren Spritzgussteile
        für die Caravan Industrie. Für diesen Markt ist ein großes Sortiment an
        Möbelteilen, Halterungen, Lüftungsteilen und Dichtungen entstanden. Mit
        dem 1984 gegründeten Unternehmen Wilfried Baumann Spritzgussteile wurde
        das Fundament für das in zweiter Generation inhabergeführte
        Familienunternehmen Tilo Baumann Spritzgussteile e.K. gelegt.
      </p>
      <h2>Unsere Bereiche</h2>
      <ul className="flex flex-col gap-4">
        {sections.map((section) => (
          <li
            key={section.name}
            className="flex items-center justify-center bg-slate-50"
          >
            <Image
              src={`/icons/${section.icon}`}
              alt={`Ein Icon für den ${section.name}`}
              width={32}
              height={32}
            />
            <h3>{section.name}</h3>
          </li>
        ))}
      </ul>
    </>
  );
}
