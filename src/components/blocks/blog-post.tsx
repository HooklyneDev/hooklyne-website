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
          <div className="mt-6 text-sm text-[var(--muted-foreground)]">
            <span>{format(pubDate, "d MMMM yyyy")}</span>
          </div>
        </div>

        {image && (
          <div
            className="mb-12 overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--border)" }}
          >
            <picture>
              <source srcSet={image.replace(/\.(jpg|jpeg|png)$/i, ".webp")} type="image/webp" />
              <img
                src={image}
                alt={title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={1600}
                height={900}
                className="aspect-video w-full object-cover"
              />
            </picture>
          </div>
        )}

        <div className="blog-prose mx-auto">{children}</div>
      </div>
    </article>
  );
};

export { BlogPost };
