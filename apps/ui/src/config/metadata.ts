import { Metadata } from "next"; 

export const constructMetadata = (metadata: Metadata): Metadata => {
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title!,
      description: metadata.description!,
      siteName: "Dalim UI",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          height: 630,
          width: 1200,
          alt: "Customized Shadcn UI Blocks & Components",
        },
      ],
      locale: "en_US",
      ...metadata.openGraph,
    },
    authors: [
      {
        name: "Akash Moradiya",
        url: "https://twitter.com/dalim_in",
      },
    ],
    manifest: "/site.webmanifest",
    ...metadata,
  };
};

export const generateOgImageUrl = ({
  title,
  type,
  mode = "light",
}: {
  title: string;
  type: string;
  mode?: "light" | "dark";
}) => {
  const url = process.env.UI_URL
    ? `https://${process.env.UI_URL}`
    : "http://localhost:3000";

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", title);
  ogUrl.searchParams.set("type", type);
  ogUrl.searchParams.set("mode", mode);

  return ogUrl.toString();
};
