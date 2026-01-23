"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminCourseNewPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    prerequisites: "",
    priceCents: "39900",
    durationMins: "180",
    isActive: true,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/admin/api/courses", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...form,
        prerequisites: form.prerequisites || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.log(data);
      setError("Speichern fehlgeschlagen (siehe Konsole für Details).");
      return;
    }

    router.push("/admin/courses");
    router.refresh();
  }

  return (
    <main className="max-w-2xl">
      <h1 className="text-xl font-semibold">Neuer Kurs</h1>

      <form className="mt-4 space-y-3" onSubmit={submit}>
        <input
          className="w-full rounded border p-2"
          placeholder="slug (z.B. open-water)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="Titel"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full rounded border p-2"
          placeholder="Beschreibung"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="Voraussetzungen (optional)"
          value={form.prerequisites}
          onChange={(e) => setForm({ ...form, prerequisites: e.target.value })}
        />
        <input
          className="w-full rounded border p-2"
          type="number"
          placeholder="Preis in Cent"
          value={form.priceCents}
          onChange={(e) => setForm({ ...form, priceCents: e.target.value })}
        />
        <input
          className="w-full rounded border p-2"
          type="number"
          placeholder="Dauer in Minuten"
          value={form.durationMins}
          onChange={(e) => setForm({ ...form, durationMins: e.target.value })}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          Aktiv
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button className="rounded bg-black px-4 py-2 text-white" type="submit">
          Speichern
        </button>
      </form>
    </main>
  );
}
