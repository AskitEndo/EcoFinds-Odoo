// app/dashboard/page.tsx
import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { UserButton } from "@clerk/nextjs";

const prisma = new PrismaClient();

// This is the core logic for syncing the user
async function syncUser() {
  const session = await auth();
  const userId = session?.userId;
  if (!userId) {
    // This should not happen if middleware is set up correctly
    redirect("/sign-in");
  }

  // Check if the user already exists in our database
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  // If they don't exist, create them
  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      // This is a rare edge case
      throw new Error("User not found in Clerk");
    }

    await prisma.user.create({
      data: {
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        username:
          clerkUser.username ||
          clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        imageUrl: clerkUser.imageUrl,
      },
    });
    console.log(`✅ New user synced to database: ${clerkUser.username}`);
  }
}

export default async function DashboardPage() {
  // Run the sync logic every time the dashboard is loaded
  await syncUser();

  const clerkUser = await currentUser();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, {clerkUser?.username}!
      </h1>
      <p className="text-lg text-gray-600">
        This is your dashboard. You are now synced with our database.
      </p>
      <div className="mt-8 p-6 bg-white border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <div className="flex items-center gap-4">
          {/* The UserButton component gives profile management for free! */}
          <UserButton />
          <p>Use the button to manage your account details.</p>
        </div>
      </div>
    </div>
  );
}
