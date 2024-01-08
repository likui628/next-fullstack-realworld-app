import PopularTags from '@/components/popular-tags/PopularTags'
import ArticlePreview from '@/components/article/ArticlePreview'
import getArticles from '@/actions/getArticles'
import { ArticleItem } from '@/types/response'
import Pagination from '@/components/article/Pagination'
import FeedToggle from './_components/FeedToggle'
import getCurrentUser from '@/actions/getCurrentUser'
import { getTranslations } from 'next-intl/server'

interface HomeProps {
  searchParams: {
    page?: string
    tag?: string
    feed?: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1
  const tag = searchParams.tag
  const feed = searchParams.feed

  const user = await getCurrentUser()

  const data = await getArticles({ page, tag, feed })
  const t = await getTranslations()
  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>{t('Home.description')}</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <FeedToggle user={user} tag={tag} feed={feed} />
              {data.articles.length === 0 ? (
                <div className="article-preview">{t('Misc.no-articles')}</div>
              ) : (
                <>
                  {data.articles.map((article: ArticleItem) => (
                    <ArticlePreview article={article} key={article.slug} />
                  ))}
                  <Pagination count={data.articlesCount} page={page} />
                </>
              )}
            </div>
            <div className="col-md-3">
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
