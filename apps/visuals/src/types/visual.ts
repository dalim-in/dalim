export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole;
  username: string | null;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum VisualsCategory {
  PORTFOLIO = 'PORTFOLIO',
  BRANDING = 'BRANDING',
  TOOLS = 'TOOLS',
  AI = 'AI'
}

export interface Visual {
  id: string;
  title: string;
  description: string | null;
  category: VisualsCategory;
  image: string;
  link: string | null;
  tags: string[];
  viewCount: number;
  visitCount: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
}

export interface CreateVisualData {
  title: string;
  description?: string;
  category: VisualsCategory;
  image: File | string;
  link?: string;
  tags: string[];
  featured: boolean;
}