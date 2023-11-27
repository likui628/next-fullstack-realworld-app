import PopularTags from "@/components/popular-tags/PopularTags";

export default function Home() {
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
              <div className="article-preview">Loading articles...</div>
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
