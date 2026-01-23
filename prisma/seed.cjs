const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function addHours(date, h) {
  return new Date(date.getTime() + h * 60 * 60 * 1000);
}

async function main() {
  // Clean slate (dev only)
  await prisma.offer.deleteMany();
  await prisma.courseSession.deleteMany();
  await prisma.course.deleteMany();

  const openWater = await prisma.course.create({
    data: {
      slug: "open-water",
      title: "Open Water Diver",
      description:
        "Dein Einstieg ins Tauchen. Theorie + Praxis, sicher und strukturiert.\n\nAm Ende kannst du eigenständig mit Buddy tauchen.",
      prerequisites: "Mindestalter 10+, normale Gesundheit, Schwimmfähigkeit.",
      priceCents: 39900,
      durationMins: 180,
      isActive: true,
    },
  });

  const advanced = await prisma.course.create({
    data: {
      slug: "advanced-open-water",
      title: "Advanced Open Water",
      description:
        "Mehr Routine, mehr Skills: Navigation, Tieftauchen und weitere Abenteuer-Tauchgänge.",
      prerequisites: "Open Water Brevet oder äquivalent.",
      priceCents: 34900,
      durationMins: 120,
      isActive: true,
    },
  });

  const now = new Date();
  const start1 = addHours(now, 48);
  const start2 = addHours(now, 72);

  await prisma.courseSession.createMany({
    data: [
      {
        courseId: openWater.id,
        startsAt: start1,
        endsAt: addHours(start1, 3),
        capacity: 6,
        booked: 2,
      },
      {
        courseId: advanced.id,
        startsAt: start2,
        endsAt: addHours(start2, 2),
        capacity: 4,
        booked: 1,
      },
    ],
  });

  await prisma.offer.create({
    data: {
      title: "Last Minute: -15% auf Open Water (diese Woche)",
      description:
        "Kurzfristig frei geworden: Spare 15% auf den Open Water Kurs.\nGültig nur solange Plätze verfügbar sind.",
      priceCents: 33900,
      validFrom: now,
      validUntil: addHours(now, 7 * 24),
      isActive: true,
      courseId: openWater.id,
    },
  });

  console.log("✅ Seed: 2 Kurse, 2 Termine, 1 Offer");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
