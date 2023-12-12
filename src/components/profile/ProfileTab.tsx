import getArticles from '@/actions/getArticles'
import ArticlePreview from '@/components/article/ArticlePreview'
import Pagination from '@/components/article/Pagination'

interface ProfileTabProps {
  tab: 'my' | 'favorited'
  username: string
  page: number
}

async function ProfileTab({ tab, username, page }: ProfileTabProps) {
  const query = tab === 'my' ? { author: username } : { favorited: username }
  const data = await getArticles({ ...query, page })
  return (
    <>
      {data.articlesCount === 0 ? (
        <div className="article-preview">No articles are here... yet.</div>
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
