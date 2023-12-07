'use client'

import { ArticleItem } from '@/types/server'
import { useAuth } from '@/components/common/AuthProvider'
import Link from 'next/link'
import Image from 'next/image'
import { formatTime } from '@/utils/format'
import FavoriteButton from '@/components/common/FavoriteButton'
import FollowButton from '@/components/common/FollowButton'

interface ArticleMetaProps {
  article: ArticleItem
}

const ArticleMeta = ({ article }: ArticleMetaProps) => {
  const { currentUser } = useAuth()
  const isAuthor = currentUser?.id === article.author.id

  return (
    <div className="article-meta">
      <Link href={`/@${article.author.username}`}>
        <Image
          src={article.author.image || ''}
          alt={article.author.username}
          width={26}
          height={26}
          className="user-pic"
        />
      </Link>
      <div className="info">
        <Link href={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{formatTime(article.updatedAt)}</span>
      </div>
      {isAuthor ? (
        <div>is author</div>
      ) : (
        <span>
          <FollowButton article={article} className={'mr-1'} />
          <FavoriteButton
            article={article}
            text="Favorite Article"
            className="btn btn-sm"
          />
        </span>
      )}
    </div>
  )
}

export default ArticleMeta
