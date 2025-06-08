'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation' 
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Badge } from '@dalim/core/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@dalim/core/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@dalim/core/ui/alert-dialog'
import { Checkbox } from '@dalim/core/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@dalim/core/ui/avatar'
import { Eye, Download, Trash2, Search, AlertTriangle } from 'lucide-react'
import { adminDeleteGraphic, adminBulkDeleteGraphics, toggleFeaturedGraphic } from '../../../../../graphic/src/actions/graphic'
import { toast } from '@dalim/core/hooks/use-toast'
import { Switch } from '@dalim/core/ui/switch'
import { GRAPHIC_URL } from '@dalim/auth'
import { CldImage } from '@dalim/core/components/common/gallery'

const categories = [
    { value: '', label: 'All Categories' },
    { value: 'LOGO', label: 'Logo' },
    { value: 'ILLUSTRATION', label: 'Illustration' },
    { value: 'ICON', label: 'Icon' },
    { value: 'BANNER', label: 'Banner' },
    { value: 'POSTER', label: 'Poster' },
    { value: 'INFOGRAPHIC', label: 'Infographic' },
    { value: 'TEMPLATE', label: 'Template' },
    { value: 'MOCKUP', label: 'Mockup' },
    { value: 'PATTERN', label: 'Pattern' },
    { value: 'TEXTURE', label: 'Texture' },
    { value: 'OTHER', label: 'Other' },
]

interface AdminGraphicsTableProps {
    graphics: Array<{
        id: string
        title: string
        description: string | null
        category: string
        images: string[]
        tags: string[]
        viewCount: number
        downloadCount: number
        featured: boolean
        createdAt: Date
        updatedAt: Date
        user: {
            id: string
            name: string | null
            username: string | null
            image: string | null
            email: string | null
        }
    }>
    total: number
    pages: number
    currentPage: number
}

export function AdminGraphicsTable({ graphics, total, pages, currentPage }: AdminGraphicsTableProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [selectedGraphics, setSelectedGraphics] = useState<string[]>([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [isBulkDeleting, setIsBulkDeleting] = useState(false)
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || '')
    const [userFilter, setUserFilter] = useState(searchParams.get('user') || '')

    const [loadingId, setLoadingId] = useState<string | null>(null)

    const updateURL = (newParams: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        router.push(`/admin/graphic?${params.toString()}`)
    }

    const handleSearch = () => {
        updateURL({ search, category, user: userFilter, page: '1' })
    }

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory)
        updateURL({ search, category: newCategory, user: userFilter, page: '1' })
    }

    const handlePageChange = (page: number) => {
        updateURL({ page: page.toString() })
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedGraphics(graphics.map((g) => g.id))
        } else {
            setSelectedGraphics([])
        }
    }

    const handleSelectGraphic = (graphicId: string, checked: boolean) => {
        if (checked) {
            setSelectedGraphics((prev) => [...prev, graphicId])
        } else {
            setSelectedGraphics((prev) => prev.filter((id) => id !== graphicId))
        }
    }

    const handleDelete = async (graphicId: string) => {
        setIsDeleting(true)
        try {
            const result = await adminDeleteGraphic(graphicId)
            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Graphic deleted successfully!',
                })
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to delete graphic',
                    variant: 'destructive',
                })
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsDeleting(false)
        }
    }

    const handleBulkDelete = async () => {
        if (selectedGraphics.length === 0) return

        setIsBulkDeleting(true)
        try {
            const result = await adminBulkDeleteGraphics(selectedGraphics)
            if (result.success) {
                toast({
                    title: 'Success',
                    description: `${selectedGraphics.length} graphics deleted successfully!`,
                })
                setSelectedGraphics([])
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to delete graphics',
                    variant: 'destructive',
                })
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsBulkDeleting(false)
        }
    }

    const handleToggleFeatured = async (graphicId: string, featured: boolean) => {
        setLoadingId(graphicId)
        try {
            const result = await toggleFeaturedGraphic(graphicId, !featured)
            if (result.success) {
                toast({
                    title: 'Success',
                    description: `Graphic ${!featured ? 'featured' : 'unfeatured'} successfully!`,
                })
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to update graphic',
                    variant: 'destructive',
                })
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Graphics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{graphics.reduce((sum, g) => sum + g.viewCount, 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{graphics.reduce((sum, g) => sum + g.downloadCount, 0)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Featured</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{graphics.filter((g) => g.featured).length}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                    {/* Search */}
                    <div className="flex max-w-md flex-1 gap-2">
                        <Input
                            placeholder="Search graphics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button
                            size="icon"
                            onClick={handleSearch}>
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Category Filter */}
                    <Select
                        value={category}
                        onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories
                                .filter((cat) => cat.value !== '')
                                .map((cat) => (
                                    <SelectItem
                                        key={cat.value}
                                        value={cat.value}>
                                        {cat.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>

                    {/* User Filter */}
                    <Input
                        placeholder="Filter by user..."
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full sm:w-48"
                    />
                </div>

                {/* Bulk Actions */}
                {selectedGraphics.length > 0 && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                disabled={isBulkDeleting}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected ({selectedGraphics.length})
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                    Delete Selected Graphics
                                </AlertDialogTitle>
                                <AlertDialogDescription>Are you sure you want to delete {selectedGraphics.length} selected graphics? This action cannot be undone and will permanently remove all associated images.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleBulkDelete}
                                    disabled={isBulkDeleting}>
                                    {isBulkDeleting ? 'Deleting...' : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            {/* Graphics Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Graphics ({total})</CardTitle>
                </CardHeader>
                <CardContent>
                    {graphics.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-muted-foreground">No graphics found</p>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={selectedGraphics.length === graphics.length}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>Graphic</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Stats</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {graphics.map((graphic) => (
                                        <TableRow key={graphic.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedGraphics.includes(graphic.id)}
                                                    onCheckedChange={(checked) => handleSelectGraphic(graphic.id, checked as boolean)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-12 w-12 overflow-hidden rounded">
                                                        <CldImage
                                                            src={graphic.images[0] || '/placeholder.svg'}
                                                            alt={graphic.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="line-clamp-1 font-medium">{graphic.title}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={graphic.user.image || ''} />
                                                        <AvatarFallback>{graphic.user.name?.[0] || graphic.user.username?.[0] || 'U'}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="text-sm font-medium">{graphic.user.name || graphic.user.username}</div>
                                                        <div className="text-muted-foreground text-xs">{graphic.user.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{graphic.category.replace('_', ' ')}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3" />
                                                        {graphic.viewCount}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Download className="h-3 w-3" />
                                                        {graphic.downloadCount}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        id={`featured-${graphic.id}`}
                                                        checked={graphic.featured}
                                                        onCheckedChange={() => handleToggleFeatured(graphic.id, graphic.featured)}
                                                        disabled={loadingId === graphic.id}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">{new Date(graphic.createdAt).toLocaleDateString()}</div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild>
                                                        <Link href={`${GRAPHIC_URL}/${graphic.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                disabled={isDeleting}>
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle className="flex items-center gap-2">
                                                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                                                    Delete Graphic
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete "{graphic.title}" by {graphic.user.name || graphic.user.username}? This action cannot be undone and will permanently remove all associated images.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(graphic.id)}
                                                                    disabled={isDeleting}>
                                                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {pages > 1 && (
                                <div className="mt-6 flex justify-center gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}>
                                        Previous
                                    </Button>

                                    {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                                        const page = i + 1
                                        return (
                                            <Button
                                                key={page}
                                                variant={currentPage === page ? 'default' : 'outline'}
                                                onClick={() => handlePageChange(page)}>
                                                {page}
                                            </Button>
                                        )
                                    })}

                                    <Button
                                        variant="outline"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === pages}>
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
