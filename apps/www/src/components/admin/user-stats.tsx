import { Card, CardContent, CardHeader, CardTitle } from "@dalim/core/ui/card"
import { Users, UserCheck, Crown, Ban, ShieldCheck, UserPlus } from "lucide-react"

type Stats = {
  totalUsers: number
  verifiedUsers: number
  premiumUsers: number
  bannedUsers: number
  admins: number
  newUsersToday: number
}

export function UserStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid gap-3 mb-3 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            {stats.verifiedUsers} verified ({Math.round((stats.verifiedUsers / stats.totalUsers) * 100) || 0}%)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
          <Crown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.premiumUsers}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.premiumUsers / stats.totalUsers) * 100) || 0}% of total users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Users Today</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newUsersToday}</div>
          <p className="text-xs text-muted-foreground">
            {stats.newUsersToday > 0 ? "+" : ""}
            {stats.newUsersToday} from yesterday
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.verifiedUsers}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.verifiedUsers / stats.totalUsers) * 100) || 0}% of total users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Banned Users</CardTitle>
          <Ban className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.bannedUsers}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.bannedUsers / stats.totalUsers) * 100) || 0}% of total users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Admins</CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.admins}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.admins / stats.totalUsers) * 100) || 0}% of total users
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
