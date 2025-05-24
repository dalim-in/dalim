import Link from "next/link";

import { DALIM_URL, getCurrentUser } from "@dalim/auth";
import { Button } from "../../../ui/button";
import { DropdownMenu } from "../../../ui/dropdown-menu";

import { SignIn } from "./sign-in";
import { UserPhone } from "./user-phone";

export async function LoginButton() {
  const user = await getCurrentUser();
  return (
    <div className="hidden md:block">
      <DropdownMenu>
        <div>
          {user ? (
            <SignIn user={user} />
          ) : (
            <Link href={`${DALIM_URL}/login`}>
              <Button className="px-3" variant="default">
                Login
              </Button>
            </Link>
          )}
        </div>
      </DropdownMenu>
    </div>
  );
}


export async function MobileLoginButton() {
  const user = await getCurrentUser();
  return (
    <div className="">
      <DropdownMenu>
        <div>
          {user ? (
            <UserPhone user={user} />
          ) : (
            <Link href={`${DALIM_URL}/login`}>
              <Button className="px-4 dark:bg-black bg-[#fff200] text-black dark:text-white" size={"lg"} variant="default">
                Login
              </Button>
            </Link>
          )}
        </div>
      </DropdownMenu>
    </div>
  );
}
 