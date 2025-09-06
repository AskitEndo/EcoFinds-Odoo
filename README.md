# Technical Architecture

## Backend

EcoFinds uses the integrated backend capabilities of Next.js (API Routes and Server Components). All backend logic runs in a Node.js environment on the server, not in the user's browser.

- **User Management & Synchronization:**
  - Server-side logic in `app/dashboard/page.tsx` securely communicates with Clerk and the database to check for and create new users.
- **Product API (`/api/products`):**
  - **POST:** Securely creates new products, validates data, and links to the authenticated user.
  - **GET:** Fetches products, supports filtering by category and keyword search.
- **Specific Product Management (`/api/products/[productId]`):**
  - **DELETE:** Securely deletes a product, verifying the requester is the owner.
- **Security:** All backend operations use Clerk's `auth()` on the server to ensure only authenticated users can create or delete resources.

## Database

EcoFinds uses **SQLite** (via Prisma ORM) for all data storage. All user and product actions (sign up, add product, view, delete, etc.) are reflected in the `dev.db` file. SQLite was chosen for its speed, zero config, and offline capability—ideal for hackathons.

## ImageKit

- ImageKit is configured (SDK, server utility, credentials in `.env`).
- **Current:** Product forms use a URL string for image placeholders (meets hackathon requirements).
- **Next:** Client-side file upload logic can be added for full image upload support.

## High-Impact Improvisations (Next Steps)

To further impress judges and improve the user experience, consider these:

1. **Toast Notifications:**
   - Add `react-hot-toast` for instant feedback on product creation/deletion.
2. **Edit Product Page:**
   - Implement `/products/[productId]/edit` for full CRUD (pre-filled form, update endpoint).
3. **Loading Skeletons:**
   - Show skeleton cards while loading products for a polished, fast-feeling UI.
4. **Custom Clerk UI Theme:**
   - Match Clerk sign-in/sign-up UI to the app’s color scheme for seamless branding.

---

# 🌱 EcoFinds - Sustainable Second-Hand Marketplace

> Empowering Sustainable Consumption, One Unique Find at a Time.

---

<div align="center">
   <img src="https://avatars.githubusercontent.com/u/160294709?v=4" alt="Ankit profile" width="80" style="border-radius: 50%" />
   <img src="https://avatars.githubusercontent.com/u/175080629?v=4" alt="Sneha profile" width="80" style="border-radius: 50%" />
   <img src="https://avatars.githubusercontent.com/u/75797212?v=4" alt="Yash profile" width="80" style="border-radius: 50%" />
</div>

<div align="center">
   <a href="https://github.com/AskitEndo">AnkitKumar Singh [Askit]</a> &nbsp;|&nbsp;
   <a href="https://github.com/DarpanEndo">Sneha Priyadarshy[Darpan]</a> &nbsp;|&nbsp;
   <a href="https://github.com/Fr0nSen">Yash Raghav [Fr0Sen]</a>
</div>

---

## 🚀 Vision

EcoFinds is a vibrant, trusted platform that empowers sustainable consumption by making it easy to buy and sell pre-owned goods. Our mission: foster a culture of sustainability, reduce waste, and provide a convenient, accessible alternative to buying new items. EcoFinds aims to be the go-to destination for a conscious community seeking unique finds and responsible choices.

## ✨ Features

- **User Authentication:** Secure registration and login via Clerk (email/password, social login).
- **Profile Creation:** Usernames and profile images supported; dashboard displays user info.
- **Product Listing:** Create, view, edit, and delete product listings with title, description, category, price, and image.
- **Product Browsing:** Homepage feed with all products, category filter, and keyword search.
- **Product Detail View:** Dedicated page for each product with full details.
- **Cart:** Cart page for added products (currently uses mock data; persistent cart coming soon).
- **Purchases:** Previous purchases page (static for now; purchase flow coming soon).
- **User Dashboard:** View user info; future updates will allow editing all fields.
- **Responsive UI:** Mobile and desktop friendly, modern design, accessible navigation.

## 🏆 Hackathon Requirements Coverage

- [x] User authentication and registration
- [x] Profile creation (username)
- [x] User dashboard (view info; edit coming soon)
- [x] Product listing creation (title, description, category, price, image)
- [x] Product listing management (CRUD)
- [x] Product browsing (feed, filter, search)
- [x] Product detail view
- [x] Cart (UI present; logic in progress)
- [x] Previous purchases (UI present; logic in progress)

**Note:**

- Cart and purchase logic are currently mock/static and will be made persistent in future updates.
- All core screens and flows are present per the hackathon wireframes.

## ⚡ Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Generate Prisma Client:** _(Required for database access)_

   ```bash
   npx prisma generate
   ```

   If you see an error like:

   > `@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.`
   > Just run the above command and restart your dev server.

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser** to use EcoFinds. You can browse, register, list products, and explore all core features.

## 🛠️ Tech Stack

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui (UI primitives)
- Prisma ORM (SQLite)
- Clerk (authentication)
- Zod (form validation)

## 🔥 Improvements & Roadmap

- Persistent cart and purchase logic
- Editable user dashboard/profile
- Enhanced accessibility and polish
- Real-time updates and notifications

---

---

_Built by Ankit, Sneha, and Yash for the hackathon challenge: Empowering Sustainable Consumption through a Second-Hand Marketplace._
