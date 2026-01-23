import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { title: "asc" },
    select: { id: true, slug: true, title: true, priceCents: true, durationMins: true },
  });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Kurse</h1>

      <ul className="mt-4 space-y-3">
        {courses.map((c) => (
          <li key={c.id} className="rounded-lg border p-4">
            <Link className="text-lg font-medium underline" href={`/courses/${c.slug}`}>
              {c.title}
            </Link>
            <div className="mt-1 text-sm opacity-80">
              Preis: {(c.priceCents / 100).toFixed(2)} € · Dauer: {c.durationMins} min
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}