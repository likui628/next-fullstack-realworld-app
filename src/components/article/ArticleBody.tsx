import { marked } from "marked";

interface ArticleBodyProps {
  body: string;
}

const ArticleBody = ({ body }: ArticleBodyProps) => {
  return (
    <div className="row article-content">
      <div
        className="col-md-12"
        dangerouslySetInnerHTML={{
          __html: marked.parse(body),
        }}
      />
    </div>
  );
};

export default ArticleBody;
