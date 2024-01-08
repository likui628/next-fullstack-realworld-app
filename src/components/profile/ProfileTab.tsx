import getArticles from '@/actions/getArticles'
import ArticlePreview from '@/components/article/ArticlePreview'
import Pagination from '@/components/article/Pagination'
import { getTranslations } from 'next-intl/server'

interface ProfileTabProps {
  tab: 'my' | 'favorited'
  username: string
  page: number
}

async function ProfileTab({ tab, username, page }: ProfileTabProps) {
  const query = tab === 'my' ? { author: username } : { favorited: username }
  const data = await getArticles({ ...query, page })

  const t = await getTranslations('Misc')
  return (
    <>
      {data.articlesCount === 0 ? (
        <div className="article-preview">{t('no-articles')}</div>
      ) : (
        <>
          {data.articles.map((article) => (
            <ArticlePreview article={article} key={article.id} />
          ))}
          <Pagination count={data.articlesCount} page={page} />
        </>
      )}
    </>
  )
}

export default ProfileTab
