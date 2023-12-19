import { Article, User, Comment } from '.prisma/client'

export interface Profile extends Omit<User, 'password'> {
  following: boolean
}

export interface ArticleItem extends Omit<Article, 'createdAt' | 'updatedAt'> {
  tagList: string[]
  createdAt: string
  updatedAt: string
  author: Profile
  favorited: boolean
  favoritesCount: number
}

export interface ArticlesResp {
  articles: ArticleItem[]
  articlesCount: number
}

export interface CommentItem extends Omit<Comment, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
  author: Omit<User, 'password' | 'image'> & { image: string }
}

export interface CommentsResp {
  comments: CommentItem[]
}

export interface ProfileResp {
  profile: Profile
}

export interface CurrentUser extends Omit<User, 'password'> {
  image: string
}
