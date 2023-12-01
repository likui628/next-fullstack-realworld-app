import { Article, User } from ".prisma/client";

export interface TagsResp {
  tags: string[];
}

export interface ArticleItem extends Omit<Article, "createdAt" | "updatedAt"> {
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  author: Omit<User, "password"> & { following: boolean };
  favorited: boolean;
  favoritesCount: number;
}

export interface ArticlesResp {
  articles: ArticleItem[];
  articlesCount: number;
}
