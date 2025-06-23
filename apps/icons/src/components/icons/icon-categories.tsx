/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getAllCategories } from 'dalim-icons'
import { Mail } from 'lucide-react';

import Link from 'next/link'

export function IconCategory({ selectedCategory, setSelectedCategory }: { selectedCategory: string; setSelectedCategory: (val: string) => void }) {
    const allCategories: string[] = getAllCategories()

    return (
        <div className="hidden h-full w-full flex-col gap-1 border-l px-6 text-start md:flex md:pb-80">
            <Link
                className="mt-4"
                href="mailto:contact@dalim.in">
                <div className={`h-9 flex items-center cursor-pointer  rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black`}>
                   <Mail className='mr-1 h-4 w-4'/>
                   <p className='truncate'>Request an Icon</p> 
                    </div>
            </Link>
            <div
                onClick={() => setSelectedCategory('all')}
                className={`h-9 cursor-pointer truncate rounded-lg px-4 py-2 text-sm font-medium ${selectedCategory === 'all' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-muted'}`}>
                All Categories
            </div>

            {allCategories.map((category) => (
                <div
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`h-9 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium ${selectedCategory === category ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-muted'}`}>
                    {category}
                </div>
            ))}
        </div>
    )
}
