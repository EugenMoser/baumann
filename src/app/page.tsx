import { BedDouble } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import productCategories, {
  categoryIcons,
} from "@/constants/productCategories";

<BedDouble />;
export default async function Home() {
  //hi claude
  return (
    <main className="justify-self-center">
      <h1 className="mb-4">
        Spritzgussteile aus dem Allgäu – seit über 40 Jahren
      </h1>
      <section className="mb-16 flex flex-col lg:flex-row">
        <Image
          src="/images/Maschine.jpeg"
          priority
          alt="Spritzguss Maschine"
          width={400}
          height={200}
          className="mr-8 justify-start object-contain"
        />
        <p className="mb-4 mt-8 w-[50%] lg:mt-0">
          Als familiengeführtes Unternehmen entwickeln und fertigen wir
          hochwertige Spritzgussteile für die Caravan-Industrie. Unser Sortiment
          umfasst Möbelteile, Halterungen, Lüftungselemente und Dichtungen –
          individuell auf die Bedürfnisse unserer Kunden abgestimmt.
          <br />
          <br />
          1984 gegründet von Wilfried Baumann, wird das Unternehmen heute in
          zweiter Generation von Tilo Baumann mit derselben Leidenschaft und
          Präzision geführt.
        </p>
      </section>
      <h2 className="mb-4 justify-self-center">Unsere Bereiche</h2>
      <ul className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
        {productCategories.map((productCategory) => {
          // Get the matching icon component for the current category
          const IconComponent = categoryIcons[productCategory.category];
          return (
            <li key={productCategory.name}>
              <Link
                href={`/products/${productCategory.category}`}
                className="navbar-item group flex items-center justify-center gap-4 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background transition-colors">
                  <IconComponent className="transition-transform duration-300 group-hover:scale-125" />
                </div>
                <p className="text-foreground transition-transform duration-300 group-hover:scale-110">
                  {productCategory.name}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
