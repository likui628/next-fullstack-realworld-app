import FeedToggle from './_components/FeedToggle'
import ArticleList from './_components/ArticleList'
import PopularTags from '@/components/popular-tags/PopularTags'
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

  const t = await getTranslations('Home')
  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>{t('description')}</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <FeedToggle tag={tag} feed={feed} />
              <ArticleList page={page} tag={tag} feed={feed} />
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
