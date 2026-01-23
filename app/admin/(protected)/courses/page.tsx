import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Kurse</h1>
        <Link className="rounded border px-3 py-2" href="/admin/courses/new">
          + Neuer Kurs
        </Link>
      </div>

      <ul className="mt-4 space-y-2">
        {courses.map((c) => (
          <li key={c.id} className="rounded border p-3">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm opacity-80">/{c.slug}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
