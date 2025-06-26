import { model, type modelID } from "@/src/actions/providers";
import { colorPaletteTool, iconGeneratorTool, typographyTool, weatherTool } from "@/src/actions/tools";
import { streamText, type UIMessage } from "ai";

export const maxDuration = 20;

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
  }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

  const result = streamText({
    model: model.languageModel(selectedModel),
    system: `You are a professional design AI assistant specializing in UI/UX design, branding, typography, color theory, and visual design. 

Your expertise includes:
- Creating color palettes and color theory guidance
- Generating SVG icons and graphics
- Typography and font pairing recommendations
- Layout design and CSS/HTML code generation
- Brand identity and logo design advice
- Design system creation
- Accessibility and usability best practices
- Modern design trends and principles

Always provide practical, actionable design advice with code examples when relevant. Use the available tools to generate color palettes, icons, typography suggestions, and layouts when users request design elements.

Be creative, inspiring, and help users create beautiful, functional designs.`,
    messages,
    tools: {
      generateColorPalette: colorPaletteTool,
      generateIcon: iconGeneratorTool,
      suggestTypography: typographyTool, 
      displayWeather: weatherTool,
    },
    experimental_telemetry: {
      isEnabled: true,
    },
  });

  return result.toDataStreamResponse({
    sendReasoning: true,
    getErrorMessage: (error) => {
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          return "Rate limit exceeded. Please try again later.";
        }
      }
      console.error(error);
      return "An error occurred.";
    },
  });
}
