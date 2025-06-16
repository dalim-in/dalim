"use client"

import { useState } from "react"
import { Button } from "@dalim/core/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@dalim/core/ui/dialog"
import { UploadVisualForm } from "./upload-visual-form"
import { Plus } from "lucide-react"

export function UploadVisualButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Upload Visual
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload New Visual</DialogTitle>
        </DialogHeader>
        <UploadVisualForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
