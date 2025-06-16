"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@dalim/core/ui/button"
import { Input } from "@dalim/core/ui/input"
import { Textarea } from "@dalim/core/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@dalim/core/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@dalim/core/ui/form"
import { Checkbox } from "@dalim/core/ui/checkbox"
import { Badge } from "@dalim/core/ui/badge"
import { X, Upload, Loader2 } from "lucide-react"
import { uploadVisual } from "@/src/actions/visual-actions"
import { useRouter } from "next/navigation"

const visualSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(["PORTFOLIO", "BRANDING", "TOOLS", "AI"]),
  link: z.string().url("Must be a valid URL"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  image: z.any().refine((file) => file instanceof File, "Image is required"),
})

type VisualFormData = z.infer<typeof visualSchema>

const categories = [
  { value: "PORTFOLIO", label: "Portfolio" },
  { value: "BRANDING", label: "Branding" },
  { value: "TOOLS", label: "Tools" },
  { value: "AI", label: "AI" },
]

interface UploadVisualFormProps {
  onSuccess: () => void
}

export function UploadVisualForm({ onSuccess }: UploadVisualFormProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<VisualFormData>({
    resolver: zodResolver(visualSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "PORTFOLIO",
      link: "",
      tags: [],
      featured: false,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues("tags")
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags")
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    )
  }

  const onSubmit = async (data: VisualFormData) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description || "")
      formData.append("category", data.category)
      formData.append("link", data.link)
      formData.append("tags", JSON.stringify(data.tags))
      formData.append("featured", data.featured.toString())
      formData.append("image", data.image)

      await uploadVisual(formData)
      router.refresh()
      onSuccess()
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ }) => (
            <FormItem>
              <FormLabel>Visual Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter visual title" {...field} />
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
                <Textarea placeholder="Describe your visual..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured Visual</FormLabel>
                <p className="text-sm text-muted-foreground">Mark this visual as featured to highlight it</p>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Visual
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
