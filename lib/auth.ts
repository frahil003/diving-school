import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

export async function isAdminAuthed() {
  const store = await cookies();
  const v = store.get(COOKIE_NAME)?.value;
  return v === "1";
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 Tage
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}
