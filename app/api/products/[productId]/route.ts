// app/api/products/[productId]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.userId;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productId } = params;
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    // First, verify the product exists and the user is the owner
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        ownerId: userId, // This is the crucial security check!
      },
    });

    if (!product) {
      return new NextResponse("Product not found or you are not the owner", {
        status: 404,
      });
    }

    // If ownership is confirmed, delete the product
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    console.log(`✅ Product with ID ${productId} deleted successfully.`);
    return new NextResponse(null, { status: 204 }); // 204 No Content is a standard success response for DELETE
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
