'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@dalim/core/ui/table'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@dalim/core/ui/alert-dialog'
import { Badge } from '@dalim/core/ui/badge'
import { Input } from '@dalim/core/ui/input'
import { useToast } from '@dalim/core/hooks/use-toast'
import { deleteFont, getFonts } from '@/src/lib/fonts'
import { Edit, Search, Trash2, Eye, Download } from 'lucide-react'
import { format } from 'date-fns'
import { FONTS_URL } from '@dalim/auth'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@dalim/core/ui/pagination'

export function FontsDashboard() {
    const router = useRouter()
    const { toast } = useToast()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fonts, setFonts] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    // Pagination states
    const [currentpage, setcurrentpage] = useState(1)
    const pageSize = 8

    useEffect(() => {
        const loadFonts = async () => {
            try {
                const fontData = await getFonts()
                setFonts(fontData)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to load fonts',
                    variant: 'destructive',
                })
            } finally {
                setLoading(false)
            }
        }

        loadFonts()
    }, [toast])

    const handleDelete = async (fontId: string) => {
        try {
            await deleteFont(fontId)
            setFonts(fonts.filter((font) => font.id !== fontId))
            toast({
                title: 'Success',
                description: 'Font deleted successfully',
            })
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete font',
                variant: 'destructive',
            })
        }
    }

    // Filter fonts based on search query
    const filteredFonts = fonts.filter((font) => font.name.toLowerCase().includes(searchQuery.toLowerCase()) || font.type.toLowerCase().includes(searchQuery.toLowerCase()) || font.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    // Calculate total pages
    const totalpages = Math.ceil(filteredFonts.length / pageSize)

    // Get fonts for current page
    const paginatedFonts = filteredFonts.slice((currentpage - 1) * pageSize, currentpage * pageSize)

    // Reset to first page if filteredFonts changes and current page is out of range
    useEffect(() => {
        if (currentpage > totalpages) {
            setcurrentpage(1)
        }
    }, [filteredFonts, currentpage, totalpages])

    if (loading) {
        return (
            <div className="mt-6">
                <div className="animate-pulse space-y-3">
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-muted h-12 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="">
            <div className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Fonts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{fonts.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{fonts.reduce((sum, g) => sum + g.viewCount, 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{fonts.reduce((sum, g) => sum + g.downloadCount, 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Featured</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{fonts.filter((g) => g.featured).length}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-2">
                <div className="relative w-full">
                    <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                    <Input
                        placeholder="Search fonts..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setcurrentpage(1) // Reset page on search
                        }}
                        className="pl-9"
                    />
                </div>
                <div className="mb-3 flex items-center justify-between">
                    <Button onClick={() => router.push(`${FONTS_URL}/upload`)}>Upload New Font</Button>
                </div>
            </div>

            <div className="rounded-lg border">
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
                        {paginatedFonts.map((font) => (
                            <TableRow key={font.id}>
                                <TableCell className="font-medium">
                                    {font.name}
                                    {font.featured && (
                                        <Badge
                                            variant="secondary"
                                            className="ml-2">
                                            Featured
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>{font.type}</TableCell>
                                <TableCell>
                                    <div className="text-muted-foreground flex items-center gap-3 text-sm">
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
                                <TableCell>{format(new Date(font.createdAt), 'MMM d, yyyy')}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {font.tags.slice(0, 2).map((tag: string) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                        {font.tags.length > 2 && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs">
                                                +{font.tags.length - 2}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size={'icon'}
                                            onClick={() => router.push(`${FONTS_URL}/${font.id}`)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size={'icon'}
                                            onClick={() => router.push(`${FONTS_URL}/${font.id}/edit`)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Font</AlertDialogTitle>
                                                    <AlertDialogDescription>Are you sure you want to delete "{font.name}"? This action cannot be undone.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(font.id)}
                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {paginatedFonts.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-8 text-center">
                                    <p className="text-muted-foreground">No fonts found</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Enhanced Pagination Controls */}
            {totalpages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setcurrentpage((p) => Math.max(p - 1, 1))}
                                    className={currentpage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>

                            {/* First page */}
                            {currentpage > 3 && (
                                <>
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => setcurrentpage(1)}
                                            className="cursor-pointer">
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    {currentpage > 4 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                </>
                            )}

                            {/* Page numbers around current page */}
                            {Array.from({ length: Math.min(5, totalpages) }, (_, i) => {
                                const pageNumber = Math.max(1, Math.min(totalpages - 4, currentpage - 2)) + i
                                if (pageNumber > totalpages) return null

                                return (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            onClick={() => setcurrentpage(pageNumber)}
                                            isActive={pageNumber === currentpage}
                                            className="cursor-pointer">
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })}

                            {/* Last page */}
                            {currentpage < totalpages - 2 && (
                                <>
                                    {currentpage < totalpages - 3 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => setcurrentpage(totalpages)}
                                            className="cursor-pointer">
                                            {totalpages}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setcurrentpage((p) => Math.min(p + 1, totalpages))}
                                    className={currentpage === totalpages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            {/* Results summary */}
            {filteredFonts.length > 0 && (
                <div className="mt-2 flex justify-center">
                    <p className="text-muted-foreground text-sm">
                        Showing {(currentpage - 1) * pageSize + 1} to {Math.min(currentpage * pageSize, filteredFonts.length)} of {filteredFonts.length} fonts
                    </p>
                </div>
            )}
        </div>
    )
}
