import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const revalidate = 3600;

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      sessions: {
        orderBy: { startsAt: "asc" },
        where: { startsAt: { gte: new Date() } },
        take: 20,
      },
    },
  });

  if (!course || !course.isActive) notFound();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Beschreibung</h2>
        <p className="mt-2 whitespace-pre-line">{course.description}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Voraussetzungen</h2>
        <p className="mt-2">{course.prerequisites || "Keine speziellen Voraussetzungen."}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Preis & Dauer</h2>
        <p className="mt-2">
          {(course.priceCents / 100).toFixed(2)} € · {course.durationMins} Minuten
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Kurstermine</h2>

        <ul className="mt-3 space-y-2">
          {course.sessions.length === 0 ? (
            <li className="opacity-80">Aktuell keine Termine verfügbar.</li>
          ) : (
            course.sessions.map((s) => (
              <li key={s.id} className="rounded border p-3">
                <div>
                  {new Date(s.startsAt).toLocaleString("de-DE")} –{" "}
                  {new Date(s.endsAt).toLocaleTimeString("de-DE")}
                </div>
                <div className="text-sm opacity-80">
                  Plätze: {Math.max(0, s.capacity - s.booked)} frei von {s.capacity}
                </div>
              </li>
            ))
          )}
        </ul>

        <p className="mt-3 text-xs opacity-70">
          Hinweis: Termine werden stündlich aktualisiert.
        </p>
      </section>
    </main>
  );
}