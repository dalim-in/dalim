 
import Image from 'next/image'

export function AboutMe() {
    return (
        <div className='absolute left-1/2 px-10 w-full top-36 z-10 -translate-x-1/2 -translate-y-1/2 object-cover'>
            <div className="group flex h-full w-full">
                <div className="relative mt-4 w-full">
                    <div className="group inline-block w-full text-center">
                        <div
                            className="border-border-primary w-full rounded-3xl border p-2 transition-all duration-500 ease-out group-hover:border-[#fff200]"
                            style={{ height: 208 }}>
                            <div
                                className="grid h-full place-items-center rounded-lg border-2 border-[#fff200] bg-[#EDEEF0]"
                                style={{ boxShadow: '10px 10px 1.5px 0px #fff200 inset' }}></div>
                        </div>
                    </div>
                    <Image
                        src="/images/5.jpg"
                        alt="ali"
                        width={300}
                        height={300}
                        className="absolute left-1 top-1 h-[200px] w-40 -rotate-[10deg] rounded-lg object-cover shadow transition-all duration-500 group-hover:rotate-[0deg] group-hover:scale-95"
                    /> 
                    <Image
                        src="/images/6.jpg"
                        alt="ali"
                        width={300}
                        height={300}
                        className="absolute right-6 top-1 h-[200px] w-40 rotate-[10deg] rounded-lg object-cover shadow transition-all duration-500 group-hover:rotate-[0deg] group-hover:scale-95"
                    />
                    <Image
                        src="/images/7.jpg"
                        alt="ali"
                        width={300}
                        height={300}
                        className=" absolute right-1 top-1 h-[200px] w-40 rotate-[30deg] rounded-lg object-cover shadow transition-all duration-500 group-hover:rotate-[0deg] group-hover:scale-95"
                    />
                </div>
            </div>
        </div>
    )
}
