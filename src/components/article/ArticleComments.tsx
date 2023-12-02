"use client";

import Link from "next/link";
import { formatTime } from "@/utils/format";
import { useEffect, useState } from "react";
import { CommentItem, CommentsResp } from "@/types/server";
import { fetchWrapper } from "@/utils/fetch";

interface ArticleCommentsProps {
  slug: string;
}

const ArticleComments = ({ slug }: ArticleCommentsProps) => {
  // todo auth hooks
  const isLogin = true;
  const user = {
    username: "pdd_is_shit",
    bio: null,
    image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
    following: false,
  };

  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    fetchWrapper<CommentsResp>(`/articles/${slug}/comments`).then((res) => {
      setComments(res.comments);
    });
  }, []);
  const [comment, setComment] = useState("");

  const handleDelete = (id: string) => {
    fetchWrapper<CommentsResp>(`/articles/${slug}/comments/${id}`, "DELETE").then(() => {
      setComments(comments.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {isLogin ? (
          <>
            <form className="card comment-form">
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
                <img alt="" src={user.image} className="comment-author-img" />
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
                  <Link href={`/profile/${comment.author.username}`} className="comment-author">
                    <img alt="" src={comment.author.image} className="comment-author-img" />
                  </Link>
                  &nbsp;
                  <Link href={`/profile/${comment.author.username}`} className="comment-author">
                    {comment.author.username}
                  </Link>
                  <span className="date-posted">{formatTime(comment.updatedAt)}</span>
                  <span className="mod-options" onClick={() => handleDelete(comment.id)}>
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>
            <Link href="/login">Sign in</Link> or <Link href="/register">sign up</Link> to add
            comments on this article.
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleComments;
