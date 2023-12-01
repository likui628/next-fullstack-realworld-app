import PopularTags from "@/components/popular-tags/PopularTags";
import ArticlePreview from "@/components/article/ArticlePreview";
import getArticles from "@/app/actions/getArticles";
import { ArticleItem } from "@/types/server";
import Pagination from "@/components/article/Pagination";

export default async function Home() {
  const data = await getArticles({});
  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {data.articlesCount === 0 ? (
                <div className="article-preview">No articles are here... yet.</div>
              ) : (
                <>
                  {data.articles.map((article: ArticleItem) => (
                    <ArticlePreview article={article} key={article.slug} />
                  ))}
                  <Pagination count={data.articlesCount} page={1} />
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
  );
}
