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

type UserType = {
  id: string
  name: string | null
  username: string | null
  bio: string | null
  summary: string | null
  image: string | null
  coverImage: string | null
  website: string | null
  twitter: string | null
  instagram: string | null
  linkedin: string | null
  createdAt: Date
  emailVerified: Date | null
}

export interface UserProfileProps {
  user: UserType
}


type UserTypeDashboard = {
  id: string
  name: string | null
  username: string | null
  email: string | null
  bio: string | null
  summary: string | null
  image: string | null
  coverImage: string | null
  website: string | null
  twitter: string | null
  instagram: string | null
  linkedin: string | null
  isTwoFactorAuthEnabled: boolean
  emailVerified: Date | null
}

export interface ProfileSettingsFormProps {
  user: UserTypeDashboard
}