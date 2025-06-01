import { NextResponse } from "next/server";
import { auth } from "@dalim/auth";
import { prisma } from "@dalim/db";
import { cloudinary } from "@/src/lib/cloudinary";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const font = await prisma.font.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (!font) {
      return NextResponse.json(
        { error: "Font not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(font);
  } catch (error) {
    console.error(`Error fetching font with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch font" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    // Check if the user is the owner of the font or an admin
    if (font.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    
    // Update the font
    const updatedFont = await prisma.font.update({
      where: {
        id: params.id,
      },
      data: {
        ...body,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(updatedFont);
  } catch (error) {
    console.error(`Error updating font with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to update font" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    // Check if the user is the owner of the font or an admin
    if (font.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Delete files from Cloudinary
    if (font.publicId) {
      await cloudinary.uploader.destroy(font.publicId, { resource_type: "raw" });
    }

    // Delete font record from database
    await prisma.font.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting font with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: "Failed to delete font" },
      { status: 500 }
    );
  }
}
