'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/src/lib/utils'
import { Button } from '@dalim/core/ui/button'

const SQRT_5000 = Math.sqrt(5000)

const testimonials = [
    {
        tempId: 0,
        testimonial: 'My favorite solution in the market. We work 5x faster with COMPANY.',
        by: 'Alex, CEO at TechCorp',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 1,
        testimonial: "I'm confident my data is safe with COMPANY. I can't say that about other providers.",
        by: 'Dan, CTO at SecureNet',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 2,
        testimonial: "I know it's cliche, but we were lost before we found COMPANY. Can't thank you guys enough!",
        by: 'Stephanie, COO at InnovateCo',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 3,
        testimonial: "COMPANY's products make planning for the future seamless. Can't recommend them enough!",
        by: 'Marie, CFO at FuturePlanning',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 4,
        testimonial: "If I could give 11 stars, I'd give 12.",
        by: 'Andre, Head of Design at CreativeSolutions',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 5,
        testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
        by: 'Jeremy, Product Manager at TimeWise',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 6,
        testimonial: "Took some convincing, but now that we're on COMPANY, we're never going back.",
        by: 'Pam, Marketing Director at BrandBuilders',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 7,
        testimonial: "I would be lost without COMPANY's in-depth analytics. The ROI is EASILY 100X for us.",
        by: 'Daniel, Data Scientist at AnalyticsPro',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 8,
        testimonial: "It's just the best. Period.",
        by: 'Fernando, UX Designer at UserFirst',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 9,
        testimonial: 'I switched 5 years ago and never looked back.',
        by: 'Andy, DevOps Engineer at CloudMasters',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 10,
        testimonial: "I've been searching for a solution like COMPANY for YEARS. So glad I finally found one!",
        by: 'Pete, Sales Director at RevenueRockets',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 11,
        testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
        by: 'Marina, HR Manager at TalentForge',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 12,
        testimonial: "COMPANY's customer support is unparalleled. They're always there when we need them.",
        by: 'Olivia, Customer Success Manager at ClientCare',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 13,
        testimonial: "The efficiency gains we've seen since implementing COMPANY are off the charts!",
        by: 'Raj, Operations Manager at StreamlineSolutions',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 14,
        testimonial: "COMPANY has revolutionized how we handle our workflow. It's a game-changer!",
        by: 'Lila, Workflow Specialist at ProcessPro',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 15,
        testimonial: "The scalability of COMPANY's solution is impressive. It grows with our business seamlessly.",
        by: 'Trevor, Scaling Officer at GrowthGurus',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 16,
        testimonial: "I appreciate how COMPANY continually innovates. They're always one step ahead.",
        by: 'Naomi, Innovation Lead at FutureTech',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 17,
        testimonial: "The ROI we've seen with COMPANY is incredible. It's paid for itself many times over.",
        by: 'Victor, Finance Analyst at ProfitPeak',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 18,
        testimonial: "COMPANY's platform is so robust, yet easy to use. It's the perfect balance.",
        by: 'Yuki, Tech Lead at BalancedTech',
        imgSrc: '/ali.jpg',
    },
    {
        tempId: 19,
        testimonial: "We've tried many solutions, but COMPANY stands out in terms of reliability and performance.",
        by: 'Zoe, Performance Manager at ReliableSystems',
        imgSrc: '/ali.jpg',
    },
]

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
            className={cn('absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out', isCenter ? 'bg-primary text-primary-foreground border-primary z-10' : 'bg-card text-card-foreground border-border hover:border-primary/50 z-0')}
            style={{
                width: cardSize,
                height: cardSize,
                clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
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
            className="relative mb-14 z-10 w-full"
            style={{ height: 500 }}>
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
