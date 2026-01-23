import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic"; // SSR: immer aktuell
export const revalidate = 0;

export default async function OffersPage() {
  const now = new Date();

  const offers = await prisma.offer.findMany({
    where: {
      isActive: true,
      OR: [
        { validFrom: null, validUntil: null },
        { validFrom: { lte: now }, validUntil: null },
        { validFrom: null, validUntil: { gte: now } },
        { validFrom: { lte: now }, validUntil: { gte: now } },
      ],
    },
    orderBy: { updatedAt: "desc" },
    take: 30,
    include: { course: { select: { title: true, slug: true } } },
  });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Last Minute Angebote</h1>
      <p className="mt-2 opacity-80">Immer aktuell beim Aufruf.</p>

      <ul className="mt-5 space-y-3">
        {offers.length === 0 ? (
          <li className="opacity-80">Derzeit keine Angebote.</li>
        ) : (
          offers.map((o) => (
            <li key={o.id} className="rounded-lg border p-4">
              <div className="text-lg font-medium">{o.title}</div>

              {o.course ? (
                <div className="mt-1 text-sm opacity-80">
                  Bezug:{" "}
                  <Link className="underline" href={`/courses/${o.course.slug}`}>
                    {o.course.title}
                  </Link>
                </div>
              ) : null}

              {o.description ? <p className="mt-2 whitespace-pre-line">{o.description}</p> : null}

              {typeof o.priceCents === "number" ? (
                <div className="mt-2 text-sm">
                  Preis: {(o.priceCents / 100).toFixed(2)} €
                </div>
              ) : null}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}