'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react' 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select'

const OPTIONS = [
    {
        value: 'dalim',
        label: 'Dalim',
        urls: {
            prod: 'https://dalim.in',
            dev: 'http://localhost:3000',
        },
    },
    {
        value: 'ui',
        label: 'UI',
        urls: {
            prod: 'https://ui.dalim.in',
            dev: 'http://localhost:3001',
        },
    },
    {
        value: 'agency',
        label: 'Agency',
        urls: {
            prod: 'https://agency.dalim.in',
            dev: 'http://localhost:3002',
        },
    },
    {
        value: 'works',
        label: 'Works', 
        urls: {
            prod: 'https://works.dalim.in',
            dev: 'http://localhost:3003',
        },
    },
    {
        value: 'graphic',
        label: 'Graphic', 
        urls: {
            prod: 'https://graphic.dalim.in',
            dev: 'http://localhost:3006',
        },
    },
    {
        value: 'fonts',
        label: 'Fonts', 
        urls: {
            prod: 'https://fonts.dalim.in',
            dev: 'http://localhost:3005',
        },
    },
    {
        value: 'icons',
        label: 'Icons', 
        urls: {
            prod: 'https://icons.dalim.in',
            dev: 'http://localhost:3007',
        },
    },
    {
        value: 'learn',
        label: 'Learn', 
        urls: {
            prod: 'https://learn.dalim.in',
            dev: 'http://localhost:3004',
        },
    },
    {
        value: 'visuals',
        label: 'Visuals', 
        urls: {
            prod: 'https://visuals.dalim.in',
            dev: 'http://localhost:3008',
        },
    },
    {
        value: 'tools',
        label: 'Tools', 
        urls: {
            prod: 'https://tools.dalim.in',
            dev: 'http://localhost:3009',
        },
    },
    {
        value: 'pro',
        label: 'Pro',
        disabled: true,
        urls: {
            prod: 'https://pro.dalim.in',
            dev: 'http://localhost:3010',
        },
    },
    {
        value: 'ali',
        label: 'Ali',
        disabled: true,
        urls: {
            prod: 'https://ali.dalim.in',
            dev: 'http://localhost:3011',
        },
    },
    
]

export function LinkSelect() {
    const router = useRouter()
    // Always initialize with the same value on both server and client
    const [value, setValue] = useState('dalim');
    const [isRedirecting, setIsRedirecting] = useState(false);
    
    // Use useEffect to update the value based on URL after hydration
    useEffect(() => {
        const currentUrl = window.location.href;
        const currentOption = OPTIONS.find(option => 
            currentUrl.includes(option.urls.prod) || 
            currentUrl.includes(option.urls.dev.replace('http://localhost', ''))
        );
        
        if (currentOption?.value) {
            setValue(currentOption.value);
        }
    }, []);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        setIsRedirecting(true);
    }
    
    // Handle redirect after state update
    useEffect(() => {
        if (isRedirecting) {
            const redirectTimer = setTimeout(() => {
                const isDev = process.env.NODE_ENV === 'development';
                const selected = OPTIONS.find((o) => o.value === value);
                const url = isDev ? selected?.urls.dev : selected?.urls.prod;
                
                if (url) {
                    if (url.startsWith('http')) {
                        window.location.href = url; // full page redirect
                    } else {
                        router.push(url); // internal navigation
                    }
                }
                
                setIsRedirecting(false);
            }, 100); // Small delay to allow UI to update
            
            return () => clearTimeout(redirectTimer);
        }
    }, [value, isRedirecting, router]);

    return (
        <Select
            value={value}
            onValueChange={handleValueChange}
            disabled={isRedirecting}>
            <SelectTrigger className="w-full md:w-24">
                <SelectValue placeholder="Select">
                    {OPTIONS.find((option) => option.value === value)?.label}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {OPTIONS.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className="flex items-center justify-between">
                        <span>{option.label}</span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}



export function PhoneLinkSelect() {
    const router = useRouter()
    // Always initialize with the same value on both server and client
    const [value, setValue] = useState('dalim');
    const [isRedirecting, setIsRedirecting] = useState(false);
    
    // Use useEffect to update the value based on URL after hydration
    useEffect(() => {
        const currentUrl = window.location.href;
        const currentOption = OPTIONS.find(option => 
            currentUrl.includes(option.urls.prod) || 
            currentUrl.includes(option.urls.dev.replace('http://localhost', ''))
        );
        
        if (currentOption?.value) {
            setValue(currentOption.value);
        }
    }, []);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        setIsRedirecting(true);
    }
    
    // Handle redirect after state update
    useEffect(() => {
        if (isRedirecting) {
            const redirectTimer = setTimeout(() => {
                const isDev = process.env.NODE_ENV === 'development';
                const selected = OPTIONS.find((o) => o.value === value);
                const url = isDev ? selected?.urls.dev : selected?.urls.prod;
                
                if (url) {
                    if (url.startsWith('http')) {
                        window.location.href = url; // full page redirect
                    } else {
                        router.push(url); // internal navigation
                    }
                }
                
                setIsRedirecting(false);
            }, 100); // Small delay to allow UI to update
            
            return () => clearTimeout(redirectTimer);
        }
    }, [value, isRedirecting, router]);

    return (
        <Select
            value={value}
            onValueChange={handleValueChange}
            disabled={isRedirecting}>
            <SelectTrigger className="w-full text-lg px-4 h-10 dark:text-black bg-white md:w-24">
                <SelectValue placeholder="Select">
                    {OPTIONS.find((option) => option.value === value)?.label}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {OPTIONS.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className="flex items-center px-4 p-2 text-lg justify-between">
                        <span>{option.label}</span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
