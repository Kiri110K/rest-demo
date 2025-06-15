# Restaurant Demo

This is a demo project for a food ordering application

# Getting Started

To set up and run the project, follow these steps:

```sh
echo 'DATABASE_URL="file:./db.sqlite"' > .env
pnpm i
pnpm db:generate
pnpm db:migrate
```

After setup, start the development server with:

```sh
pnpm run dev
```

# Project Status

✅ Database schema for users, restaurants, and menu items
✅ Dynamic map with clickable restaurant markers
✅ Individual restaurant pages with live menus from the database
✅ Fully functional client-side cart with add/remove/clear actions

## Up Next

- Integrate authentication (NextAuth???)
- Owner dashboard for managing restaurants and menus
- Final polish: error/loading states, tests, and deployment