import { NextResponse } from "next/server"; 
import { prisma } from "@dalim/db"; 

// Add CORS headers to responses
function withCORS(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Use a specific origin in production
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
 
// Handle GET /api/fonts
export async function GET() {
  try {
    const fonts = await prisma.font.findMany({
      orderBy: { createdAt: "desc" },
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

    return withCORS(NextResponse.json(fonts));
  } catch (error) {
    console.error("Error fetching fonts:", error);
    return withCORS(
      NextResponse.json({ error: "Failed to fetch fonts" }, { status: 500 })
    );
  }
}
 

// Handle preflight CORS request
export async function OPTIONS() {
  return withCORS(new NextResponse(null, { status: 204 }));
}
