import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id") as string;
    if (!id) {
      return new NextResponse(JSON.stringify({ error: "Missing id" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const inventory = await prisma.inventory.delete({
      where: {
        id,
      },
    });

    const json_response = {
      status: "success",
      data: {
        inventory,
      },
    };

    return NextResponse.json(json_response);
  } catch (error) {
    console.error("Error deleting data:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete inventory" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}