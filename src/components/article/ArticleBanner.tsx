import { ArticleItem } from "@/types/server";

interface ArticleBannerProps {
  article: ArticleItem;
}

const ArticleBanner = ({ article }: ArticleBannerProps) => {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        {/*<ArticleMeta article={article} onChange={onChange} />*/}
      </div>
    </div>
  );
};

export default ArticleBanner;
