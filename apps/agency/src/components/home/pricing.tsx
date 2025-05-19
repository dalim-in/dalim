import { Check, MoveRight, PhoneCall } from 'lucide-react' 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@dalim/core/ui/card'
import { Button } from '@dalim/core/ui/button'

function Pricing() {
    return (
        <div
            id={'pricing'}
            className="my-10 w-full">
            <div className="relative pt-10 before:absolute before:-inset-x-12 before:top-0 before:h-px before:bg-[linear-gradient(to_right,--theme(--color-border),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border))]"></div>
            <div className="px-3">
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="flex flex-col gap-2">
                        <div>
                            <h1 className="mx-auto max-w-xs px-6 text-center text-xl font-thin md:max-w-full md:text-3xl"> Prices that make sense!</h1>
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-3 pt-6 text-left lg:grid-cols-3">
                        <Card className="w-full rounded-md">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row items-center gap-4 font-normal">Startup</span>
                                </CardTitle>
                                <CardDescription>Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col justify-start gap-8">
                                    <p className="flex flex-row items-center gap-2 text-xl">
                                        <span className="text-4xl">$40</span>
                                        <span className="text-muted-foreground text-sm"> / month</span>
                                    </p>
                                    <div className="flex flex-col justify-start gap-4">
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="gap-4">
                                        Sign up today <MoveRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full rounded-md shadow-2xl">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row items-center gap-4 font-normal">Growth</span>
                                </CardTitle>
                                <CardDescription>Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col justify-start gap-8">
                                    <p className="flex flex-row items-center gap-2 text-xl">
                                        <span className="text-4xl">$40</span>
                                        <span className="text-muted-foreground text-sm"> / month</span>
                                    </p>
                                    <div className="flex flex-col justify-start gap-4">
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="gap-4">
                                        Sign up today <MoveRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full rounded-md">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row items-center gap-4 font-normal">Enterprise</span>
                                </CardTitle>
                                <CardDescription>Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col justify-start gap-8">
                                    <p className="flex flex-row items-center gap-2 text-xl">
                                        <span className="text-4xl">$40</span>
                                        <span className="text-muted-foreground text-sm"> / month</span>
                                    </p>
                                    <div className="flex flex-col justify-start gap-4">
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="text-primary mt-2 h-4 w-4" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">We&apos;ve made it fast and reliable.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="gap-4">
                                        Book a meeting <PhoneCall className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Pricing }
