import { z } from "zod";

export const CourseCreateSchema = z.object({
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/, "slug muss z.B. 'open-water' sein"),
  title: z.string().min(2).max(120),
  description: z.string().min(10),
  prerequisites: z.string().max(500).optional().nullable(),
  priceCents: z.coerce.number().int().min(0),
  durationMins: z.coerce.number().int().min(30),
  isActive: z.coerce.boolean().optional(),
});
