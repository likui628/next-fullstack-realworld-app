import getArticles from '@/app/actions/getArticles'
import ArticlePreview from '@/components/article/ArticlePreview'

interface ProfileTabProps {
  tab: 'my' | 'favorited'
  username: string
}

async function ProfileTab({ tab, username }: ProfileTabProps) {
  const query = tab === 'my' ? { author: username } : { favorited: username }
  const data = await getArticles(query)
  return (
    <>
      {data.articlesCount === 0 ? (
        <div className="article-preview">No articles are here... yet.</div>
      ) : (
        data.articles.map((article) => (
          <ArticlePreview article={article} key={article.id} />
        ))
      )}
    </>
  )
}

export default ProfileTab
