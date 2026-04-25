const TYPE_LABEL: Record<string, string> = {
  news: "News",
  article: "Article",
  guide: "Guide",
};

const TYPE_STYLE: Record<string, { bg: string; fg: string }> = {
  news: { bg: "var(--hooklyne-orange)", fg: "white" },
  article: { bg: "var(--hooklyne-blue)", fg: "white" },
  guide: { bg: "var(--hooklyne-teal)", fg: "white" },
};

const BlogPosts = ({ posts }: { posts: any[] }) => {
  return (
    <section className="pb-20">
      <div className="container max-w-5xl">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const type = (post.data.type ?? "article") as keyof typeof TYPE_LABEL;
            const tagStyle = TYPE_STYLE[type] ?? TYPE_STYLE.article;
            return (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {post.data.image && (
                  <div className="relative p-2">
                    <img
                      src={post.data.image}
                      alt={post.data.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full rounded-xl object-cover"
                    />
                    <span
                      className="absolute top-4 right-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                      style={{ background: tagStyle.bg, color: tagStyle.fg }}
                    >
                      {TYPE_LABEL[type]}
                    </span>
                  </div>
                )}
                {!post.data.image && (
                  <div className="px-4 pt-4">
                    <span
                      className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                      style={{ background: tagStyle.bg, color: tagStyle.fg }}
                    >
                      {TYPE_LABEL[type]}
                    </span>
                  </div>
                )}
                <div className="flex flex-col flex-1 px-4 pt-3 pb-5">
                  <h2 className="text-[15px] font-semibold text-[var(--heading)] mb-2 leading-tight tracking-tight group-hover:text-[var(--hooklyne-blue)] transition-colors">
                    {post.data.title}
                  </h2>
                  <p className="text-[13px] text-[var(--muted-foreground)] line-clamp-3 leading-relaxed">
                    {post.data.description}
                  </p>
                  <div
                    className="mt-4 pt-4 text-[12px] text-[var(--muted-foreground)]"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <span>
                      {new Date(post.data.pubDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { BlogPosts };
