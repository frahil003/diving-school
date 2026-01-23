import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="border-b">
          <nav className="mx-auto flex max-w-5xl items-center gap-4 p-4">
            <Link className="font-semibold" href="/">
              Diving School
            </Link>
            <Link className="underline" href="/courses">
              Kurse
            </Link>
            <Link className="underline" href="/offers">
              Last Minute
            </Link>
            <Link className="underline" href="/repair">
              Reparatur-Service
            </Link>
            <div className="ml-auto">
              <Link className="underline" href="/admin">
                Admin
              </Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-12 border-t">
          <div className="mx-auto max-w-5xl p-4 text-sm opacity-70">
            © {new Date().getFullYear()} Diving School
          </div>
        </footer>
      </body>
    </html>
  );
}
