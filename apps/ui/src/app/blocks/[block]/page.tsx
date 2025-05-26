 
import BlockToolbar from "@/src/components/blocks/block-toolbar";
import BlockPreview from "@/src/components/blocks/block-preview";
import FileExplorer from "@/src/components/blocks/file-explorer"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dalim/core/ui/tabs"; 
import { BlockProvider } from "@/src/components/blocks/block-provider"; 
import { notFound } from "next/navigation";
import registry from "../../../../registry.json"; 

 
const BlockPage = async (props: { params: Promise<{ block: string }> }) => {
  const params = await props.params;
  const { block } = params;

  const blockDetails = registry.items.find((item) => item.name === block);
  if (!blockDetails) notFound();
 
  const files = blockDetails.files.map((file) => ({
    ...file,
    path: file.path.replace(`registry/default/blocks/${block}/`, ""),
  }));

  return (
    <BlockProvider> 
      <div className="max-w-screen-2xl mx-auto py-8 px-4"> 
        <Tabs defaultValue="preview" className="mt-6">
          <div className="mb-4 flex items-center gap-2 justify-between pr-1.5">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <BlockToolbar />
          </div> 
          <TabsContent value="preview">
            <BlockPreview block={"navbar-01"} />
          </TabsContent>
          <TabsContent value="code">
            <FileExplorer files={files} />
          </TabsContent>
        </Tabs>

        
      </div>
    </BlockProvider>
  );
};

export default BlockPage;
