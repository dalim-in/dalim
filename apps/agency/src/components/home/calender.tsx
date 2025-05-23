'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link' 
import { Check } from 'lucide-react'

const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const CalendarDay: React.FC<{ day: number | string; isHeader?: boolean }> = ({ day, isHeader }) => {
    const [randomizeStyle, setRandomizeStyle] = useState('text-text-tertiary')

    useEffect(() => {
        if (!isHeader && Math.random() < 0.3) {
            setRandomizeStyle('bg-brand text-white dark:text-black')
        }
    }, [isHeader])

    return (
        <div className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center ${isHeader ? '' : 'rounded-xl'} ${randomizeStyle}`}>
            <span className={`font-medium ${isHeader ? 'text-xs' : 'text-sm'}`}>{day}</span>
        </div>
    )
}

export function Calendar() {
    const currentDate = new Date()
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
    const currentYear = currentDate.getFullYear()
    const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()

    const bookingLink = `https://cal.com/dalim/30min`

    const renderCalendarDays = () => {
        const days: React.ReactNode[] = [
            ...dayNames.map((day) => (
                <CalendarDay
                    key={`header-${day}`}
                    day={day}
                    isHeader
                />
            )),
            ...Array(firstDayOfWeek).map((_, i) => (
                <div
                    key={`empty-start-${i}`}
                    className="col-span-1 row-span-1 h-8 w-8"
                />
            )),
            ...Array(daysInMonth)
                .fill(null)
                .map((_, i) => (
                    <CalendarDay
                        key={`date-${i + 1}`}
                        day={i + 1}
                    />
                )),
        ]

        return days
    }

    return (
        <BentoCard
            height="h-auto"
            linkTo={bookingLink}>
            <div className="grid h-[500px] md:h-[450px]  lg:h-[350px] w-full gap-5">
                <div className="">
                    <div className="grid gap-4 lg:grid-cols-2">
                        <ul
                            role="list"
                            className="space-y-4">
                            {['One request at a time', 'Avg. 48 hour delivery', 'Unlimited stock photos', 'Pause or cancel anytime'].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2">
                                    <Check className="size-3 text-brand" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <ul
                            role="list"
                            className="space-y-4">
                            {['Unlimited design requests', 'Connect anytime', 'Web development'].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2">
                                    <Check className="size-3 text-brand" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="transition-all duration-500 ease-out md:group-hover:-right-12 md:group-hover:top-5">
                    <div>
                        <div className="border-border-primary w-[550px] rounded-[24px] hover:border-dotted border p-2 transition-colors duration-100 group-hover:border-brand">
                            <div
                                className="h-full rounded-2xl border-2 border-brand p-3"
                                style={{ boxShadow: '0px 2px 1.5px 0px #A5AEB852 inset' }}>
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm">
                                        <span className="font-medium">
                                            {currentMonth}, {currentYear}
                                        </span>
                                    </p>
                                    <span className="h-1 w-1 rounded-full">&nbsp;</span>
                                    <p className="text-text-tertiary text-xs">30 min call</p>
                                </div>
                                <div className="mt-4 grid grid-cols-7 grid-rows-5 gap-2 px-4">{renderCalendarDays()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BentoCard>
    )
}

interface BentoCardProps {
    children: React.ReactNode
    height?: string
    rowSpan?: number
    colSpan?: number
    className?: string
    showHoverGradient?: boolean
    hideOverflow?: boolean
    linkTo?: string
}

export function BentoCard({ children, height = 'h-auto', rowSpan = 8, colSpan = 7, className = '', showHoverGradient = true, hideOverflow = true, linkTo }: BentoCardProps) {
    const cardContent = (
        <div className={`border-border-primary m-3 bg-bg-primary group relative flex flex-col rounded-2xl border lg:p-10 p-6 hover:bg-brand-100/10 dark:hover:bg-brand-900/10 ${hideOverflow && 'overflow-hidden'} ${height} row-span-${rowSpan} col-span-${colSpan} ${className}`}>
            {linkTo && (
                <div className="absolute bottom-4 right-6 z-0 flex h-12 w-12 rotate-6 items-center justify-center rounded-full bg-white dark:bg-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100">
                    <svg
                        className="h-6 w-6 text-brand"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.25 15.25V6.75H8.75"></path>
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 7L6.75 17.25"></path>
                    </svg>
                </div>
            )}
            {showHoverGradient && <div className="user-select-none pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tl from-lime-400/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>}
            {children}
        </div>
    )

    if (linkTo) {
        return linkTo.startsWith('/') ? (
            <Link
                href={linkTo}
                className="block">
                {cardContent}
            </Link>
        ) : (
            <a
                href={linkTo}
                target="_blank"
                rel="noopener noreferrer"
                className="block">
                {cardContent}
            </a>
        )
    }

    return cardContent
}
