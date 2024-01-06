'use client'

import QueryLink from '@/components/common/QueryLink'
import clsx from 'clsx'
import { Link } from '@/navigation'
import { CurrentUser } from '@/types/response'

interface FeedToggleProps {
  feed?: string
  tag?: string
  user: CurrentUser | null
}

const FeedToggle = ({ feed, tag, user }: FeedToggleProps) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          {user && (
            <QueryLink
              query={{ feed: 'feed' }}
              className={clsx('nav-link', feed === 'feed' && 'active')}
            >
              Your Feed
            </QueryLink>
          )}
        </li>
        <li className="nav-item">
          <QueryLink
            query={{ feed: 'global' }}
            className={clsx('nav-link', feed !== 'feed' && !tag && 'active')}
          >
            Global Feed
          </QueryLink>
        </li>
        <li className="nav-item">
          {tag && (
            <Link
              href={{ pathname: '/', query: { tag } }}
              className="nav-link active"
            >
              # {tag}
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default FeedToggle
