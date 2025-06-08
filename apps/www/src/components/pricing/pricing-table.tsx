'use client'

import * as React from 'react'
import { cn } from '@/src/lib/utils'
import { Check } from 'lucide-react'

const features = [
    { name: 'Basic Analytics', included: 'starter' },
    { name: 'Up to 5 team members', included: 'starter' },
    { name: 'Basic support', included: 'starter' },
    { name: 'Advanced Analytics', included: 'pro' },
    { name: 'Up to 20 team members', included: 'pro' },
    { name: 'Priority support', included: 'pro' },
    { name: 'Custom integrations', included: 'all' },
    { name: 'Unlimited team members', included: 'all' },
    { name: '24/7 phone support', included: 'all' },
]

const plans = [
    {
        name: 'Free',
        price: { monthly: 15, yearly: 144 },
        level: 'starter',
    },
    {
        name: 'Pro',
        price: { monthly: 49, yearly: 470 },
        level: 'pro',
        popular: true,
    },
    {
        name: 'Startup',
        price: { monthly: 99, yearly: 990 },
        level: 'all',
    },
]

export function CompareTable() {
    return (
        <PricingTable
            features={features}
            plans={plans}
        />
    )
}

export type PlanLevel = 'starter' | 'pro' | 'all' | string

export interface PricingFeature {
    name: string
    included: PlanLevel | null
}

export interface PricingPlan {
    name: string
    level: PlanLevel
    price: {
        monthly: number
        yearly: number
    }
    popular?: boolean
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
    features: PricingFeature[]
    plans: PricingPlan[]
}

export function PricingTable({ features, plans, ...props }: PricingTableProps) {
    return (
        <section>
            <div
                className={cn('mx-auto -mt-10 max-w-6xl border-x')}
                {...props}>
                <div className="">
                    <div className="">
                        <div className="divide-y">
                            <div className="sticky top-20 z-10 mt-2 flex items-center border-t bg-neutral-50 pl-6 dark:bg-neutral-900">
                                <div className="flex-1 text-sm font-medium">Features</div>
                                <div className="flex items-center text-sm">
                                    {plans.map((plan) => (
                                        <div
                                            key={plan.level}
                                            className="xl:w-68 w-20 border-r p-6 text-center font-medium first:border-l last:border-0 md:w-40 lg:w-60">
                                            {plan.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {features.map((feature) => (
                                <div
                                    key={feature.name}
                                    className={cn('flex items-center pl-6 transition-colors')}>
                                    <div className="flex-1 text-sm">{feature.name}</div>
                                    <div className="flex items-center text-sm">
                                        {plans.map((plan) => (
                                            <div
                                                key={plan.level}
                                                className={cn('xl:w-68 flex w-20 justify-center border-r py-6 first:border-l last:border-0 md:w-40 lg:w-60', plan.level && 'font-medium')}>
                                                {shouldShowCheck(feature.included, plan.level) ? <Check className="h-5 w-5 text-yellow-500" /> : <span className="text-neutral-300 dark:text-neutral-700">-</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function shouldShowCheck(included: PricingFeature['included'], level: string): boolean {
    if (included === 'all') return true
    if (included === 'pro' && (level === 'pro' || level === 'all')) return true
    if (included === 'starter' && (level === 'starter' || level === 'pro' || level === 'all')) return true
    return false
}
