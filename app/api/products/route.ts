// app/api/products/route.ts

import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
// --- GET endpoint for searching and filtering products ---
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchTerm = searchParams.get("searchTerm") || "";
    const category = searchParams.get("category") || "all";

    const whereClause: any = {
      // Search in both title and description, case-insensitive
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ],
    };

    // If a specific category is chosen (and not 'all'), add it to the query
    if (category !== "all") {
      whereClause.category = category;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import * as z from "zod";

const prisma = new PrismaClient();

// Define the same validation schema we used on the frontend
// This ensures data integrity on the server-side
const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  category: z.string(),
  price: z.number().positive("Price must be a positive number."),
  imageUrl: z.string().url("Please enter a valid image URL."),
});

export async function POST(req: Request) {
  try {
    // 1. Authenticate the user
    const session = await auth();
    const userId = session?.userId;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Get and validate the request body
    const body = await req.json();
    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ error: validation.error.flatten() }),
        { status: 400 }
      );
    }

    const { title, description, category, price, imageUrl } = validation.data;

    // 3. Create the product in the database
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        category,
        price,
        imageUrl,
        ownerId: userId, // Link the product to the logged-in user
      },
    });

    console.log(`✅ New product created: ${title}`);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
