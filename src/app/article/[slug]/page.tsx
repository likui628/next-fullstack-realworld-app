import { getArticle } from "@/app/actions/getArticle";
import ArticleBanner from "@/components/article/ArticleBanner";
import ArticleActions from "@/components/article/ArticleActions";
import ArticleBody from "@/components/article/ArticleBody";
import ArticleComments from "@/components/article/ArticleComments";

interface ArticleProps {
  params: { slug: string };
}

const articlePage = async ({ params }: ArticleProps) => {
  const data = await getArticle({ slug: params.slug });
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
            <ArticleActions />
            <ArticleComments slug={params.slug} />
          </div>
        </>
      )}
    </div>
  );
};
export default articlePage;
