"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@dalim/core/ui/table"
import { Button } from "@dalim/core/ui/button"
import { Badge } from "@dalim/core/ui/badge"
import { Input } from "@dalim/core/ui/input"
import { useToast } from "@dalim/core/hooks/use-toast"
import { getAdminFonts } from "@/src/lib/fonts"
import { FontEditDialog } from "./edit-dialog"
import { Search, Eye, Download, Star, RefreshCw } from 'lucide-react'
import { format } from "date-fns"
import type { Font } from "@/src/types/font"
import { FONTS_URL } from "@dalim/auth"

export function FontsAdmin() {
  const router = useRouter()
  const { toast } = useToast()
  const [fonts, setFonts] = useState<Font[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadFonts = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) setRefreshing(true)
      const fontData = await getAdminFonts()
      setFonts(fontData)
      if (showRefreshToast) {
        toast({
          title: "Success",
          description: "Fonts refreshed successfully",
        })
      }
    } catch (error) {
      console.error("Error loading fonts:", error)
      toast({
        title: "Error",
        description: "Failed to load fonts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadFonts()
  }, [])

  const handleFontUpdate = (updatedFont: Font) => {
    setFonts(prevFonts => 
      prevFonts.map(font => 
        font.id === updatedFont.id ? updatedFont : font
      )
    )
  }

  const handleFontDelete = (fontId: string) => {
    setFonts(prevFonts => prevFonts.filter(font => font.id !== fontId))
  }

  const handleRefresh = () => {
    loadFonts(true)
  }

  const filteredFonts = fonts.filter(
    (font) =>
      font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  if (loading) {
    return (
      <div className="mt-6">
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-muted rounded-lg mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fonts by name, type, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Stats</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFonts.map((font) => (
              <TableRow key={font.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {font.name}
                    {font.featured && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{font.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {font.viewCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {font.downloadCount.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(font.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {font.tags.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {font.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{font.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => router.push(`${FONTS_URL}/${font.id}`)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <FontEditDialog 
                      font={font} 
                      onUpdate={handleFontUpdate} 
                      onDelete={handleFontDelete} 
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredFonts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="text-muted-foreground">
                    {searchQuery ? "No fonts found matching your search" : "No fonts found"}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredFonts.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredFonts.length} of {fonts.length} fonts
        </div>
      )}
    </div>
  )
}
