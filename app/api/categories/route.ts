import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.inventory.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    const categoryList = categories.map(item => item.category);

    return new NextResponse(JSON.stringify(categoryList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch categories" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
