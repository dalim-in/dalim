"use client";

import Image from "next/image"; 
import Link from "next/link"; 

// types.ts
export type PublicUser = {
  id: string
  name: string | null
  username: string | null
  email: string | null
  bio: string | null
  summary: string | null
  image: string | null
  coverImage: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
}

export function DashboardUser({ user }: { user: PublicUser }) {
  return (
    <div>
      <div className="grid items-center gap-3">
        <div className="flex mt-3 items-center gap-4">
          <Image
            src={"/placeholder.svg"}
            width={48}
            height={48}
            alt={user.name || "Avatar"}
            className="rounded-full aspect-square border"
          />
          <h1 className="inline-flex items-baseline text-3xl font-bold  sm:text-5xl">
          {user.name}
        </h1>
        </div>
        <div className="flex flex-wrap gap-4">
        <p className="text-md text-primary/70">{user.email}</p>
        <div className="border-r h-6"></div>
        <Link href={`/graphic/profile/${user.username}`}>
        <p className="text-md text-ali hover:underline">{user.username}</p>
        </Link>
        <div className="border-r h-6"></div>
        <p className="text-md text-primary/70">{user.bio}</p>
        <div className="border-r h-6"></div>
        <div className="flex items-center  gap-2 ">
          Joined
           
          <p className="text-xs text-primary/70">
            {user.createdAt
              ? new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
                  new Date(user.createdAt),
                )
              : "N/A"}
          </p>
        </div>
        </div> 
      </div>
      <div className=" mt-4 p-3 md:p-6 w-full rounded-md border">
      <p className="text-sm text-primary/70">{user.summary}</p>
      </div>
    </div>
  );
}

