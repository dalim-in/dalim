'use client'

import { useState, useMemo } from 'react'
import { Input } from '@dalim/core/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@dalim/core/ui/select'
import { UserCard } from './user-card'
import { Search, Users } from 'lucide-react'
import { User } from '@/src/types/user'

interface SearchUsersProps {
    users: User[]
}

export function SearchUsers({ users }: SearchUsersProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('newest')

    const filteredAndSortedUsers = useMemo(() => {
        const filtered = users.filter((user) => {
            const searchLower = searchTerm.toLowerCase()
            return user.name?.toLowerCase().includes(searchLower) || user.username?.toLowerCase().includes(searchLower) || user.bio?.toLowerCase().includes(searchLower) || user.summary?.toLowerCase().includes(searchLower)
        })

        // Sort users
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                case 'name':
                    return (a.name || a.username || '').localeCompare(b.name || b.username || '')
                default:
                    return 0
            }
        })

        return filtered
    }, [users, searchTerm, sortBy])

    return (
        <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                        placeholder="Search users by name, username, or bio..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <div className="text-muted-foreground hidden absolute right-3 top-2 md:flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>
                            {filteredAndSortedUsers.length} {filteredAndSortedUsers.length === 1 ? 'creator' : 'creators'} 
                        </span>
                    </div>
                </div>
                <div className="text-muted-foreground justify-center flex md:hidden items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>
                            {filteredAndSortedUsers.length} {filteredAndSortedUsers.length === 1 ? 'creator' : 'creators'}
                        </span>
                    </div>
                <Select
                    value={sortBy}
                    onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Results Count */}

            {/* Users Grid */}
            {filteredAndSortedUsers.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {filteredAndSortedUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                    <h3 className="mb-2 text-lg font-semibold">No users found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
                </div>
            )}
        </div>
    )
}
