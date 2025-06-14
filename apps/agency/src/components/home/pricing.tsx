import { Button } from '@dalim/core/ui/button' 
import Link from 'next/link'
import { Services } from './services'
import { Calendar } from './calender'

export function Pricing() {
    return (
        <div
            id="pricing"
            className="relative pt-12">
            <div className="">
                <Services />
                <div className="">
                    <div className="relative flex flex-col md:grid grid-cols-2 rounded-3xl border shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] transition-all dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]">
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
