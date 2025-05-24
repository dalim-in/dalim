import { ScrollArea, ScrollBar } from '@dalim/core/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dalim/core/ui/tabs'

import { Festive } from './creatives/festive'

export function Works() {
    return (
        <Tabs
            defaultValue="1"
            className="mb-6 items-center justify-center px-6 text-center">
            <TabsList className="sticky top-24 z-20 w-full items-center justify-center text-center shadow-xl lg:w-auto">
                <ScrollArea className="whitespace-nowrap">
                    <div className="space-x-2">
                        <TabsTrigger
                            value="1"
                            className="px-6">
                            SM Creative
                        </TabsTrigger>
                        <TabsTrigger
                            value="2"
                            className="px-6">
                            SM Festive
                        </TabsTrigger>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </TabsList>
            <div className="mt-6">
                <TabsContent value="1"><Festive /></TabsContent>
                <TabsContent value="2">
                    Coming Soon
                </TabsContent>
            </div>
        </Tabs>
    )
}
