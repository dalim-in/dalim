'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@dalim/core/ui/button'
import { Input } from '@dalim/core/ui/input'
import { Textarea } from '@dalim/core/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@dalim/core/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Upload, X, Loader2 } from 'lucide-react'
import { Badge } from '@dalim/core/ui/badge'
import { useToast } from '@dalim/core/hooks/use-toast'
import { uploadFont } from '@/src/lib/fonts'
import { TagSelector } from './tag-select'
import { FontFormValues, fontSchema } from '@/src/lib/zod'

interface FontUploadFormProps {
    setPreviewFont: (font: { url: string; name: string; type: string; category: string } | null) => void
}

export function FontUploadForm({ setPreviewFont }: FontUploadFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [tags, setTags] = useState<string[]>([])
    const [currentTag, setCurrentTag] = useState('')
    const [isUploading, setIsUploading] = useState(false)

    const form = useForm<FontFormValues>({
        resolver: zodResolver(fontSchema),
        defaultValues: {
            name: '',
            description: '',
            type: 'TTF',
            fontFiles: 1,
            licenceUrl: '',
            category: 'SANS_SERIF',
            tags: '',
            featured: false,
        },
    })

    const handleFontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            form.setValue('fontFile', file)

            // Create a preview URL
            const previewUrl = URL.createObjectURL(file)
            setPreviewFont({
                url: previewUrl,
                name: form.getValues('name') || file.name.split('.')[0],
                type: form.getValues('type'),
                category: form.getValues('category'),
            })
        }
    }

    const addTag = () => {
        if (currentTag && !tags.includes(currentTag)) {
            setTags([...tags, currentTag])
            setCurrentTag('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const onSubmit = async (data: FontFormValues) => {
        try {
            setIsUploading(true)

            // Prepare form data with tags
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description || '')
            formData.append('type', data.type)
            formData.append('category', data.category)
            formData.append('fontFiles', String(data.fontFiles ?? ''))
            formData.append('licenceUrl', data.licenceUrl || '')
            formData.append('featured', String(data.featured))
            formData.append('tags', JSON.stringify(tags))
            formData.append('fontFile', data.fontFile)

            if (data.zipFile) {
                formData.append('zipFile', data.zipFile)
            }

            // Upload font
            const response = await uploadFont(formData)

            toast({
                title: 'Success',
                description: 'Font uploaded successfully',
            })

            // Redirect to font detail page
            router.push(`/${response.id}`)
        } catch (error) {
            console.error('Error uploading font:', error)
            toast({
                title: 'Error',
                description: 'Failed to upload font. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Font Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter font name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter font description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="licenceUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Licence Url (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Source Url"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid lg:flex w-full gap-2">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="SANS_SERIF">Sans Serif</SelectItem>
                                        <SelectItem value="SERIF">Serif</SelectItem>
                                        <SelectItem value="MONOSPACE">Monospace</SelectItem>
                                        <SelectItem value="DISPLAY">Display</SelectItem>
                                        <SelectItem value="HANDWRITING">Handwriting</SelectItem>
                                        <SelectItem value="SCRIPT">Script</SelectItem>
                                        <SelectItem value="DECORATIVE">Decorative</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Font Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select font type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="TTF">TTF</SelectItem>
                                        <SelectItem value="OTF">OTF</SelectItem>
                                        <SelectItem value="WOFF">WOFF</SelectItem>
                                        <SelectItem value="WOFF2">WOFF2</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fontFiles"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Font Files (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full"
                                        placeholder="Enter Source Url"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <FormLabel>Tags</FormLabel>
                    <div className="grid lg:flex lg:gap-2">
                        <TagSelector
                            selectedTags={tags}
                            onTagsChange={setTags}
                        />
                        <div className="flex w-full gap-2">
                            <Input
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                placeholder="Add tags"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        addTag()
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addTag}>
                                Add
                            </Button>
                        </div>
                    </div>
                    {tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="flex items-center gap-1">
                                    {tag}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 p-0"
                                        onClick={() => removeTag(tag)}>
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid gap-2 lg:flex">
                    <div>
                        <FormLabel>Font File</FormLabel>
                        <Card className="mt-1.5">
                            <CardHeader className="">
                                <CardTitle className="text-base">Upload Font File</CardTitle>
                                <CardDescription>Upload a .ttf, .otf, .woff, or .woff2 file (Max 2MB)</CardDescription>
                            </CardHeader>
                            <CardContent className="">
                                <FormField
                                    control={form.control}
                                    name="fontFile"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept=".ttf,.otf,.woff,.woff2"
                                                    onChange={handleFontFileChange}
                                                    className="cursor-pointer"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <FormLabel>ZIP Package (Optional)</FormLabel>
                        <Card className="mt-1.5">
                            <CardHeader>
                                <CardTitle className="text-base">Upload ZIP Package</CardTitle>
                                <CardDescription>Upload a ZIP file with additional font (Max 5MB)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="zipFile"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept=".zip"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0]
                                                        if (file) {
                                                            form.setValue('zipFile', file)
                                                        }
                                                    }}
                                                    className="cursor-pointer"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Button
                    type="submit"
                    size={'lg'}
                    className="w-full"
                    disabled={isUploading}>
                    {isUploading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="h-4 w-4" />
                            Upload Font
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}
