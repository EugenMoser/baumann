"use client";
import React from "react";

export default function ProductCardByCategorySkeleton(): React.JSX.Element {
  return (
    <div
      className="flex h-64 min-w-80 flex-col bg-card-background p-6 animate-pulse"
      aria-hidden
    >
      <section className="mb-2 flex max-h-24 min-h-24 items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </section>
      <hr className="border- mb-2 border-foreground" />
      <div className="flex h-full flex-col justify-between">
        <section className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
        </section>
        <section className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 ring-1" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 ring-1 -ml-2" />
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 ring-1 -ml-2" />
        </section>
      </div>
    </div>
  );
}
