import ArticlePreview from '@/components/article/ArticlePreview'
import getArticles from '@/actions/getArticles'
import { ArticleItem } from '@/types/response'
import Pagination from '@/components/article/Pagination'
import { getTranslations } from 'next-intl/server'

interface ArticleListProps {
  page: number
  tag?: string
  feed?: string
}

const ArticleList = async ({ page, feed, tag }: ArticleListProps) => {
  const data = await getArticles({ page, tag, feed })
  const t = await getTranslations('Misc')
  return (
    <>
      {data.articles.length === 0 ? (
        <div className="article-preview">{t('no-articles')}</div>
      ) : (
        <>
          {data.articles.map((article: ArticleItem) => (
            <ArticlePreview article={article} key={article.slug} />
          ))}
          <Pagination count={data.articlesCount} page={page} />
        </>
      )}
    </>
  )
}

export default ArticleList
