import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CourseCreateSchema } from "@/lib/validation/course";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = CourseCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  try {
    const created = await prisma.course.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        prerequisites: data.prerequisites ?? null,
        priceCents: data.priceCents,
        durationMins: data.durationMins,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e: any) {
    // Unique constraint (slug) etc.
    return NextResponse.json({ error: "Create failed" }, { status: 400 });
  }
}
