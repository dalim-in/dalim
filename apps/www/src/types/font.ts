export interface Font {
  id: string
  name: string
  type: string
  featured: boolean
  viewCount: number
  downloadCount: number
  createdAt: string
  tags: string[]
  userId?: string
  publicId?: string
  fileUrl?: string
  user?: {
    id: string
    name: string
    username: string
    image: string
  }
}

export interface FontUpdateData {
  featured?: boolean
  name?: string
  tags?: string[]
}
