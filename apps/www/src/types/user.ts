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