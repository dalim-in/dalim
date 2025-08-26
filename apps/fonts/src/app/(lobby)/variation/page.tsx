'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Slider } from '@dalim/core/ui/slider'
import { Input } from '@dalim/core/ui/input'
import { Label } from '@dalim/core/ui/label'
import { Button } from '@dalim/core/ui/button'
import { Badge } from '@dalim/core/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'
import { PageHeader } from '@dalim/core/components/common/page-header'

const weightLabels = [
    { value: 100, label: 'Thin' },
    { value: 200, label: 'Extra Light' },
    { value: 300, label: 'Light' },
    { value: 400, label: 'Regular' },
    { value: 500, label: 'Medium' },
    { value: 600, label: 'Semi Bold' },
    { value: 700, label: 'Bold' },
    { value: 800, label: 'Extra Bold' },
    { value: 900, label: 'Black' },
]

const widthLabels = [
    { value: 50, label: 'Ultra Condensed' },
    { value: 62.5, label: 'Extra Condensed' },
    { value: 75, label: 'Condensed' },
    { value: 87.5, label: 'Semi Condensed' },
    { value: 100, label: 'Normal' },
    { value: 112.5, label: 'Semi Expanded' },
    { value: 125, label: 'Expanded' },
    { value: 150, label: 'Extra Expanded' },
    { value: 200, label: 'Ultra Expanded' },
]

export default function FontVariationTable() {
    const [sampleText, setSampleText] = useState('Aa')
    const [fontSize, setFontSize] = useState(48)
    const [selectedWeight, setSelectedWeight] = useState(400)
    const [selectedWidth, setSelectedWidth] = useState(100)
    const [hoveredCell, setHoveredCell] = useState<{ weight: number; width: number } | null>(null)

    const getVariationSettings = (weight: number, width: number) => {
        return `"wght" ${weight}, "wdth" ${width}`
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="">
            <div className="space-y-8 mb-6">
                <PageHeader
                    badge="Font Variation"
                    className="-mx-6 -mt-14"
                    title={'Find a font variation for your Designs.'}
                    subheading="Discover beautifully crafted typefaces for every creative project — from modern displays to vintage-inspired lettering."
                />
                <Tabs
                    defaultValue="table"
                    className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="table">Variation Table</TabsTrigger>
                        <TabsTrigger value="interactive">Interactive Mode</TabsTrigger>
                        <TabsTrigger value="comparison">Side by Side</TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="table"
                        className="space-y-6">
                        {/* Controls */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Controls</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="sample-text">Sample Text</Label>
                                        <Input
                                            id="sample-text"
                                            value={sampleText}
                                            onChange={(e) => setSampleText(e.target.value)}
                                            placeholder="Enter text to display"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                                        <Slider
                                            id="font-size"
                                            min={12}
                                            max={120}
                                            step={1}
                                            value={[fontSize]}
                                            onValueChange={(value) => setFontSize(value[0])}
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setSampleText('Aa')
                                                setFontSize(48)
                                            }}>
                                            Reset
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Font Variation Table */}
                        <Card>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="p-4 text-left font-medium">Width / Weight</th>
                                                {weightLabels.map((weight) => (
                                                    <th
                                                        key={weight.value}
                                                        className="min-w-[100px] p-2 text-center font-medium">
                                                        <div className="space-y-1">
                                                            <div className="text-muted-foreground text-xs">{weight.value}</div>
                                                            <div className="text-sm">{weight.label}</div>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {widthLabels.map((width) => (
                                                <tr
                                                    key={width.value}
                                                    className="hover:bg-muted/50 border-b">
                                                    <td className="p-4 font-medium">
                                                        <div className="space-y-1">
                                                            <div className="text-sm">{width.label}</div>
                                                            <div className="text-muted-foreground text-xs">{width.value}%</div>
                                                        </div>
                                                    </td>
                                                    {weightLabels.map((weight) => (
                                                        <td
                                                            key={`${width.value}-${weight.value}`}
                                                            className="hover:bg-accent group relative cursor-pointer p-2 text-center transition-all duration-200"
                                                            style={{
                                                                fontSize: `${fontSize}px`,
                                                                fontVariationSettings: getVariationSettings(weight.value, width.value),
                                                                opacity: hoveredCell && (hoveredCell.weight !== weight.value || hoveredCell.width !== width.value) ? 0.4 : 1,
                                                            }}
                                                            onMouseEnter={() => setHoveredCell({ weight: weight.value, width: width.value })}
                                                            onMouseLeave={() => setHoveredCell(null)}
                                                            onClick={() => copyToClipboard(`font-variation-settings: "${getVariationSettings(weight.value, width.value)}";`)}>
                                                            {sampleText}
                                                            <div className="bg-accent/20 absolute inset-0 flex items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100">
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="text-xs">
                                                                    Click to copy CSS
                                                                </Badge>
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Current Selection Info */}
                        {hoveredCell && (
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h3 className="font-medium">Current Selection</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Weight: {hoveredCell.weight} | Width: {hoveredCell.width}%
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <code className="bg-muted rounded px-2 py-1 text-sm">font-variation-settings: "{getVariationSettings(hoveredCell.weight, hoveredCell.width)}"</code>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent
                        value="interactive"
                        className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Interactive Controls */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Live Font Variation</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="sample-text-interactive">Sample Text</Label>
                                        <Input
                                            id="sample-text-interactive"
                                            value={sampleText}
                                            onChange={(e) => setSampleText(e.target.value)}
                                            placeholder="Type to see live changes"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="weight-slider">Font Weight: {selectedWeight}</Label>
                                        <Slider
                                            id="weight-slider"
                                            min={100}
                                            max={900}
                                            step={1}
                                            value={[selectedWeight]}
                                            onValueChange={(value) => setSelectedWeight(value[0])}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="width-slider">Font Width: {selectedWidth}%</Label>
                                        <Slider
                                            id="width-slider"
                                            min={50}
                                            max={200}
                                            step={1}
                                            value={[selectedWidth]}
                                            onValueChange={(value) => setSelectedWidth(value[0])}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="size-slider">Font Size: {fontSize}px</Label>
                                        <Slider
                                            id="size-slider"
                                            min={12}
                                            max={120}
                                            step={1}
                                            value={[fontSize]}
                                            onValueChange={(value) => setFontSize(value[0])}
                                        />
                                    </div>

                                    <div className="border-t pt-4">
                                        <Label>CSS Output</Label>
                                        <code className="bg-muted mt-2 block rounded p-3 text-sm">
                                            font-variation-settings: "{getVariationSettings(selectedWeight, selectedWidth)}";
                                            <br />
                                            font-size: {fontSize}px;
                                        </code>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 bg-transparent"
                                            onClick={() => copyToClipboard(`font-variation-settings: "${getVariationSettings(selectedWeight, selectedWidth)}"; font-size: ${fontSize}px;`)}>
                                            Copy CSS
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Live Preview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Live Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="border-muted flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
                                        <div
                                            className="text-center transition-all duration-200"
                                            style={{
                                                fontSize: `${fontSize}px`,
                                                fontVariationSettings: getVariationSettings(selectedWeight, selectedWidth),
                                                lineHeight: 1.2,
                                            }}>
                                            {sampleText || 'Type something...'}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent
                        value="comparison"
                        className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Font Variation Comparison</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {[
                                        { weight: 300, width: 75, label: 'Light Condensed' },
                                        { weight: 400, width: 100, label: 'Regular Normal' },
                                        { weight: 700, width: 100, label: 'Bold Normal' },
                                        { weight: 400, width: 125, label: 'Regular Expanded' },
                                        { weight: 800, width: 75, label: 'Extra Bold Condensed' },
                                        { weight: 200, width: 150, label: 'Extra Light Expanded' },
                                    ].map((variant, index) => (
                                        <div
                                            key={index}
                                            className="space-y-3">
                                            <div className="text-center">
                                                <Badge variant="outline">{variant.label}</Badge>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    wght: {variant.weight}, wdth: {variant.width}
                                                </p>
                                            </div>
                                            <div
                                                className="bg-card rounded-lg border p-6 text-center"
                                                style={{
                                                    fontSize: `${fontSize}px`,
                                                    fontVariationSettings: getVariationSettings(variant.weight, variant.width),
                                                }}>
                                                {sampleText}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
