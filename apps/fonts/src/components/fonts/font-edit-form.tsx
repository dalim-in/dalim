"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@dalim/core/ui/button";
import { Input } from "@dalim/core/ui/input";
import { Textarea } from "@dalim/core/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from "@dalim/core/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dalim/core/ui/select";
import { Switch } from "@dalim/core/ui/switch";
import { Badge } from "@dalim/core/ui/badge";
import { Loader2, Save, X } from "lucide-react";
import { useToast } from "@dalim/core/hooks/use-toast";
import { updateFont } from "@/src/lib/fonts";

const fontEditSchema = z.object({
  name: z.string().min(2, { message: "Font name must be at least 2 characters" }),
  description: z.string().optional(),
  type: z.enum(["TTF", "OTF", "WOFF", "WOFF2", "OTHER"]),
  featured: z.boolean().default(false),
});

type FontEditFormValues = z.infer<typeof fontEditSchema>;

interface FontEditFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  font: any;
}

export function FontEditForm({ font }: FontEditFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>(font.tags || []);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FontEditFormValues>({
    resolver: zodResolver(fontEditSchema),
    defaultValues: {
      name: font.name,
      description: font.description || "",
      type: font.type,
      featured: font.featured,
    },
  });

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: FontEditFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Update font with data and tags
      await updateFont(font.id, {
        ...data,
        tags,
      });
      
      toast({
        title: "Success",
        description: "Font updated successfully",
      });
      
      // Redirect to font detail page
      router.push(`/fonts/${font.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating font:", error);
      toast({
        title: "Error",
        description: "Failed to update font. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter font name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter font description (optional)" 
                  className="resize-none min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TTF">TTF</SelectItem>
                  <SelectItem value="OTF">OTF</SelectItem>
                  <SelectItem value="WOFF">WOFF</SelectItem>
                  <SelectItem value="WOFF2">WOFF2</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Tags</FormLabel>
          <div className="flex gap-2">
            <Input
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add tags"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addTag}>
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Featured Font</FormLabel>
                <FormDescription>
                  Mark this font as featured on the fonts page
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}