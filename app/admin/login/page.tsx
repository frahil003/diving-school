"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await fetch("/admin/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login fehlgeschlagen");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <form className="mt-6 space-y-3" onSubmit={onSubmit}>
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Admin Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="rounded bg-black px-4 py-2 text-white" type="submit">
          Einloggen
        </button>
      </form>
    </main>
  );
}
