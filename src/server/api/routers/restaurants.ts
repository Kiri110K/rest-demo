import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { restaurants, menuItems } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { type InferSelectModel } from "drizzle-orm";
import { db } from "~/server/db";
import slugify from "slugify";

// Types for restaurant and menu item
export type Restaurant = InferSelectModel<typeof restaurants>;
export type MenuItem = InferSelectModel<typeof menuItems>;

// Explicitly type slugify as a function
const slugifyFn = slugify as (str: string, options?: Parameters<typeof slugify>[1]) => string;

export const restaurantsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Explicitly type the result
    const result: Pick<Restaurant, "id" | "name" | "latitude" | "longitude">[] = await ctx.db
      .select({
        id: restaurants.id,
        name: restaurants.name,
        latitude: restaurants.latitude,
        longitude: restaurants.longitude,
      })
      .from(restaurants);
    return result;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Get the restaurant
      const restaurant: Restaurant | undefined = await ctx.db.query.restaurants.findFirst({
        where: eq(restaurants.id, input.id),
      });
      if (!restaurant) return null;
      // Get menu items
      let items: MenuItem[] = [];
      if (restaurant) {
        items = await ctx.db
          .select()
          .from(menuItems)
          .where(eq(menuItems.restaurantId, restaurant.id));
      }
      return restaurant ? { ...restaurant, menuItems: items } : null;
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      // Get all restaurants
      const allRestaurants: Restaurant[] = await ctx.db.select().from(restaurants);
      // Find the one with a matching slug
      const restaurant = allRestaurants.find((r: Restaurant) =>
        slugifyFn(r.name ?? "", { lower: true }) === input.slug
      );
      if (!restaurant) return null;
      // Get menu items
      const items: MenuItem[] = await ctx.db
        .select()
        .from(menuItems)
        .where(eq(menuItems.restaurantId, restaurant?.id));
      return restaurant ? { ...restaurant, menuItems: items } : null;
    }),
}); 