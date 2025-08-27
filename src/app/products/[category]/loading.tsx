"use client";

export default function Loading() {
  // Das Skelett zeigt 8 Platzhalter-Elemente in einem responsiven Grid an.
  const numberOfSkeletons = 8;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <div
          key={index}
          className="flex h-80 animate-pulse flex-col bg-card-background p-6"
        >
          {/* Kopfbereich: Bild + Überschrift-Skelett */}
          <div className="mb-2 flex min-h-24 items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <div
                className="h-4 rounded bg-gray-300"
                style={{ width: "80%" }}
              ></div>
              <div
                className="h-4 rounded bg-gray-300"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
          <hr className="mb-2 border border-gray-300" />
          {/* Beschreibung */}
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-2">
              <div
                className="h-3 rounded bg-gray-300"
                style={{ width: "100%" }}
              ></div>
              <div
                className="h-3 rounded bg-gray-300"
                style={{ width: "90%" }}
              ></div>
              <div
                className="h-3 rounded bg-gray-300"
                style={{ width: "80%" }}
              ></div>
            </div>
            {/* Farboptionen als Kreise */}
            <div className="mt-4 flex space-x-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 w-8 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
