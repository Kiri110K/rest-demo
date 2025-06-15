import { db } from "../src/server/db/index";
import { restaurants, menuItems } from "../src/server/db/schema";

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data (delete menuItems first due to FK constraint)
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(menuItems);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(restaurants);

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

  // Sample menu items for each restaurant
  const sampleMenuItems = [
    // Pizza Palace
    {
      id: "m1",
      restaurantId: "1",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato, mozzarella, and basil.",
      price: 10.99,
      createdAt: new Date(),
    },
    {
      id: "m2",
      restaurantId: "1",
      name: "Pepperoni Pizza",
      description: "Pepperoni, mozzarella, and tomato sauce.",
      price: 12.49,
      createdAt: new Date(),
    },
    {
      id: "m3",
      restaurantId: "1",
      name: "Garlic Bread",
      description: "Freshly baked garlic bread.",
      price: 4.99,
      createdAt: new Date(),
    },
    // Burger Barn
    {
      id: "m4",
      restaurantId: "2",
      name: "Classic Burger",
      description: "Beef patty, lettuce, tomato, onion, and cheese.",
      price: 9.99,
      createdAt: new Date(),
    },
    {
      id: "m5",
      restaurantId: "2",
      name: "Fries",
      description: "Crispy golden fries.",
      price: 3.49,
      createdAt: new Date(),
    },
    {
      id: "m6",
      restaurantId: "2",
      name: "Chicken Sandwich",
      description: "Grilled chicken breast with lettuce and mayo.",
      price: 8.99,
      createdAt: new Date(),
    },
    // Sushi Spot
    {
      id: "m7",
      restaurantId: "3",
      name: "Salmon Nigiri",
      description: "Fresh salmon over seasoned rice.",
      price: 6.99,
      createdAt: new Date(),
    },
    {
      id: "m8",
      restaurantId: "3",
      name: "California Roll",
      description: "Crab, avocado, and cucumber roll.",
      price: 7.99,
      createdAt: new Date(),
    },
    {
      id: "m9",
      restaurantId: "3",
      name: "Miso Soup",
      description: "Traditional Japanese soup with tofu and seaweed.",
      price: 2.99,
      createdAt: new Date(),
    },
  ];

  try {
    // Insert sample restaurants
    await db.insert(restaurants).values(sampleRestaurants);
    // Insert sample menu items
    await db.insert(menuItems).values(sampleMenuItems);
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