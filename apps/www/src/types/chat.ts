export interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: 'ADMIN' | 'USER'
}

export interface Conversation {
  id: string
  title: string | null
  status: 'ACTIVE' | 'CLOSED' | 'ARCHIVED'
  createdAt: string
  updatedAt: string
  lastMessageAt: string | null
  participants: ConversationParticipant[]
  messages: Message[]
  _count?: {
    messages: number
  }
} 

export interface ConversationParticipant {
  id: string
  conversationId: string
  userId: string
  joinedAt: string
  lastReadAt: string | null
  user: User
}

export interface Message {
  id: string
  content: string | null
  createdAt: string
  updatedAt: string
  status: 'SENT' | 'DELIVERED' | 'READ'
  readAt: string | null
  senderId: string
  recipientId: string | null
  conversationId: string
  sender: User
  recipient?: User | null
  attachments: Attachment[]
}

export interface Attachment {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  fileUrl: string
  publicId: string | null
  createdAt: string
  messageId: string
}

export interface Notification {
  id: string
  type: string
  title: string
  content: string | null
  isRead: boolean
  createdAt: string
  userId: string
  referenceId: string | null
  referenceType: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export interface CreateMessageData {
  content?: string
  conversationId: string
  attachments?: File[]
}

export interface CreateConversationData {
  participantIds: string[]
  title?: string
}
