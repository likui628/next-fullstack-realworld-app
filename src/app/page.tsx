import PopularTags from "@/components/popular-tags/PopularTags";
import ArticlePreview from "@/components/article/ArticlePreview";
import getArticles from "@/app/actions/getArticles";
import { ArticleItem } from "@/types/server";
import Pagination from "@/components/article/Pagination";
import Link from "next/link";
import getCurrentUser from "@/app/actions/getCurrentUser";
import QueryLink from "@/components/common/QueryLink";

interface HomeProps {
  searchParams: {
    page?: string;
    tag?: string;
    feed?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1;
  const tag = searchParams.tag;
  const feed = searchParams.feed;

  const user = await getCurrentUser();

  const data = await getArticles({ page, tag, feed });
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
                    {user && (
                      <QueryLink
                        query={{ feed: "feed" }}
                        className={feed === "feed" ? "nav-link active" : "nav-link"}
                      >
                        Your Feed
                      </QueryLink>
                    )}
                  </li>
                  <li className="nav-item">
                    <QueryLink
                      query={{ feed: "global" }}
                      className={feed !== "feed" && !tag ? "nav-link active" : "nav-link"}
                    >
                      Global Feed
                    </QueryLink>
                  </li>
                  <li className="nav-item">
                    {tag && (
                      <Link href={{ pathname: "/", query: { tag } }} className="nav-link active">
                        # {tag}
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              {data.articles.length === 0 ? (
                <div className="article-preview">No articles are here... yet.</div>
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
  );
}
