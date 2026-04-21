import { Separator } from "@/components/ui/separator";

const BlogPosts = ({ posts }: { posts: any[] }) => {
  return (
    <>
      <section className="pt-32 lg:pt-40 pb-10">
        <div className="container max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-4">News</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-[var(--heading)] tracking-tight mb-4">
            Updates and articles.
          </h1>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Product updates, market research, and sales playbooks from the team.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container max-w-5xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <a
                key={post.id}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
                href={`/blog/${post.id}/`}
              >
                <div className="p-2">
                  <img
                    src={post.data.image}
                    alt=""
                    className="aspect-video w-full rounded-xl object-cover"
                  />
                </div>
                <div className="px-4 pt-3 pb-5">
                  <h2 className="text-[15px] font-semibold text-[var(--heading)] mb-2 leading-tight tracking-tight">
                    {post.data.title}
                  </h2>
                  <p className="text-[13px] text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
                    {post.data.description}
                  </p>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between gap-4 text-[12px] text-[var(--muted-foreground)]">
                    <span className="font-medium">
                      {post.data.authorName}
                    </span>
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export { BlogPosts };
