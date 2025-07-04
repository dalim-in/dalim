/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { Textarea } from '@dalim/core/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Badge } from '@dalim/core/ui/badge'
import { Checkbox } from '@dalim/core/ui/checkbox'
import { X, Upload, Trash2, Search } from 'lucide-react'
import { updateGraphic, deleteGraphic, getAllTags } from '@/src/actions/graphic'
import { toast } from '@dalim/core/hooks/use-toast'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@dalim/core/ui/alert-dialog'
import { CldImage } from '@dalim/core/components/common/gallery'
import { ScrollArea } from '@dalim/core/ui/scroll-area'

const categories = ['ILLUSTRATION', 'ICON', 'TEMPLATE', 'MOCKUP', 'MODEL', 'BACKGROUND', 'OTHER']

interface Tag {
    id: string
    name: string
    count?: number
}

interface GraphicEditFormProps {
    graphic: {
        id: string
        title: string
        description: string | null
        category: string
        images: string[]
        link: string | null
        tags: string[]
    }
}

export function GraphicEditForm({ graphic }: GraphicEditFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [newImages, setNewImages] = useState<File[]>([])
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>(graphic.tags)
    const [currentTag, setCurrentTag] = useState('')
    const [keepExistingImages, setKeepExistingImages] = useState(true)
    const [availableTags, setAvailableTags] = useState<Tag[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [tagSearchQuery, setTagSearchQuery] = useState('')
    const [isLoadingTags, setIsLoadingTags] = useState(true)

    const addTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim()) && !selectedTags.includes(currentTag.trim()) && tags.length + selectedTags.length < 10) {
            setTags([...tags, currentTag.trim()])
            setCurrentTag('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    // Fetch available tags on component mount
    useEffect(() => {
        const fetchTags = async () => {
            try {
                setIsLoadingTags(true)
                const tags = await getAllTags()
                setAvailableTags(tags)
            } catch (error) {
                console.error('Failed to fetch tags:', error)
                toast({
                    title: 'Warning',
                    description: 'Failed to load existing tags',
                    variant: 'destructive',
                })
            } finally {
                setIsLoadingTags(false)
            }
        }

        fetchTags()
    }, [])

    // Filter tags based on search query
    const filteredTags = availableTags.filter((tag) => tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase()))

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return

        const totalImages = (keepExistingImages ? graphic.images.length : 0) + newImages.length + files.length
        if (totalImages > 10) {
            toast({
                title: 'Too many images',
                description: 'Maximum 10 images allowed',
                variant: 'destructive',
            })
            return
        }

        const updatedNewImages = [...newImages, ...files]
        setNewImages(updatedNewImages)

        // Create previews for new images
        const updatedPreviews = [...newImagePreviews]
        files.forEach((file, index) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                updatedPreviews[newImages.length + index] = e.target?.result as string
                setNewImagePreviews([...updatedPreviews])
            }
            reader.readAsDataURL(file)
        })
    }

    const removeNewImage = (index: number) => {
        const updatedImages = newImages.filter((_, i) => i !== index)
        const updatedPreviews = newImagePreviews.filter((_, i) => i !== index)
        setNewImages(updatedImages)
        setNewImagePreviews(updatedPreviews)
    }

    const handleTagToggle = (tagName: string) => {
        setSelectedTags((prev) => {
            if (prev.includes(tagName)) {
                return prev.filter((tag) => tag !== tagName)
            } else if (prev.length < 10) {
                // Max 10 tags
                return [...prev, tagName]
            }
            return prev
        })
    }

    const removeSelectedTag = (tagToRemove: string) => {
        setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(e.currentTarget)

            // Add new images to form data
            newImages.forEach((image, index) => {
                formData.append(`image-${index}`, image)
            })
 
            formData.append('keepExistingImages', keepExistingImages.toString())

            const allTags = [...new Set([...tags, ...selectedTags])]
            formData.append('tags', JSON.stringify(allTags))

            const result = await updateGraphic(graphic.id, formData)

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Graphic updated successfully!',
                })
                router.push(`/${graphic.id}`)
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to update graphic',
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
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)

        try {
            const result = await deleteGraphic(graphic.id)

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Graphic deleted successfully!',
                })
                router.push('/')
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to delete graphic',
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

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Graphic</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6">
                        {/* Current Images */}
                        {graphic.images.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="keepExisting"
                                        checked={keepExistingImages}
                                        onCheckedChange={(checked) => setKeepExistingImages(checked as boolean)}
                                    />
                                    <Label htmlFor="keepExisting">Keep existing images</Label>
                                </div>

                                {keepExistingImages && (
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {graphic.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative">
                                                <CldImage
                                                    width={400}
                                                    height={400}
                                                    src={image || '/placeholder.svg'}
                                                    alt={`Current ${index + 1}`}
                                                    className="h-32 w-full rounded-lg object-cover"
                                                />
                                                <Badge className="absolute left-2 top-2 bg-green-500">Current</Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* New Images Upload */}
                        <div className="space-y-4">
                            <Label>Add New Images</Label>
                            <div className="border-muted-foreground/25 rounded-lg border-2 border-dashed p-6">
                                <div className="text-center">
                                    <Upload className="text-muted-foreground mx-auto h-12 w-12" />
                                    <div className="mt-4">
                                        <Label
                                            htmlFor="images"
                                            className="cursor-pointer">
                                            <span className="mt-2 block text-sm font-medium">Click to upload new images</span>
                                        </Label>
                                        <Input
                                            id="images"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* New Image Previews */}
                            {newImagePreviews.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {newImagePreviews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="group relative">
                                            <CldImage
                                                width={300}
                                                height={300}
                                                src={preview || '/placeholder.svg'}
                                                alt={`New ${index + 1}`}
                                                className="h-32 w-full rounded-lg object-cover"
                                            />
                                            <Badge className="absolute left-2 top-2 bg-blue-500">New</Badge>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                                                onClick={() => removeNewImage(index)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={graphic.title}
                                placeholder="Enter graphic title"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={graphic.description || ''}
                                placeholder="Describe your graphic..."
                                className="min-h-[100px]"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                name="category"
                                defaultValue={graphic.category}
                                required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}>
                                            {category.replace('_', ' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Link */}
                        <div className="space-y-2">
                            <Label htmlFor="link">External Link</Label>
                            <Input
                                id="link"
                                name="link"
                                type="url"
                                defaultValue={graphic.link || ''}
                                placeholder="https://example.com"
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    placeholder="Add a tag"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                />
                                <Button
                                    type="button"
                                    onClick={addTag}
                                    variant="outline">
                                    Add
                                </Button>
                            </div>
                            {tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="cursor-pointer">
                                            {tag}
                                            <X
                                                className="ml-1 h-3 w-3"
                                                onClick={() => removeTag(tag)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            {/* Selected Tags Display */}
                            {selectedTags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {selectedTags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary">
                                            {tag}
                                            <X
                                                className="ml-1 h-3 w-3"
                                                onClick={() => removeSelectedTag(tag)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Tag Search */}

                            {/* Available Tags */}
                            <div className="rounded-lg border">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                                    <Input
                                        placeholder="Search tags..."
                                        value={tagSearchQuery}
                                        onChange={(e) => setTagSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <ScrollArea className="h-48">
                                    <div className="space-y-2 p-3">
                                        {isLoadingTags ? (
                                            <div className="text-muted-foreground py-4 text-center">Loading tags...</div>
                                        ) : filteredTags.length === 0 ? (
                                            <div className="text-muted-foreground py-4 text-center">{tagSearchQuery ? 'No tags found matching your search' : 'No tags available'}</div>
                                        ) : (
                                            filteredTags.map((tag) => (
                                                <div
                                                    key={tag.id}
                                                    className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`tag-${tag.id}`}
                                                        checked={selectedTags.includes(tag.name)}
                                                        onCheckedChange={() => handleTagToggle(tag.name)}
                                                        disabled={!selectedTags.includes(tag.name) && selectedTags.length >= 10}
                                                    />
                                                    <Label
                                                        htmlFor={`tag-${tag.id}`}
                                                        className="flex flex-1 cursor-pointer items-center justify-between">
                                                        <span>{tag.name}</span>
                                                        {tag.count && <span className="text-muted-foreground text-xs">({tag.count})</span>}
                                                    </Label>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>

                            <div className="text-muted-foreground text-xs">
                                {tags.length + selectedTags.length}/10 tags selected (Custom: {tags.length}, Selected: {selectedTags.length})
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1">
                                {isLoading ? 'Updating...' : 'Update Graphic'}
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        disabled={isDeleting}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone. This will permanently delete your graphic and all associated images.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                            disabled={isDeleting}>
                                            {isDeleting ? 'Deleting...' : 'Delete'}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
