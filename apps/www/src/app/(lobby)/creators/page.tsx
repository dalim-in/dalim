import { SearchUsers } from '@/src/components/creators/search-users'
import { getUsers } from '@/src/lib/users'
import { PageHeader } from '@dalim/core/components/common/page-header'


export default async function UsersPage() {
    const users = await getUsers()

    return (
        <div className="">
            <PageHeader
                badge="Creators"
                className="-mx-6 -mt-14"
                title={'Design Community Members'}
                subheading={`Discover and connect with our amazing community of ${users.length} members.`}
            />
            <div className="mx-auto max-w-6xl border-x px-6 py-6">
                <SearchUsers users={users} />
            </div>
        </div>
    )
}
