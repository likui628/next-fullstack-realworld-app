import { ArticleItem } from '@/types/server'
import ArticleMeta from '@/components/article/ArticleMeta'

interface ArticleBannerProps {
  article: ArticleItem
}

const ArticleBanner = ({ article }: ArticleBannerProps) => {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <ArticleMeta article={article} />
      </div>
    </div>
  )
}

export default ArticleBanner
