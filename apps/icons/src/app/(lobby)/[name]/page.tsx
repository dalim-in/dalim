/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check, Download } from 'lucide-react'
import { Button } from '@dalim/core/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@dalim/core/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'
import { Badge } from '@dalim/core/ui/badge'
import { Slider } from '@dalim/core/ui/slider'
import { Switch } from '@dalim/core/ui/switch'
import { Label } from '@dalim/core/ui/label'
import { Input } from '@dalim/core/ui/input'
import { getIconByName } from 'dalim-icons'
import { Access } from 'dalim-icons'
import { ExportModal } from '@/src/components/icons/export-modal' 

export default function IconDetailPage() {
    const router = useRouter()
    const params = useParams()
    const iconName = params.name as string

    // Icon customization controls
    const [size, setSize] = useState([48])
    const [variant, setVariant] = useState<'stroke' | 'solid' | 'duotone' | 'twotone' | 'bulk'>('stroke')
    const [color, setColor] = useState('#000000')
    const [strokeWidth, setStrokeWidth] = useState([1.5])
    const [animation, setAnimation] = useState(false)
    const [loop, setLoop] = useState(false)
    const [copied, setCopied] = useState(false)
    const [activeTab, setActiveTab] = useState('preview')

    // Get icon metadata
    const iconData = getIconByName(iconName.charAt(0).toUpperCase() + iconName.slice(1))

    const iconRef = useRef<HTMLDivElement>(null)

    if (!iconData) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="mb-4 text-2xl font-bold">Icon not found</h1>
                <Button
                    onClick={() => router.push('/')}
                    variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Icons
                </Button>
            </div>
        )
    }

    const handleCopyCode = async () => {
        const importCode = `import { ${iconData.name} } from 'dalim-icons'

<${iconData.name}
  size={${size[0]}}
  variant="${variant}"
  color="${color}"
  strokeWidth={${strokeWidth[0]}}
  animation={${animation}}
  loop={${loop}}
/>`

        await navigator.clipboard.writeText(importCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button
                onClick={() => router.push('/')}
                variant="ghost"
                className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Icons
            </Button>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Icon Preview */}
                <div className="lg:col-span-2">
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl">{iconData.name}</CardTitle>
                                <Badge variant="outline">{iconData.category}</Badge>
                            </div>
                            <CardDescription>{iconData.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="preview"
                                    className="py-6">
                                    <div className="flex flex-col items-center justify-center rounded-lg border bg-gray-50 p-8 dark:bg-gray-900">
                                        <div ref={iconRef}>
                                            <Access
                                                size={size[0]}
                                                variant={variant}
                                                color={color}
                                                strokeWidth={strokeWidth[0]}
                                                animation={animation}
                                                loop={loop}
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent
                                    value="code"
                                    className="py-6">
                                    <div className="relative">
                                        <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
                                            <code className="text-sm">
                                                {`import { ${iconData.name} } from 'dalim-icons'

<${iconData.name}
  size={${size[0]}}
  variant="${variant}"
  color="${color}"
  strokeWidth={${strokeWidth[0]}}
  animation={${animation}}
  loop={${loop}}
/>`}
                                            </code>
                                        </pre>
                                        <Button
                                            size="sm"
                                            className="absolute right-2 top-2"
                                            onClick={handleCopyCode}>
                                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Variants */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Available Variants</CardTitle>
                            <CardDescription>This icon is available in {iconData.variants.length} variants</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                                {iconData.variants.map((v) => (
                                    <Card
                                        key={v}
                                        className={`cursor-pointer ${variant === v ? 'ring-primary ring-2' : ''}`}
                                        onClick={() => setVariant(v as any)}>
                                        <CardContent className="flex flex-col items-center justify-center p-4">
                                            <div className="flex h-16 items-center justify-center">
                                                <Access
                                                    size={40}
                                                    variant={v as any}
                                                    color={color}
                                                    strokeWidth={strokeWidth[0]}
                                                />
                                            </div>
                                            <p className="mt-2 text-xs font-medium capitalize">{v}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    {/* Customization */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Customize</CardTitle>
                            <CardDescription>Adjust the icon properties</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium">Size: {size[0]}px</Label>
                                <Slider
                                    value={size}
                                    onValueChange={setSize}
                                    max={128}
                                    min={16}
                                    step={4}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label className="text-sm font-medium">Color</Label>
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="h-8 w-8 rounded border"
                                    />
                                    <Input
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="flex-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-medium">Stroke Width: {strokeWidth[0]}</Label>
                                <Slider
                                    value={strokeWidth}
                                    onValueChange={setStrokeWidth}
                                    max={4}
                                    min={0.5}
                                    step={0.5}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="animation-detail"
                                    className="text-sm font-medium">
                                    Animation
                                </Label>
                                <Switch
                                    id="animation-detail"
                                    checked={animation}
                                    onCheckedChange={setAnimation}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="loop-detail"
                                    className="text-sm font-medium">
                                    Loop
                                </Label>
                                <Switch
                                    id="loop-detail"
                                    checked={loop}
                                    onCheckedChange={setLoop}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Metadata */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground text-xs">Category</Label>
                                <p className="font-medium">{iconData.category}</p>
                            </div>

                            <div>
                                <Label className="text-muted-foreground text-xs">Tags</Label>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {iconData.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {iconData.author && (
                                <div>
                                    <Label className="text-muted-foreground text-xs">Author</Label>
                                    <p className="font-medium">{iconData.author}</p>
                                </div>
                            )}

                            {iconData.created && (
                                <div>
                                    <Label className="text-muted-foreground text-xs">Created</Label>
                                    <p className="font-medium">{iconData.created}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             
                            <ExportModal
                                iconElement={iconRef.current}
                                iconName={iconData.name}
                                isAnimated={animation}>
                                <Button className="w-full">
                                    <Download className="mr-2 h-4 w-4" /> Export Icon
                                </Button>
                            </ExportModal>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
