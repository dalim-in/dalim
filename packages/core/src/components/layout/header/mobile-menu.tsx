'use client'

import * as React from 'react'
import { Equal, X } from 'lucide-react'

import { Button } from '../../../ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from '../../../ui/drawer'
import LinkSelect from './link-select'

export function MobileAgency() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="block md:hidden">
            <Drawer
                open={isOpen}
                onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={'icon'}
                        variant="ghost">
                        {isOpen ? <X className="h-5 w-5" /> : <Equal className="h-5 w-5" />}
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="space-y-4 p-6">
                    <DrawerTitle></DrawerTitle>
                    <div className="">
                        <LinkSelect />
                        <div className="space-y-6 my-6 text-xl">
                            <p>Works</p>
                            <p>Pricing</p>
                            <p>Projects</p>
                            <p>Achievements</p>
                            <p>FAQs</p>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Back</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
