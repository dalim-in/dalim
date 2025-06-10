/* eslint-disable @typescript-eslint/no-explicit-any */
'use client' 
import { getAllCategories } from 'dalim-icons'

export function IconCategory({ selectedCategory, setSelectedCategory }: { selectedCategory: string; setSelectedCategory: (val: string) => void }) {
    const allCategories = getAllCategories()

    return (
        <div className="grid  mt-4 gap-0.5 text-start w-full">
            <div
                onClick={() => setSelectedCategory('all')}
                className={`rounded-lg  px-4 py-2 text-sm cursor-pointer font-medium ${selectedCategory === 'all' ? 'bg-black dark:bg-white text-white dark:text-black' : 'hover:bg-muted '}`}>
                All Categories
            </div>

            {allCategories.map((category) => (
                <div
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg  px-4 py-2 text-sm cursor-pointer font-medium ${selectedCategory === category ? 'bg-black dark:bg-white text-white dark:text-black' : 'hover:bg-muted'}`}>
                    {category}
                </div>
            ))}
        </div>
    )
}
