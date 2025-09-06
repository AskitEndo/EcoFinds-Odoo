// app/api/webhooks/clerk/route.ts

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  let evt: WebhookEvent;

  // --- START OF DEVELOPMENT-FRIENDLY MODIFICATION ---
  // Bypass verification for local development tests if a special header is present
  const isDevelopmentTest =
    process.env.NODE_ENV === "development" &&
    req.headers.get("x-test-webhook") === "true";

  if (isDevelopmentTest) {
    // For local tests, we just cast the payload to the event type
    evt = payload as WebhookEvent;
    console.log("✅ Bypassing Svix verification for local test.");
  } else {
    // For production, we verify the signature
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", { status: 400 });
    }
  }
  // --- END OF MODIFICATION ---

  const eventType = evt.type;
  if (eventType !== "user.created") {
    return NextResponse.json(
      { message: "Ignoring non-user.created event" },
      { status: 200 }
    );
  }

  const { id, email_addresses, image_url, username } = evt.data;

  if (!id || !email_addresses) {
    return NextResponse.json(
      { error: "Missing required data" },
      { status: 400 }
    );
  }

  try {
    await prisma.user.create({
      data: {
        clerkUserId: id,
        email: email_addresses[0].email_address,
        username: username || email_addresses[0].email_address.split("@")[0],
        imageUrl: image_url,
      },
    });
    console.log(
      `✅ New user, ${username}, successfully created in the database.`
    );
  } catch (error) {
    console.error("Error creating user in database:", error);
    return NextResponse.json(
      { error: "Failed to create user in database" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
