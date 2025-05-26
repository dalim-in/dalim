  import { capitalize } from "@/src/lib/utils";
import { UI_URL } from "@dalim/auth";
import { BreadcrumbList, Graph, WebSite } from "schema-dts";

const BlockCategoryJsonLd = ({ category }: { category: string }) => {
  const breadCrumbList: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Shadcn UI Blocks",
        item: UI_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blocks",
        item: `${UI_URL}/blocks`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: capitalize(category),
        item: `${UI_URL}/blocks/categories/${category}`,
      },
    ],
  };
  const website: WebSite = {
    "@type": "WebSite",
    name: "Shadcn UI Blocks",
    url: UI_URL,
  };
   

  const jsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": [breadCrumbList, website],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
};

export default BlockCategoryJsonLd;
