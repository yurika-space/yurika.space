import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Parse .env.local manually to avoid dotenv dependency
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const seedData = [
  { email: "alice@example.com", user_type: "founder" },
  { email: "bob@example.com", user_type: "investor" },
  { email: "carol@example.com", user_type: "founder" },
  { email: "dave@example.com", user_type: "investor" },
  { email: "eve@example.com", user_type: "founder" },
  { email: "frank@example.com", user_type: "founder" },
  { email: "grace@example.com", user_type: "investor" },
  { email: "heidi@example.com", user_type: "founder" },
  { email: "ivan@example.com", user_type: "investor" },
  { email: "judy@example.com", user_type: "founder" },
];

async function seed() {
  console.log("Seeding 10 waitlist signups...\n");

  const { data, error } = await supabase
    .from("waitlist")
    .insert(seedData)
    .select();

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data.length} signups:`);
  data.forEach((row) => {
    console.log(`  - ${row.email} (${row.user_type})`);
  });

  // Verify total count
  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  console.log(`\nTotal waitlist entries: ${count}`);
}

seed();
