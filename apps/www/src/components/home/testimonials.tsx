'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { Button } from '@dalim/core/ui/button'

const SQRT_5000 = Math.sqrt(5000)

const profilePics = [
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50',
]

const testimonials = [
    {
        tempId: 0,
        testimonial: 'The design system transformed our workflow. What used to take days now takes hours.',
        by: 'Alex, Creative Director at StudioNova',
    },
    {
        tempId: 1,
        testimonial: "We've never had such consistent branding across platforms. It's a visual dream.",
        by: 'Dan, Lead Designer at PixelForge',
    },
    {
        tempId: 2,
        testimonial: 'COMPANY gave our design team superpowers. The UI is stunning and functional.',
        by: 'Stephanie, Product Designer at UI Bloom',
    },
    {
        tempId: 3,
        testimonial: 'Designing at scale is hard. COMPANY made it seamless.',
        by: 'Marie, UX Strategist at FlowGrid',
    },
    {
        tempId: 4,
        testimonial: 'Typography, spacing, grids — all just work now. We finally design with confidence.',
        by: 'Andre, Visual Designer at Brandlight',
    },
    {
        tempId: 5,
        testimonial: 'We ship faster and iterate better. Our design-to-dev handoff is practically automatic.',
        by: 'Jeremy, Design Ops at Sprintly',
    },
    {
        tempId: 6,
        testimonial: 'Clients keep complimenting the UI polish. That’s all COMPANY.',
        by: 'Pam, Freelance Web Designer',
    },
    {
        tempId: 7,
        testimonial: 'The components are clean, scalable, and beautiful. We finally stopped rebuilding the wheel.',
        by: 'Daniel, Senior Designer at Craft & Co.',
    },
    {
        tempId: 8,
        testimonial: "COMPANY took our brand guidelines and brought them to life. It's artful and precise.",
        by: 'Fernando, Brand Designer at Palette',
    },
    {
        tempId: 9,
        testimonial: 'We’ve reduced design debt to near zero. It’s the dream for any design lead.',
        by: 'Andy, Head of Design at Clarity Systems',
    },
    {
        tempId: 10,
        testimonial: 'From dark mode support to responsive layouts — it’s all thought through beautifully.',
        by: 'Pete, UI/UX Designer at Modular',
    },
    {
        tempId: 11,
        testimonial: 'Our Figma files are lighter, cleaner, and more consistent. Huge win.',
        by: 'Marina, Product Designer at Lucent',
    },
    {
        tempId: 12,
        testimonial: 'Visual feedback cycles are quicker and more collaborative now. Everyone’s on the same page.',
        by: 'Olivia, Design Manager at Alignly',
    },
    {
        tempId: 13,
        testimonial: "It's like having a design system architect baked into every decision.",
        by: 'Raj, Design Systems Lead at Gridworks',
    },
    {
        tempId: 14,
        testimonial: 'Design tokens, accessibility, theming — all solved. It’s perfect for modern design teams.',
        by: 'Lila, UI Engineer at Layered',
    },
    {
        tempId: 15,
        testimonial: 'No more inconsistencies. Just clean, scalable design from start to finish.',
        by: 'Trevor, Senior Visual Designer at Neatline',
    },
    {
        tempId: 16,
        testimonial: 'This platform feels like it was made by designers, for designers. It just *gets* us.',
        by: 'Naomi, Creative Technologist at Bezel',
    },
    {
        tempId: 17,
        testimonial: 'Designers love it. Developers love it. Leadership loves the results. That’s rare.',
        by: 'Victor, Design Lead at Merge Studio',
    },
    {
        tempId: 18,
        testimonial: 'It’s not just a tool — it’s how we design now. Everything’s more cohesive.',
        by: 'Yuki, UI Designer at SurfaceLab',
    },
    {
        tempId: 19,
        testimonial: 'COMPANY helped us stop debating pixels and start focusing on real design impact.',
        by: 'Zoe, Product Designer at Dashline',
    },
].map((t, i) => ({
    ...t,
    imgSrc: profilePics[i % profilePics.length],
}))

interface TestimonialCardProps {
    position: number
    testimonial: (typeof testimonials)[0]
    handleMove: (steps: number) => void
    cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
    const isCenter = position === 0

    return (
        <div
            onClick={() => handleMove(position)}
            className={cn('absolute left-1/2 top-1/2 cursor-pointer border p-8 transition-all duration-500 ease-in-out', isCenter ? 'bg-primary text-primary-foreground border-primary z-10' : 'bg-card text-card-foreground border-border hover:border-primary/40 z-0')}
            style={{
                width: cardSize,
                height: cardSize,
                clipPath: 'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
                transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
                boxShadow: isCenter ? '0px 8px 0px 4px hsl(var(--border))' : '0px 0px 0px 0px transparent',
            }}>
            <span
                className="bg-border absolute block origin-top-right rotate-45"
                style={{
                    right: -2,
                    top: 48,
                    width: SQRT_5000,
                    height: 2,
                }}
            />
            <Image
                src={testimonial.imgSrc}
                height={50}
                width={50}
                alt={`${testimonial.by.split(',')[0]}`}
                className="bg-muted mb-4 h-12 w-12 rounded-full object-cover object-top"
                style={{
                    boxShadow: '3px 3px 0px hsl(var(--background))',
                }}
            />
            <h3 className={cn('sm:text-md text-base font-medium', isCenter ? 'text-primary-foreground' : 'text-foreground')}>"{testimonial.testimonial}"</h3>
            <p className={cn('absolute bottom-6 left-6 right-6 mt-2 text-xs italic', isCenter ? 'text-primary-foreground/80' : 'text-muted-foreground')}>- {testimonial.by}</p>
        </div>
    )
}

export const StaggerTestimonials: React.FC = () => {
    const [cardSize, setCardSize] = useState(365)
    const [testimonialsList, setTestimonialsList] = useState(testimonials)

    const handleMove = (steps: number) => {
        const newList = [...testimonialsList]
        if (steps > 0) {
            for (let i = steps; i > 0; i--) {
                const item = newList.shift()
                if (!item) return
                newList.push({ ...item, tempId: Math.random() })
            }
        } else {
            for (let i = steps; i < 0; i++) {
                const item = newList.pop()
                if (!item) return
                newList.unshift({ ...item, tempId: Math.random() })
            }
        }
        setTestimonialsList(newList)
    }

    useEffect(() => {
        const updateSize = () => {
            const { matches } = window.matchMedia('(min-width: 300px)')
            setCardSize(matches ? 300 : 200)
        }

        updateSize()
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return (
        <div
            className="relative z-10 mb-14 w-full"
            style={{ height: 500, WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}>
            {testimonialsList.map((testimonial, index) => {
                const position = testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
                return (
                    <TestimonialCard
                        key={testimonial.tempId}
                        testimonial={testimonial}
                        handleMove={handleMove}
                        position={position}
                        cardSize={cardSize}
                    />
                )
            })}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={() => handleMove(-1)}
                    aria-label="Previous testimonial">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={() => handleMove(1)}
                    aria-label="Next testimonial">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
