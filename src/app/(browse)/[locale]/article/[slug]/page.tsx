import React from 'react'
import { Metadata } from 'next'
import { redirect } from '@/navigation'
import { getArticle } from '@/actions/getArticle'
import { ArticleProvider } from '@/components/article/ArticleProvider'

import ArticleBanner from './_components/ArticleBanner'
import ArticleMeta from './_components/ArticleMeta'
import ArticleBody from './_components/ArticleBody'
import ArticleComments from './_components/ArticleComments'
import { FollowProvider } from '@/components/common/FollowProvider'

interface ArticleProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata> {
  const data = await getArticle({ slug: params.slug })

  return data ? { title: data.title } : {}
}

const articlePage = async ({ params }: ArticleProps) => {
  const article = await getArticle({ slug: params.slug })
  if (!article) {
    redirect('/')
  }

  return (
    <div className="article-page">
      <ArticleProvider article={article}>
        <FollowProvider following={article.author.following}>
          <ArticleBanner title={article.title}>
            <ArticleMeta />
          </ArticleBanner>
          <div className="container page">
            <div className="row article-content">
              <ArticleBody body={article.body} />
            </div>
            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
            <br />
            <div className="article-actions">
              <ArticleMeta />
            </div>
            <ArticleComments slug={article.slug} />
          </div>
        </FollowProvider>
      </ArticleProvider>
    </div>
  )
}
export default articlePage
