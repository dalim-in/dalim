import { blocks } from "@/registry/default/blocks"; 
import { notFound } from "next/navigation";

 
const BlockPreviewPage = async (props: {
  params: Promise<{ block: string }>;
}) => {
  const params = await props.params;
  const { block } = params;

  if (!blocks[block]) notFound();

  const { component: Component } = blocks[block];

  return (
    <div className=""> 
      <Component /> 
    </div>
  )
};

export default BlockPreviewPage;
