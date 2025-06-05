/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Badge } from '@dalim/core/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@dalim/core/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@dalim/core/ui/alert-dialog'
import { Checkbox } from '@dalim/core/ui/checkbox'
import { Download, Search, Trash2, ExternalLink, Calendar, RotateCcw, FileImage, Type, Eye } from 'lucide-react'
import { deleteDownload, bulkDeleteDownloads, clearAllDownloads } from '@/src/actions/downloads'
import { toast } from '@dalim/core/hooks/use-toast'
import { formatDistanceToNow } from 'date-fns'
import { CldImage } from '@dalim/core/components/common/gallery'

const downloadTypes = [
    { value: '', label: 'All Types' },
    { value: 'GRAPHIC', label: 'Graphics' },
    { value: 'FONT', label: 'Fonts' },
]

interface DownloadsDashboardProps {
    downloads: Array<{
        id: string
        itemId: string
        itemType: 'GRAPHIC' | 'FONT'
        itemTitle: string
        itemImage: string | null
        downloadUrl: string | null
        firstDownloadAt: Date
        lastDownloadAt: Date
        downloadCount: number
    }>
    total: number
    pages: number
    currentPage: number
    stats: {
        totalDownloads: number
        graphicsDownloads: number
        fontsDownloads: number
        recentDownloads: number
    }
}

export function DownloadsDashboard({ downloads, total, pages, currentPage, stats }: DownloadsDashboardProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [selectedDownloads, setSelectedDownloads] = useState<string[]>([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [isBulkDeleting, setIsBulkDeleting] = useState(false)
    const [isClearing, setIsClearing] = useState(false)
    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [type, setType] = useState(searchParams.get('type') || '')

    const updateURL = (newParams: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        router.push(`/dashboard/downloads?${params.toString()}`)
    }

    const handleSearch = () => {
        updateURL({ search, type, page: '1' })
    }

    const handleTypeChange = (newType: string) => {
        setType(newType)
        updateURL({ search, type: newType, page: '1' })
    }

    const handlePageChange = (page: number) => {
        updateURL({ page: page.toString() })
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedDownloads(downloads.map((d) => d.id))
        } else {
            setSelectedDownloads([])
        }
    }

    const handleSelectDownload = (downloadId: string, checked: boolean) => {
        if (checked) {
            setSelectedDownloads((prev) => [...prev, downloadId])
        } else {
            setSelectedDownloads((prev) => prev.filter((id) => id !== downloadId))
        }
    }

    const handleDelete = async (downloadId: string) => {
        setIsDeleting(true)
        try {
            const result = await deleteDownload(downloadId)
            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Download removed from history!',
                })
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to delete download',
                    variant: 'destructive',
                })
            }
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
        if (selectedDownloads.length === 0) return

        setIsBulkDeleting(true)
        try {
            const result = await bulkDeleteDownloads(selectedDownloads)
            if (result.success) {
                toast({
                    title: 'Success',
                    description: `${selectedDownloads.length} downloads removed from history!`,
                })
                setSelectedDownloads([])
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to delete downloads',
                    variant: 'destructive',
                })
            }
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

    const handleClearAll = async () => {
        setIsClearing(true)
        try {
            const result = await clearAllDownloads()
            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'All downloads cleared from history!',
                })
                router.refresh()
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to clear downloads',
                    variant: 'destructive',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsClearing(false)
        }
    }

    const handleRedownload = (downloadUrl: string | null, itemType: string, itemId: string) => {
        if (downloadUrl) {
            window.open(downloadUrl, '_blank')
        } else {
            // Redirect to the item page for download
            const path = itemType === 'GRAPHIC' ? `/graphics/${itemId}` : `/fonts/${itemId}`
            router.push(path)
        }
    }

    return (
        <div className="space-y-3">
            {/* Filters */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                    {/* Search */}
                    <div className="flex max-w-md flex-1 gap-2">
                        <Input
                            placeholder="Search downloads..."
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

                    {/* Type Filter */}
                    <Select
                        value={type}
                        onValueChange={handleTypeChange}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            {downloadTypes
                                .filter((t) => t.value !== '')
                                .map((t) => (
                                    <SelectItem
                                        key={t.value}
                                        value={t.value}>
                                        {t.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2">
                    {selectedDownloads.length > 0 && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    disabled={isBulkDeleting}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Selected ({selectedDownloads.length})
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Selected Downloads</AlertDialogTitle>
                                    <AlertDialogDescription>Are you sure you want to remove {selectedDownloads.length} selected downloads from your history? This action cannot be undone.</AlertDialogDescription>
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <Download className="h-4 w-4" />
                            Total Downloads
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalDownloads}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <FileImage className="h-4 w-4" />
                            Graphics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.graphicsDownloads}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <Type className="h-4 w-4" />
                            Fonts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.fontsDownloads}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-sm font-medium">
                            <Calendar className="h-4 w-4" />
                            This Week
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.recentDownloads}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Downloads Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Download History ({total})</CardTitle>
                </CardHeader>
                <CardContent>
                    {downloads.length === 0 ? (
                        <div className="py-8 text-center">
                            <Download className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                            <p className="text-muted-foreground mb-4">No downloads found</p>
                            <p className="text-muted-foreground text-sm">Start downloading graphics and fonts to see them here!</p>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={selectedDownloads.length === downloads.length}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Downloads</TableHead>
                                        <TableHead>Last Downloaded</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {downloads.map((download) => (
                                        <TableRow key={download.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedDownloads.includes(download.id)}
                                                    onCheckedChange={(checked) => handleSelectDownload(download.id, checked as boolean)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-muted relative h-12 w-12 overflow-hidden rounded-lg">
                                                        {download.itemType === 'GRAPHIC' && download.itemImage ? (
                                                            <CldImage
                                                                src={download.itemImage}
                                                                alt={download.itemTitle}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : download.itemType === 'GRAPHIC' ? (
                                                            <div className="flex h-full w-full items-center justify-center">
                                                                <FileImage className="text-muted-foreground h-6 w-6" />
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div>
                                                        <div className="line-clamp-1 font-medium">{download.itemTitle}</div>
                                                        <div className="text-muted-foreground text-sm">ID: {download.itemId}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={download.itemType === 'GRAPHIC' ? 'default' : 'secondary'}>
                                                    {download.itemType === 'GRAPHIC' ? <FileImage className="mr-1 h-3 w-3" /> : <Type className="mr-1 h-3 w-3" />}
                                                    {download.itemType}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Download className="h-3 w-3" />
                                                    <span className="font-medium">{download.downloadCount}</span>
                                                    {download.downloadCount > 1 && <span className="text-muted-foreground">times</span>}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>{new Date(download.lastDownloadAt).toLocaleDateString()}</div>
                                                    <div className="text-muted-foreground">{formatDistanceToNow(new Date(download.lastDownloadAt), { addSuffix: true })}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRedownload(download.downloadUrl, download.itemType, download.itemId)}>
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild>
                                                        <Link href={download.itemType === 'GRAPHIC' ? `/${download.itemId}` : `/${download.itemId}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                disabled={isDeleting}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Remove Download</AlertDialogTitle>
                                                                <AlertDialogDescription>Are you sure you want to remove "{download.itemTitle}" from your download history? This action cannot be undone.</AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(download.id)}
                                                                    disabled={isDeleting}>
                                                                    {isDeleting ? 'Removing...' : 'Remove'}
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
