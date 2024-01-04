'use client'

import Link from 'next/link'
import { formatTime } from '@/utils/format'
import React, { useEffect, useState } from 'react'
import { CommentItem, CommentsResp } from '@/types/response'
import { fetchWrapper } from '@/utils/fetch'
import { useAuth } from '@/components/common/AuthProvider'
import Image from 'next/image'

interface ArticleCommentsProps {
  slug: string
}

const ArticleComments = ({ slug }: ArticleCommentsProps) => {
  const { currentUser } = useAuth()

  const [comments, setComments] = useState<CommentItem[]>([])

  useEffect(() => {
    fetchWrapper<CommentsResp>(`/articles/${slug}/comments`).then((res) => {
      setComments(res.comments)
    })
  }, [slug])
  const [comment, setComment] = useState('')

  const handleDelete = (id: string) => {
    fetchWrapper<CommentsResp>(
      `/articles/${slug}/comments/${id}`,
      'DELETE',
    ).then(() => {
      setComments(comments.filter((item) => item.id !== id))
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment) {
      fetchWrapper(`/articles/${slug}/comments`, 'POST', { comment }).then(
        (res) => {
          setComments([res.comment, ...comments])
          setComment('')
        },
      )
    }
  }

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {currentUser ? (
          <>
            <form className="card comment-form" onSubmit={handleSubmit}>
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="card-footer">
                <Image
                  alt={currentUser.username}
                  src={currentUser.image || ''}
                  className="comment-author-img"
                  width={26}
                  height={26}
                />
                <button className="btn btn-sm btn-primary" type="submit">
                  Post Comment
                </button>
              </div>
            </form>
            {comments.map((comment) => (
              <div className="card" key={comment.id}>
                <div className="card-block">
                  <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                  <Link
                    href={`/profile/@${comment.author.username}`}
                    className="comment-author"
                  >
                    <Image
                      alt={comment.author.username}
                      src={comment.author.image}
                      className="comment-author-img"
                      width={26}
                      height={26}
                    />
                  </Link>
                  &nbsp;
                  <Link
                    href={`/profile/@${comment.author.username}`}
                    className="comment-author"
                  >
                    {comment.author.username}
                  </Link>
                  <span className="date-posted">
                    {formatTime(comment.updatedAt)}
                  </span>
                  {currentUser.id === comment.author.id && (
                    <span
                      className="mod-options"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <i className="ion-trash-a"></i>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>
            <Link href="/login">Sign in</Link> or{' '}
            <Link href="/register">sign up</Link> to add comments on this
            article.
          </p>
        )}
      </div>
    </div>
  )
}

export default ArticleComments
