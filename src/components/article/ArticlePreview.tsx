'use client'

import { Link } from '@/navigation'
import { formatTime } from '@/utils/format'
import { ArticleItem } from '@/types/response'
import FavoritesButton from '@/components/common/FavoriteButton'
import Image from 'next/image'
import { ArticleProvider } from '@/components/article/ArticleProvider'

interface ArticlePreviewProps {
  article: ArticleItem
}

const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  return (
    <ArticleProvider article={article}>
      <div className="article-preview">
        <div className="article-meta">
          <Link href={`/profile/@${article.author.username}`}>
            <Image
              alt={article.author.username}
              src={article.author?.image || ''}
              width={26}
              height={26}
            />
          </Link>
          <div className="info">
            <Link
              href={`/profile/@${article.author.username}`}
              className="author"
            >
              {article.author.username}
            </Link>
            <span className="date">{formatTime(article.updatedAt)}</span>
          </div>
          <FavoritesButton className="btn btn-sm pull-xs-right" />
        </div>
        <Link href={`/article/${article.slug}`} className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
          <ul className="tag-list">
            {article.tagList.map((tag: string) => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })}
          </ul>
        </Link>
      </div>
    </ArticleProvider>
  )
}

export default ArticlePreview
