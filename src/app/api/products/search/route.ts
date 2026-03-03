import { NextResponse } from "next/server";

import { searchProducts } from "@/features/product/actions/queries/searchProducts";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") ?? "";
    if (!q) return NextResponse.json([], { status: 200 });

    const results = await searchProducts(q);
    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
