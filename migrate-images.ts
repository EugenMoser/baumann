/**
 * One-time migration script:
 * 1. Migrates imageUrl_small  → imageUrls_small (string array)
 * 2. Migrates imageUrl_big1/2/3 → imageUrls_big (string array, catch-all)
 * 3. Removes dead fields: imageUrl_small, imageUrl_big1, imageUrl_big2, imageUrl_big3
 *
 * Run with: npx tsx migrate-images.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateResult {
  n: number;
  nModified: number;
  ok: number;
}

interface FindResult {
  cursor: {
    firstBatch: {
      _id: unknown;
      imageUrl_small?: string;
      imageUrls_small?: string[];
      imageUrl_big1?: string;
      imageUrls_big?: string[];
    }[];
  };
  ok: number;
}

async function migrate() {
  console.log("=== Image migration starting ===\n");

  // Step 1: imageUrl_small  →  imageUrls_small: [value]
  // Only for documents that don't yet have imageUrls_small
  console.log("Step 1: Migrating imageUrl_small → imageUrls_small …");
  const step1 = (await prisma.$runCommandRaw({
    update: "products",
    updates: [
      {
        q: {
          imageUrls_small: { $exists: false },
          imageUrl_small: { $exists: true },
        },
        u: [
          {
            $set: {
              imageUrls_small: {
                $filter: {
                  input: ["$imageUrl_small"],
                  cond: {
                    $and: [{ $ne: ["$$this", null] }, { $ne: ["$$this", ""] }],
                  },
                },
              },
            },
          },
        ],
        multi: true,
      },
    ],
  })) as unknown as UpdateResult;
  console.log(`  Matched: ${step1.n}, Modified: ${step1.nModified}\n`);

  // Step 2: imageUrl_big1/2/3  →  imageUrls_big (catch-all for any docs still missing it)
  console.log("Step 2: Migrating imageUrl_big1/2/3 → imageUrls_big …");
  const step2 = (await prisma.$runCommandRaw({
    update: "products",
    updates: [
      {
        q: { imageUrls_big: { $exists: false } },
        u: [
          {
            $set: {
              imageUrls_big: {
                $filter: {
                  input: ["$imageUrl_big1", "$imageUrl_big2", "$imageUrl_big3"],
                  cond: {
                    $and: [{ $ne: ["$$this", null] }, { $ne: ["$$this", ""] }],
                  },
                },
              },
            },
          },
        ],
        multi: true,
      },
    ],
  })) as unknown as UpdateResult;
  console.log(`  Matched: ${step2.n}, Modified: ${step2.nModified}\n`);

  // Step 3: Remove all dead fields from every document
  console.log(
    "Step 3: Removing dead fields (imageUrl_small, imageUrl_big1/2/3) …",
  );
  const step3 = (await prisma.$runCommandRaw({
    update: "products",
    updates: [
      {
        q: {},
        u: {
          $unset: {
            imageUrl_small: "",
            imageUrl_big1: "",
            imageUrl_big2: "",
            imageUrl_big3: "",
          },
        },
        multi: true,
      },
    ],
  })) as unknown as UpdateResult;
  console.log(`  Matched: ${step3.n}, Modified: ${step3.nModified}\n`);

  // Verification: show 3 sample documents
  console.log("Verification — first 3 products:");
  const check = (await prisma.$runCommandRaw({
    find: "products",
    projection: {
      _id: 1,
      imageUrls_small: 1,
      imageUrls_big: 1,
    },
    limit: 3,
  })) as unknown as FindResult;

  for (const p of check.cursor.firstBatch) {
    console.log(JSON.stringify(p, null, 2));
  }

  console.log("\n=== Migration complete ===");
}

migrate()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
