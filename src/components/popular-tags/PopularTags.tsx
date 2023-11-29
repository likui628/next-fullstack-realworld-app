import { TagsResp } from "@/types/api";
import { fetchWrapper } from "@/utils/fetch";

const PopularTags = async () => {
  const data = await fetchWrapper<TagsResp>("/tags");
  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {data.tags.map((tag) => (
          <a href="" className="tag-pill tag-default">
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};
export default PopularTags;
