// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

type CircularTextProps = {
    text: string
    spinDuration?: number
    onHover?: 'speedUp' | 'slowDown' | 'pause' | 'goBonkers'
    className?: string
}

const getRotationTransition = (duration: number, from: number, loop = true) => ({
    from: from,
    to: from + 360,
    ease: 'linear',
    duration: duration,
    type: 'tween',
    repeat: loop ? Infinity : 0,
})

const getTransition = (duration: number, from: number) => ({
    rotate: getRotationTransition(duration, from),
    scale: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
    },
})

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }: CircularTextProps) => {
    const letters = Array.from(text)
    const controls = useAnimation()
    const [currentRotation, setCurrentRotation] = useState(0)

    useEffect(() => {
        controls.start({
            rotate: currentRotation + 360,
            scale: 1,
            transition: getTransition(spinDuration, currentRotation),
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spinDuration, controls, onHover, text])

    const handleHoverStart = () => {
        if (!onHover) return
        switch (onHover) {
            case 'slowDown':
                controls.start({
                    rotate: currentRotation + 360,
                    scale: 1,
                    transition: getTransition(spinDuration * 2, currentRotation),
                })
                break
            case 'speedUp':
                controls.start({
                    rotate: currentRotation + 360,
                    scale: 1,
                    transition: getTransition(spinDuration / 4, currentRotation),
                })
                break
            case 'pause':
                controls.start({
                    rotate: currentRotation,
                    scale: 1,
                    transition: {
                        rotate: { type: 'spring', damping: 20, stiffness: 300 },
                        scale: { type: 'spring', damping: 20, stiffness: 300 },
                    },
                })
                break
            case 'goBonkers':
                controls.start({
                    rotate: currentRotation + 360,
                    scale: 0.8,
                    transition: getTransition(spinDuration / 20, currentRotation),
                })
                break
            default:
                break
        }
    }

    const handleHoverEnd = () => {
        controls.start({
            rotate: currentRotation + 360,
            scale: 1,
            transition: getTransition(spinDuration, currentRotation),
        })
    }

    return (
        <div className="relative">
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <Image
                    src="/brand/logo-icon.svg"
                    alt="Center Image"
                    width={60}
                    height={60}
                    className=""
                />
            </div>
            <motion.div
                initial={{ rotate: 0 }}
                className={`circular-text ${className}`}
                animate={controls}
                onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}>
                {letters.map((letter, i) => {
                    const rotation = (360 / letters.length) * i
                    const factor = Number((Math.PI / letters.length).toFixed(0))
                    const x = factor * i
                    const y = factor * i
                    const transform = `rotateZ(${rotation}deg) translate3d(${x}px, ${y}px, 0)`

                    return (
                        <span
                            key={i}
                            style={{ transform, WebkitTransform: transform }}>
                            {letter}
                        </span>
                    )
                })}
            </motion.div>
        </div>
    )
}

export { CircularText }
