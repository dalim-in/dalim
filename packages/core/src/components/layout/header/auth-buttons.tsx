import Link from 'next/link'

import { DALIM_URL, getCurrentUser } from '@dalim/auth'
import { Button } from '../../../ui/button'
import { DropdownMenu } from '../../../ui/dropdown-menu' 
import { SignIn } from './sign-in'
import { UserPhone } from './user-phone'

export async function LoginButton() {
    const user = await getCurrentUser()
    return (
        <div className="hidden md:block">
            <DropdownMenu>
                <div>
                    {user ? (
                        <div className="flex items-center gap-1">
                            
                            <SignIn user={user} />
                        </div>
                    ) : (
                        <Link href={`${DALIM_URL}/login`}>
                            <Button
                                className="px-3"
                                variant="default">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </DropdownMenu>
        </div>
    )
}

export async function MobileLoginButton() {
    const user = await getCurrentUser()
    return (
        <div className="">
            {user ? (
                <UserPhone user={user} />
            ) : (
                <Link href={`${DALIM_URL}/login`}>
                    <Button
                        className="bg-[#fff200] px-4 text-black dark:bg-black dark:text-white"
                        size={'lg'}
                        variant="default">
                        Login
                    </Button>
                </Link>
            )}
        </div>
    )
}
