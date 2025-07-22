'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { Textarea } from '@dalim/core/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Badge } from '@dalim/core/ui/badge'
import { Checkbox } from '@dalim/core/ui/checkbox'
import { ScrollArea } from '@dalim/core/ui/scroll-area'
import { X, Upload, ArrowLeft, Search } from 'lucide-react'
import { uploadGraphic, getAllTags } from '@/src/actions/graphic'
import { toast } from '@dalim/core/hooks/use-toast'
import Image from 'next/image'

const categories = ['ILLUSTRATION', 'ICON', 'TEMPLATE', 'MOCKUP', 'MODEL', 'BACKGROUND', 'OTHER']

interface Tag {
    id: string
    name: string
    count?: number
}

export function GraphicUploadForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [availableTags, setAvailableTags] = useState<Tag[]>([])
    const [tagSearchQuery, setTagSearchQuery] = useState('')
    const [isLoadingTags, setIsLoadingTags] = useState(true)
    const [tags, setTags] = useState<string[]>([])
    const [currentTag, setCurrentTag] = useState('')

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

        const newImages = [...images, ...files].slice(0, 5) // Max 5 images
        setImages(newImages)

        // Create previews
        const newPreviews = [...imagePreviews]
        files.forEach((file, index) => {
            if (newImages.length <= 5) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    newPreviews[images.length + index] = e.target?.result as string
                    setImagePreviews([...newPreviews])
                }
                reader.readAsDataURL(file)
            }
        })
    }

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        const newPreviews = imagePreviews.filter((_, i) => i !== index)
        setImages(newImages)
        setImagePreviews(newPreviews)
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

            images.forEach((image, index) => {
                if (image.size > 10 * 1024 * 1024) {
                    // 10MB limit
                    throw new Error(`Image "${image.name}" exceeds 10MB limit`)
                }
                formData.append(`image-${index}`, image)
            })

            // Combine manual tags and selected tags, removing duplicates
            const allTags = [...new Set([...tags, ...selectedTags])]
            formData.append('tags', JSON.stringify(allTags))

            const result = await uploadGraphic(formData)

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Graphic uploaded successfully!',
                })
                router.push(`/${result.graphicId}`)
            } else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to upload graphic',
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
            setIsLoading(false)
        }
    }

    return (
        <div className="">
            <div className="flex items-center justify-center gap-2 py-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold">Upload New Graphic</h1>
            </div>
            <div className="relative before:absolute before:-inset-x-6 before:bottom-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>

            <div className="pt-6">
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-3 space-y-3 md:grid-cols-2">
                    <div className="space-y-3">
                        <div className="space-y-3">
                            <Label>Images (Max 5)</Label>
                            <div className="border-muted-foreground/25 mt-3 rounded-lg border-2 border-dashed p-6">
                                <div className="text-center">
                                    <Upload className="text-muted-foreground mx-auto h-12 w-12" />
                                    <div className="mt-4">
                                        <Label
                                            htmlFor="images"
                                            className="cursor-pointer">
                                            <span className="mt-2 block text-sm font-medium">Click to upload images</span>
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
                            {imagePreviews.length > 0 && (
                                <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="group relative">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={preview || '/placeholder.svg'}
                                                alt={`Preview ${index + 1}`}
                                                className="h-32 w-full rounded-lg object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute right-2 top-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                onClick={() => removeImage(index)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter graphic title"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your graphic..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                name="category"
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
                            <Label htmlFor="link">Download Link *</Label>
                            <Input
                                id="link"
                                name="link"
                                type="url"
                                required
                                placeholder="https://example.com"
                            />
                        </div>

                        {/* Manual Tag Input */}
                        <div className="space-y-2">
                            <Label>Add Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    placeholder="Add a custom tag"
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
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary">
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

                        {/* Tags Selection */}
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

                        <Button
                            type="submit"
                            disabled={isLoading || images.length === 0}
                            className="w-full">
                            {isLoading ? 'Uploading...' : 'Upload Graphic'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
