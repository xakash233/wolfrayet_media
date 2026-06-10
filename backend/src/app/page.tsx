import Link from "next/link";

export default function BackendHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl font-bold">Wolfrayet API</h1>
      <p className="text-muted-foreground">
        Backend service for CMS, contact forms, and admin.
      </p>
      <Link
        href="/admin"
        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        Open Admin Panel
      </Link>
    </main>
  );
}
