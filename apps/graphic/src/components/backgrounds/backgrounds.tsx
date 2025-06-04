import { ScrollArea, ScrollBar } from '@dalim/core/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'

import { NeonBackgrounds } from './bg'

export function Backgrounds() {
    return (
        <Tabs
            defaultValue="1"
            className="mb-6 items-center justify-center text-center">
            <TabsList className="sticky top-24 z-20 items-center justify-center text-center shadow-xl w-auto">
                <ScrollArea className="whitespace-nowrap">
                    <div className="space-x-2">
                        <TabsTrigger
                            value="1"
                            className="px-6">
                            Neon
                        </TabsTrigger>
                        <TabsTrigger
                            value="2"
                            className="px-6">
                            Noise
                        </TabsTrigger>
                    </div>
                    <ScrollBar
                        className="hidden"
                        orientation="horizontal"
                    />
                </ScrollArea>
            </TabsList>
            <div className="mt-6">
                <TabsContent value="1">
                    <NeonBackgrounds />
                </TabsContent>
                <TabsContent value="2">Noise Coming Soon</TabsContent>
            </div>
        </Tabs>
    )
}
