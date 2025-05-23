import { Button } from '@dalim/core/ui/button' 
import Link from 'next/link'
import { Services } from './services'
import { Calendar } from './calender'

export function Pricing() {
    return (
        <div
            id="pricing"
            className="relative pt-12">
            <div className="px-3">
                <Services />
                <div className="">
                    <div className="relative flex flex-col md:grid grid-cols-2 rounded-3xl border shadow-2xl">
                        <div className="flex flex-col justify-center gap-3 p-12">
                            <div className="text-center flex flex-col justify-center">
                                <h3 className="text-2xl font-semibold">Monthly Club</h3>
                                <p className="text-primary/60 mt-2 text-lg">Pause or cancel anytime.</p>
                                <span className="text-brand mb-6 mt-12 inline-block text-6xl font-bold">$999</span>

                                <div className="flex justify-center">
                                    <Button
                                        asChild
                                        size="lg">
                                        <Link href="#">Join Today</Link>
                                    </Button>
                                </div> 
                                <p className="text-muted-foreground mt-12 text-sm">Consistent Pricing and Value Each Month, with the Flexibility to Cancel Anytime</p>
                            </div> 
                        </div>
                         <Calendar/>
                    </div>
                </div>
            </div>
        </div>
    )
}
