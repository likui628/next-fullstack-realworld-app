async function getData() {
  const res = await fetch("http://localhost:3000/api/tags", { method: "GET" });

  return res.json() as Promise<{ tags: string[] }>;
}

const PopularTags = async () => {
  const data = await getData();
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
