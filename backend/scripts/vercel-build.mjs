import { execSync } from "node:child_process";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

run("npx prisma generate");

if (process.env.DATABASE_URL && process.env.VERCEL === "1") {
  try {
    console.log("→ Pushing database schema to production...");
    run("npx prisma db push --skip-generate --accept-data-loss");
    console.log("→ Seeding CMS defaults...");
    run("npx prisma db seed");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("⚠ Database setup failed during deploy:", message);
    console.warn(
      "  Set DATABASE_URL in Vercel and redeploy. CMS reads will use fallbacks until then."
    );
  }
}

run("npx next build");
