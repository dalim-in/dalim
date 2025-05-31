import { NextResponse } from "next/server";
import { prisma } from "@dalim/db";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const font = await prisma.font.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!font) {
      return NextResponse.json(
        { error: "Font not found" },
        { status: 404 }
      );
    }

    // Increment view count
    const updatedFont = await prisma.font.update({
      where: {
        id: params.id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, viewCount: updatedFont.viewCount });
  } catch (error) {
    console.error(`Error incrementing view count for font with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to increment view count" },
      { status: 500 }
    );
  }
}