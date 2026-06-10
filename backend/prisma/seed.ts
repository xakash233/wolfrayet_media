import { seedCmsDatabase } from "@/lib/cms/repository";

async function main() {
  console.log("Seeding CMS database...");
  await seedCmsDatabase();
  console.log("Seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
