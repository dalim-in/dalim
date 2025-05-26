import { blockCategories, categorizedBlocks } from "@/registry/default/blocks";
import BlockCategoryJsonLd from "@/src/components/category/block-category-json-ld";
import BlockPreviewList from "@/src/components/category/block-preview-list"; 
import { constructMetadata, generateOgImageUrl } from "@/src/config/metadata"; 
import { capitalize } from "@/src/lib/utils";
import { Metadata } from "next";
import { UI_URL } from "@dalim/auth";

const keywordsTemplate = [
  "{{category}} Shadcn UI blocks",
  "Shadcn UI {{category}} examples",
  "{{category}} UI components",
  "{{category}} section code snippets",
  "{{category}} design templates",
  "Responsive {{category}} UI blocks",
  "Shadcn UI {{category}} code snippets",
  "{{category}} block preview and copy",
  "Ready-made {{category}} UI designs",
  "{{category}} section UI blocks for websites",
  "Customizable {{category}} Shadcn components",
  "Shadcn UI {{category}} templates",
  "Shadcn UI blocks for {{category}",
  "Elegant {{category}} design examples",
  "{{category}} integration with Shadcn",
  "Minimalist {{category}} section blocks",
  "{{category}} components for modern websites",
  "Professional {{category}} UI designs",
  "{{category}} section layout ideas",
];

export const generateStaticParams = async () => {
  return blockCategories.map((category) => ({
    category: category.name,
  }));
};

export const generateMetadata = async (
  props: {
    params: Promise<{ category: string }>;
  }
): Promise<Metadata> => {
  const params = await props.params;
  const { category } = params;
  const blocks = categorizedBlocks[category];
  const title = `${blocks.length}+ ${capitalize(
    category
  )} section Shadcn UI blocks`;
  const description = `Explore beautifully designed ${category} section blocks built with Shadcn UI. Preview, customize, and copy code snippets effortlessly to enhance your website's design and functionality.`;
  const keywords = keywordsTemplate.map((keyword) =>
    keyword.replaceAll("{{category}}", capitalize(category))
  );
  const openGraph = {
    images: [
      {
        url: generateOgImageUrl({
          title,
          type: "Block",
        }),
        width: 1200,
        height: 630,
        alt: "Customized Shadcn UI Blocks",
      },
    ],
  };

  return constructMetadata({
    title,
    description,
    keywords,
    openGraph,
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: (`${UI_URL}/blocks/categories/${category}`),
    },
  });
};

const BlockCategoryPage = async (
  props: {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ columns: string; q: string }>;
  }
) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { category } = params;

  return (
    <> 
      <div className="max-w-screen-2xl mx-auto py-12 sm:py-16">
        <BlockPreviewList category={category} {...searchParams} /> 
        <BlockCategoryJsonLd category={category} />
      </div>
    </>
  );
};

export default BlockCategoryPage;
