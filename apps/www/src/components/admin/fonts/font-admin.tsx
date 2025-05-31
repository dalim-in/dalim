"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dalim/core/ui/table";
import { Button } from "@dalim/core/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@dalim/core/ui/alert-dialog";
import { Badge } from "@dalim/core/ui/badge";
import { Input } from "@dalim/core/ui/input";
import { useToast } from "@dalim/core/hooks/use-toast";
import { deleteFont, getAdminFonts } from "@/src/lib/fonts";
import { Edit, Search, Trash2, Eye, Download } from "lucide-react";
import { format } from "date-fns";
import { FONTS_URL } from "@dalim/auth";

export function FontsAdmin() {
  const router = useRouter();
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fonts, setFonts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useState(() => {
    const loadFonts = async () => {
      try {
        const fontData = await getAdminFonts();
        setFonts(fontData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load fonts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadFonts();
  },);

  const handleDelete = async (fontId: string) => {
    try {
      await deleteFont(fontId);
      setFonts(fonts.filter(font => font.id !== fontId));
      toast({
        title: "Success",
        description: "Font deleted successfully",
      });
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete font",
        variant: "destructive",
      });
    }
  };

  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    font.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    font.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="mt-6">
        <div className="animate-pulse space-y-3">  
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6"> 
      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fonts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
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
                  {font.name}
                  {font.featured && (
                    <Badge variant="secondary" className="ml-2">
                      Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{font.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {font.viewCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {font.downloadCount}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
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
                    <Button
                      variant="outline" 
                      onClick={() => router.push(`${FONTS_URL}/${font.id}`)}
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    <Button
                      variant="outline" 
                      onClick={() => router.push(`${FONTS_URL}/${font.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Font</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{font.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(font.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredFonts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No fonts found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}