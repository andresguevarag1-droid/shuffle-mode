import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Point a Shopify webhook (e.g. products/update, products/create, products/delete)
// at POST /api/revalidate?secret=… to refresh the cached catalog on demand.
export async function POST(req: NextRequest) {
  const secret = process.env.SHOPIFY_REVALIDATION_SECRET;
  const provided =
    req.nextUrl.searchParams.get("secret") ??
    req.headers.get("x-revalidation-secret");

  if (secret && provided !== secret) {
    return NextResponse.json(
      { ok: false, message: "Invalid revalidation secret" },
      { status: 401 }
    );
  }

  // Next 16: second arg required — "max" = stale-while-revalidate semantics.
  revalidateTag("shopify-products", "max");
  return NextResponse.json({ ok: true, revalidated: true, now: Date.now() });
}
