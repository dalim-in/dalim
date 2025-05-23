import { Gravity, MatterBody } from '@/src/components/ui/gravity'

function Preview() {
    return (
        <div className="relative h-[200px] w-full overflow-hidden"> 
                <Gravity
                    gravity={{ x: 0, y: 1 }}
                    className="h-full w-full">
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="30%"
                        y="10%">
                        <div className="rounded-full bg-red-500 px-4 py-2 text-sm text-white hover:cursor-pointer md:px-8 md:py-4 md:text-xl">Brand</div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="60%"
                        y="40%">
                        <div className="rounded-full bg-[#E794DA] px-4 py-2 text-sm text-white hover:cursor-grab md:px-8 md:py-4 md:text-xl">Works</div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="45%"
                        y="20%"
                        angle={10}>
                        <div className="rounded-full bg-[#1f464d] px-4 py-2 text-sm text-white hover:cursor-grab md:px-8 md:py-4 md:text-xl">Agency</div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="55%"
                        y="10%">
                        <div className="[#E794DA] rounded-full bg-[#ff5941] px-4 py-2 text-sm text-white hover:cursor-grab md:px-8 md:py-4 md:text-xl">Graphic</div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="70%"
                        y="20%">
                        <div className="[#E794DA] rounded-full bg-orange-500 px-4 py-2 text-sm text-white hover:cursor-grab md:px-8 md:py-4 md:text-xl">Fonts</div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="50%"
                        y="10%">
                        <div className="[#E794DA] rounded-full bg-[#0015ff] px-4 py-2 text-sm text-white hover:cursor-grab md:px-8 md:py-4 md:text-xl">UI</div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="35%"
                        y="10%">
                        <div className="bg-brand rounded-full px-4 py-2 text-sm text-white hover:cursor-pointer md:px-8 md:py-4 md:text-xl">Ali</div>
                    </MatterBody>
                    <MatterBody
                        matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                        x="66%"
                        y="80%">
                        <div className="rounded-full bg-purple-500 px-4 py-2 text-sm text-white hover:cursor-grab md:px-8 md:py-4 md:text-xl">Learn</div>
                    </MatterBody>
                </Gravity>
            
        </div>
    )
}

export { Preview }
