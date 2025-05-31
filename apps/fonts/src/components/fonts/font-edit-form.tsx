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

import { Badge } from '@dalim/core/ui/badge'
import { Loader2, Save, X } from 'lucide-react'
import { useToast } from '@dalim/core/hooks/use-toast'
import { updateFont } from '@/src/lib/fonts'
import { FontEditFormValues, fontEditSchema } from '@/src/lib/zod'
import { TagSelector } from './tag-select'

interface FontEditFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    font: any
}

export function FontEditForm({ font }: FontEditFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [tags, setTags] = useState<string[]>(font.tags || [])
    const [currentTag, setCurrentTag] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<FontEditFormValues>({
        resolver: zodResolver(fontEditSchema),
        defaultValues: {
            name: font.name,
            description: font.description || '',
            type: font.type,
            category: font.category,
            licenceUrl: font.licenceUrl,
            fontFiles: font.fontFiles,
        },
    })

    const addTag = () => {
        if (currentTag && !tags.includes(currentTag)) {
            setTags([...tags, currentTag])
            setCurrentTag('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const onSubmit = async (data: FontEditFormValues) => {
        try {
            setIsSubmitting(true)

            // Update font with data and tags
            await updateFont(font.id, {
                ...data,
                tags,
            })

            toast({
                title: 'Success',
                description: 'Font updated successfully',
            })

            // Redirect to font detail page
            router.push(`/fonts/${font.id}`)
            router.refresh()
        } catch (error) {
            console.error('Error updating font:', error)
            toast({
                title: 'Error',
                description: 'Failed to update font. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-3">
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
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter font description (optional)"
                                                className="max-h-[220px] resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-3">
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
                            <div className="grid w-full gap-2 lg:flex">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Font Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full lg:w-40">
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
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
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
                                    name="fontFiles"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Font Files (optional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-full"
                                                    placeholder="Total Font Files"
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

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => router.back()}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
