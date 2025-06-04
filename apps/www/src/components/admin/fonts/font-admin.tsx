'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@dalim/core/ui/table'
import { Button } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { Input } from '@dalim/core/ui/input'
import { useToast } from '@dalim/core/hooks/use-toast'
import { getAdminFonts } from '@/src/lib/fonts'
import { FontEditDialog } from './edit-dialog'
import { Search, Eye, Download, Star, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'

import { format } from 'date-fns'
import type { Font } from '@/src/types/font'
import { FONTS_URL } from '@dalim/auth'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@dalim/core/ui/pagination'

export function FontsAdmin() {
    const router = useRouter()
    const { toast } = useToast()
    const [fonts, setFonts] = useState<Font[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10) // You can make this configurable if needed

    const loadFonts = async (showRefreshToast = false) => {
        try {
            if (showRefreshToast) setRefreshing(true)
            const fontData = await getAdminFonts()
            setFonts(fontData)
            if (showRefreshToast) {
                toast({
                    title: 'Success',
                    description: 'Fonts refreshed successfully',
                })
            }
        } catch (error) {
            console.error('Error loading fonts:', error)
            toast({
                title: 'Error',
                description: 'Failed to load fonts',
                variant: 'destructive',
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
        setFonts((prevFonts) => prevFonts.map((font) => (font.id === updatedFont.id ? updatedFont : font)))
    }

    const handleFontDelete = (fontId: string) => {
        setFonts((prevFonts) => prevFonts.filter((font) => font.id !== fontId))
    }

    const handleRefresh = () => {
        loadFonts(true)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const filteredFonts = fonts.filter((font) => font.name.toLowerCase().includes(searchQuery.toLowerCase()) || font.type.toLowerCase().includes(searchQuery.toLowerCase()) || font.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    const totalPages = Math.ceil(filteredFonts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedFonts = filteredFonts.slice(startIndex, endIndex)

    if (loading) {
        return (
            <div className="mt-6">
                <div className="animate-pulse space-y-3">
                    <div className="bg-muted mb-4 h-10 rounded-lg"></div>
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
            <div className="grid mb-3 grid-cols-2 gap-3 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Graphics</CardTitle>
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
            <div className="mb-3 flex gap-4">
                <div className="relative flex-1">
                    <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                    <Input
                        placeholder="Search fonts by name, type, or tags..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setCurrentPage(1)
                        }}
                        className="pl-9"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={handleRefresh}
                    disabled={refreshing}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
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
                                    <div className="flex items-center gap-2">
                                        {font.name}
                                        {font.featured && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs">
                                                <Star className="mr-1 h-3 w-3 fill-current" />
                                                Featured
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{font.type}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-muted-foreground flex items-center gap-3 text-sm">
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
                                <TableCell className="text-muted-foreground text-sm">{format(new Date(font.createdAt), 'MMM d, yyyy')}</TableCell>
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
                                            size="icon"
                                            onClick={() => router.push(`${FONTS_URL}/${font.id}`)}>
                                            <Eye className="mr-1 h-4 w-4" />
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
                        {paginatedFonts.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-8 text-center">
                                    <div className="text-muted-foreground">{searchQuery ? 'No fonts found matching your search' : 'No fonts found'}</div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {filteredFonts.length > 0 && (
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-muted-foreground text-sm">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredFonts.length)} of {filteredFonts.length} fonts
                    </div>
                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (currentPage > 1) handlePageChange(currentPage - 1)
                                        }}
                                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>

                                {/* First page */}
                                {currentPage > 2 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(1)
                                            }}>
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {/* Ellipsis before current page */}
                                {currentPage > 3 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/* Previous page */}
                                {currentPage > 1 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(currentPage - 1)
                                            }}>
                                            {currentPage - 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {/* Current page */}
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive>
                                        {currentPage}
                                    </PaginationLink>
                                </PaginationItem>

                                {/* Next page */}
                                {currentPage < totalPages && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(currentPage + 1)
                                            }}>
                                            {currentPage + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                {/* Ellipsis after current page */}
                                {currentPage < totalPages - 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/* Last page */}
                                {currentPage < totalPages - 1 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(totalPages)
                                            }}>
                                            {totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (currentPage < totalPages) handlePageChange(currentPage + 1)
                                        }}
                                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            )}
        </div>
    )
}
