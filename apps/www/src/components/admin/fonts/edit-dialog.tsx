"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dalim/core/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@dalim/core/ui/alert-dialog"
import { Button } from "@dalim/core/ui/button"
import { Switch } from "@dalim/core/ui/switch"
import { Label } from "@dalim/core/ui/label"
import { useToast } from "@dalim/core/hooks/use-toast"
import { deleteFont, updateFontAdmin } from "@/src/lib/fonts"
import { Edit, Trash2, Star } from "lucide-react"
import type { Font } from "@/src/types/font"

interface FontEditDialogProps {
  font: Font
  onUpdate: (updatedFont: Font) => void
  onDelete: (fontId: string) => void
}

export function FontEditDialog({ font, onUpdate, onDelete }: FontEditDialogProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [featured, setFeatured] = useState(font.featured)
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleSave = async () => {
    if (featured === font.featured) {
      setOpen(false)
      return
    }

    setLoading(true)
    try {
      // Call the API to update the font
      const updatedFontData = await updateFontAdmin(font.id, { featured })

      // Create the updated font object with all required properties
      const updatedFont: Font = {
        ...font,
        featured,
        // Update any other properties that might have changed from the API response
        ...updatedFontData,
      }

      // Update the parent component's state
      onUpdate(updatedFont)

      toast({
        title: "Success",
        description: `Font ${featured ? "featured" : "unfeatured"} successfully`,
      })
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error updating font:", error)
      toast({
        title: "Error",
        description: "Failed to update font. Please try again.",
        variant: "destructive",
      })
      // Reset the switch to original state on error
      setFeatured(font.featured)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await deleteFont(font.id)
      onDelete(font.id)
      toast({
        title: "Success",
        description: "Font deleted successfully",
      })
      setDeleteDialogOpen(false)
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error deleting font:", error)
      toast({
        title: "Error",
        description: "Failed to delete font. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset to original value when closing
      setFeatured(font.featured)
    }
    setOpen(newOpen)
  }

  // Update local state when font prop changes
  useState(() => {
    setFeatured(font.featured)
  })

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Font</DialogTitle>
            <DialogDescription>Manage the featured status and other actions for "{font.name}".</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="featured" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Featured Font
                </Label>
                <p className="text-sm text-muted-foreground">Featured fonts appear prominently on the homepage</p>
              </div>
              <Switch id="featured" checked={featured} onCheckedChange={setFeatured} disabled={loading} />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
              className="w-full sm:w-auto"
              disabled={loading || deleteLoading}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Font
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 sm:flex-none"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading || featured === font.featured}
                className="flex-1 sm:flex-none"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Font</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{font.name}"? This action cannot be undone and will permanently remove
              the font and all its associated files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLoading ? "Deleting..." : "Delete Font"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
