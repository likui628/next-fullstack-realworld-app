import { getArticle } from '@/app/actions/getArticle'
import ArticleBanner from '@/components/article/ArticleBanner'
import ArticleBody from '@/components/article/ArticleBody'
import ArticleComments from '@/components/article/ArticleComments'
import { Metadata } from 'next'
import ArticleMeta from '@/components/article/ArticleMeta'
import { redirect } from 'next/navigation'

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
  const data = await getArticle({ slug: params.slug })
  if (!data) {
    redirect('/')
  }

  return (
    <div className="article-page">
      {data && (
        <>
          <ArticleBanner article={data} />
          <div className="container page">
            <div className="row article-content">
              <ArticleBody body={data.body} />
            </div>
            <ul className="tag-list">
              {data.tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
            <br />
            <div className="article-actions">
              <ArticleMeta article={data} />
            </div>
            <ArticleComments slug={params.slug} />
          </div>
        </>
      )}
    </div>
  )
}
export default articlePage
