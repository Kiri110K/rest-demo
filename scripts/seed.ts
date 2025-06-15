import { db } from "~/server/db";
import { restaurants } from "~/server/db/schema";

async function main() {
  console.log("🌱 Seeding database...");

  // Sample restaurant data
  const sampleRestaurants = [
    {
      id: "1",
      name: "Pizza Palace",
      description: "Best pizza in town",
      latitude: 51.505,
      longitude: -0.09,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Burger Barn",
      description: "Juicy burgers and fries",
      latitude: 51.51,
      longitude: -0.1,
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Sushi Spot",
      description: "Fresh and authentic Japanese cuisine",
      latitude: 51.515,
      longitude: -0.095,
      createdAt: new Date(),
    },
  ];

  try {
    // Insert sample restaurants
    await db.insert(restaurants).values(sampleRestaurants);
    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  }); 