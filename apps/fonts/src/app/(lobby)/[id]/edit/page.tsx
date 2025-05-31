"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@dalim/core/ui/button";
import { ArrowLeft } from "lucide-react"; 
import { Card } from "@dalim/core/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dalim/core/ui/tabs";
import { useToast } from "@dalim/core/hooks/use-toast";
import { getFontById } from "@/src/lib/fonts";
import { FontEditForm } from "@/src/components/fonts/font-edit-form";
import { FontPreview } from "@/src/components/fonts/font-preview";

interface FontEditPageProps {
  params: {
    id: string;
  };
}

export default function FontEditPage({ params }: FontEditPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [font, setFont] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const fontData = await getFontById(params.id);
        if (!fontData) {
          toast({
            title: "Error",
            description: "Font not found",
            variant: "destructive",
          });
          router.push("/fonts");
          return;
        }
        setFont(fontData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load font",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFont();
  }, [params.id, router, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[70vh]">
        <div className="animate-pulse text-xl">Loading font data...</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Font: {font?.name}</h1>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Font Details</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card className="p-6">
            <FontEditForm font={font} />
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card className="p-6">
            <FontPreview 
              font={{
                url: font?.previewUrl,
                name: font?.name,
                type: font?.type,
              }} 
              expanded 
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="files">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Font Files</h3>
              <p className="text-muted-foreground">
                To replace files, please upload a new font.
              </p>
              <div className="grid gap-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <span>Preview Font File</span>
                  <Button size="sm" variant="outline" asChild>
                    <a href={font?.previewUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <span>Download Font File</span>
                  <Button size="sm" variant="outline" asChild>
                    <a href={font?.downloadUrl} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                </div>
                {font?.zipFileUrl && (
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <span>ZIP Font Package</span>
                    <Button size="sm" variant="outline" asChild>
                      <a href={font?.zipFileUrl} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}