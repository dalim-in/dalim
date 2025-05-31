import { NextResponse } from "next/server";
import { auth } from "@dalim/auth";
import { FontType, FontCategory, prisma } from "@dalim/db";
import { cloudinary } from "@/src/lib/cloudinary";

export async function GET() {
  try {
    const fonts = await prisma.font.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(fonts);
  } catch (error) {
    console.error("Error fetching fonts:", error);
    return NextResponse.json(
      { error: "Failed to fetch fonts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - user ID missing" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const fontFiles = formData.get("fontFiles") as string;
    const licenceUrl = formData.get("licenceUrl") as string;
    const typeRaw = formData.get("type") as string;
    const categoryRaw = formData.get("category") as string;
    const featured = formData.get("featured") === "true";
    const tags = JSON.parse((formData.get("tags") as string) || "[]");

    const fontFile = formData.get("fontFile") as File;
    const zipFile = formData.get("zipFile") as File | null;

    if (!fontFile) {
      return NextResponse.json(
        { error: "Font file is required" },
        { status: 400 }
      );
    }

    // Validate font type
    const fontType = typeRaw.toUpperCase() as FontType;
    if (!Object.values(FontType).includes(fontType)) {
      return NextResponse.json(
        { error: `Invalid font type: ${typeRaw}` },
        { status: 400 }
      );
    }

    const fontCategory = categoryRaw.toUpperCase() as FontCategory;
    if (!Object.values(FontCategory).includes(fontCategory)) {
      return NextResponse.json(
        { error: `Invalid font type: ${categoryRaw}` },
        { status: 400 }
      );
    }

    // Upload font file to Cloudinary
    const fontBuffer = await fontFile.arrayBuffer();
    const fontBase64 = Buffer.from(fontBuffer).toString("base64");
    const fontDataURI = `data:${fontFile.type};base64,${fontBase64}`;

    const fontUploadResult = await cloudinary.uploader.upload(fontDataURI, {
      resource_type: "raw",
      folder: "fonts",
      public_id: `${Date.now()}-${fontFile.name.replace(/\s+/g, "-")}`,
    });

    let zipUploadResult = null;
    if (zipFile) {
      const zipBuffer = await zipFile.arrayBuffer();
      const zipBase64 = Buffer.from(zipBuffer).toString("base64");
      const zipDataURI = `data:${zipFile.type};base64,${zipBase64}`;

      zipUploadResult = await cloudinary.uploader.upload(zipDataURI, {
        resource_type: "raw",
        folder: "fonts/zip",
        public_id: `${Date.now()}-${zipFile.name.replace(/\s+/g, "-")}`,
      });
    }

    // Create font record in the database
    const font = await prisma.font.create({
      data: {
        name,
        description,
        fontFiles,
        type: fontType,
        category: fontCategory,
        licenceUrl,
        previewUrl: fontUploadResult.secure_url,
        downloadUrl: fontUploadResult.secure_url,
        zipFileUrl: zipUploadResult?.secure_url || null,
        publicId: fontUploadResult.public_id,
        featured,
        tags,
        userId: session.user.id,
      },
    });

    return NextResponse.json(font);
  } catch (error) {
    console.error("Error creating font:", error);
    return NextResponse.json(
      { error: "Failed to create font" },
      { status: 500 }
    );
  }
}