import Link from "next/link";
import { isAdminAuthed } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  return (
    <div>
      <header className="border-b">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 p-4">
          <Link className="font-semibold" href="/admin">
            Admin
          </Link>
          <Link className="underline" href="/admin/courses">
            Kurse
          </Link>
          <Link className="underline" href="/admin/courses/new">
            Neuer Kurs
          </Link>
          <div className="ml-auto">
            <form action="/admin/logout" method="post">
              <button className="underline" type="submit">
                Logout
              </button>
            </form>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  );
}
