import { format } from "date-fns";

const TYPE_LABEL: Record<string, string> = {
  news: "News",
  article: "Article",
  guide: "Guide",
};

const BlogPost = ({
  post,
  children,
}: {
  post: any;
  children: React.ReactNode;
}) => {
  const {
    title,
    authorName,
    authorBio,
    image,
    pubDate,
    description,
    type = "article",
    readingTime,
  } = post.data;

  return (
    <article>
      <div className="container max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mb-5 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--hooklyne-blue)]">
            <span>{TYPE_LABEL[type] ?? "Article"}</span>
            {readingTime && (
              <>
                <span className="text-[var(--border)]">·</span>
                <span className="text-[var(--muted-foreground)]">{readingTime}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-tight mb-5">
            {title}
          </h1>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--muted-foreground)]">
            <span className="font-semibold text-[var(--heading)]">{authorName}</span>
            <span className="text-[var(--border)]">·</span>
            <span>{format(pubDate, "d MMMM yyyy")}</span>
          </div>
        </div>

        {image && (
          <div
            className="mb-12 overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--border)" }}
          >
            <img
              src={image}
              alt=""
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <div className="blog-prose mx-auto">{children}</div>

        {authorBio && (
          <div
            className="mt-16 rounded-2xl p-6 md:p-7"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--hooklyne-blue)] mb-2">
              Written by
            </p>
            <p className="text-sm md:text-base font-semibold text-[var(--heading)] mb-1.5">
              {authorName}
            </p>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {authorBio}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

export { BlogPost };
