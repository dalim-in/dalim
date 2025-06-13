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
import { Eye, Download, Edit, Trash2, Search, Plus } from 'lucide-react'
import { deleteGraphic, bulkDeleteGraphics } from '../../../../../graphic/src/actions/graphic'
import { toast } from '@dalim/core/hooks/use-toast'
import { format } from 'date-fns'
import { GRAPHIC_URL } from '@dalim/auth'
import { CldImage } from '@dalim/core/components/common/gallery'

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'ILLUSTRATION', label: 'Illustration' },
  { value: 'ICON', label: 'Icon' },
  { value: 'TEMPLATE', label: 'Template' },
  { value: 'MOCKUP', label: 'Mockup' },
  { value: 'MODEL', label: 'Model' },
  { value: 'BACKGROUND', label: 'Background' },
  { value: 'OTHER', label: 'Other' },
]


interface GraphicsDashboardProps {
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
    }>
    total: number
    pages: number
    currentpage: number
}

export function GraphicsDashboard({ graphics, total, pages, currentpage }: GraphicsDashboardProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [selectedGraphics, setSelectedGraphics] = useState<string[]>([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [isBulkDeleting, setIsBulkDeleting] = useState(false)
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || '')

    const updateURL = (newParams: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        router.push(`/dashboard/graphic?${params.toString()}`)
    }

    const handleSearch = () => {
        updateURL({ search, category, page: '1' })
    }

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory)
        updateURL({ search, category: newCategory, page: '1' })
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
            const result = await deleteGraphic(graphicId)
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
            const result = await bulkDeleteGraphics(selectedGraphics)
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

    return (
        <div className="space-y-3">
            {/* Header Actions */}
            <div className="grid lg:flex gap-3">
                <div className="grid lg:flex w-full gap-2">
                    {/* Search */}
                    <div className="flex w-full gap-2">
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
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories
                                .filter((cat) => cat.value?.trim() !== '')
                                .map((cat) => (
                                    <SelectItem
                                        key={cat.value}
                                        value={cat.value}>
                                        {cat.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button asChild>
                    <Link href={`${GRAPHIC_URL}/upload`}>
                        <Plus className="h-4 w-4" />
                        Upload New
                    </Link>
                </Button>
            </div>

            

            {/* Stats */}
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

            {/* Graphics Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Graphics ({total})</CardTitle>
                </CardHeader>
                <CardContent>
                    {graphics.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-muted-foreground mb-4">No graphics found</p>
                            <Button asChild>
                                <Link href={`${GRAPHIC_URL}/upload`}>Upload your first graphic</Link>
                            </Button>
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
                                                            className="h-full w-12 object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{graphic.title}</div>
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
                                            <TableCell>{graphic.featured && <Badge variant="default">Featured</Badge>}</TableCell>
                                            <TableCell>
                                                <div className="whitespace-nowrap text-sm">{format(new Date(graphic.createdAt), 'MMMM d, yyyy')}</div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size={"icon"}
                                                        asChild>
                                                        <Link href={`${GRAPHIC_URL}/${graphic.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size={"icon"}
                                                        asChild>
                                                        <Link href={`${GRAPHIC_URL}/${graphic.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size={"icon"}
                                                                disabled={isDeleting}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Graphic</AlertDialogTitle>
                                                                <AlertDialogDescription>Are you sure you want to delete "{graphic.title}"? This action cannot be undone.</AlertDialogDescription>
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
                                        onClick={() => handlePageChange(currentpage - 1)}
                                        disabled={currentpage === 1}>
                                        Previous
                                    </Button>

                                    {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                                        const page = i + 1
                                        return (
                                            <Button
                                                key={page}
                                                variant={currentpage === page ? 'default' : 'outline'}
                                                onClick={() => handlePageChange(page)}>
                                                {page}
                                            </Button>
                                        )
                                    })}

                                    <Button
                                        variant="outline"
                                        onClick={() => handlePageChange(currentpage + 1)}
                                        disabled={currentpage === pages}>
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
            <div className="flex gap-2">
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
                                <AlertDialogTitle>Delete Selected Graphics</AlertDialogTitle>
                                <AlertDialogDescription>Are you sure you want to delete {selectedGraphics.length} selected graphics? This action cannot be undone.</AlertDialogDescription>
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
        </div>
    )
}
