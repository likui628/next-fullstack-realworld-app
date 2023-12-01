import { prisma } from "@/utils/connect";

const PopularTags = async () => {
  const tags = await prisma.tag.findMany();
  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {tags.map((tag) => (
          <a href="" key={tag.id} className="tag-pill tag-default">
            {tag.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
