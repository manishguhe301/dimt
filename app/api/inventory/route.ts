import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany();
    return new NextResponse(JSON.stringify(inventory), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch inventory" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
