export default function RepairPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Reparatur-Service</h1>
      <p className="mt-3">
        Wir warten und reparieren Tauchausrüstung: Atemregler, Jackets, Flaschenventile und mehr.
      </p>

      <ul className="mt-4 list-disc space-y-1 pl-5">
        <li>Regler-Revision (inkl. Dichtungssatz)</li>
        <li>Jacket-Check & Dichtigkeitsprüfung</li>
        <li>Flaschenventil-Service</li>
      </ul>

      <p className="mt-4 opacity-80">
        Hinweis: Preise & Dauer nach Zustand/Modell. Bring deine Ausrüstung einfach vorbei.
      </p>
    </main>
  );
}
